import React, { Component } from 'react';
import { Switch, Route, Link, NavLink, Redirect } from 'react-router-dom';
import './App.css';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Gallery from './components/Gallery'; 
import Logo from './components/Logo'; 

import FaceRecLoginManager from './components/LoginManager';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      input: '',
      imageUrl: '',
      imageIsBeingProcessed: false,
      boxes: [],
      route: 'signin',
      tab: 'file',
      isSignedin: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '' 
      }
    }
    this.localStorageStateKey = "state";
    this.bigSpinner = [<div key='spinner' className='spinnerWrap onTop'><img src={require('./components/spinner.png')} alt ="..." className='spinner bigger'/></div>];
    this.smallSpinner = [<div key='spinner'><img src={require('./components/spinner.png')} alt ="..." className='spinnerSmall'/></div>];
    this.imageErrorStyle = {color: '#A02C3D', fontSize: '16pt', marginBottom: '2em'};
    
    this.navStyle = 'f4 link black ml3 dim pointer underline';
    this.currentNavStyle = 'f4 link black ml3 o30';
    // this.apiUrl = "http://localhost:4000/"; //development
    this.apiUrl = "https://limitless-badlands-68204.herokuapp.com/"; //production
  }


  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
    localStorage.setItem(this.localStorageStateKey, JSON.stringify(this.state));
  }

  calculateFaceLocation = (data) => {  
    let boxesAggregator = [];
    let regionsLength = data.outputs[0].data.regions.length;
    for (let i = 0; i < regionsLength; i++) {
      const clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
      const image = document.getElementById('image');
      const width = Number(image.width);
      const height = Number(image.height);
      boxesAggregator.push( {
        leftCol: Math.floor(clarifaiFace.left_col * width) + 'px',
        topRow: Math.floor(clarifaiFace.top_row * height) + 'px',
        rightCol: Math.floor(width - (clarifaiFace.right_col * width)) + 'px',
        bottomRow: Math.floor(height - (clarifaiFace.bottom_row * height)) + 'px'
      })
    }
    return boxesAggregator;    
  }

  displayFaceBoxes = (boxes) => {
    let aggregator = [];
    for (let i=0; i<boxes.length; i++) {
      let newDiv = [<div key ={i} className='bounding-box' style={{top: boxes[i].topRow, right: boxes[i].rightCol, bottom: boxes[i].bottomRow, left: boxes[i].leftCol}}>  </div>];
      aggregator = aggregator.concat(newDiv);
    }
    this.setState({boxes: aggregator});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value}) 
  }

  onEnterPress = (e) => {
    if (e.key === 'Enter') this.onButtonSubmit();
  }

  toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  onFileChange = (event) => {
    if (event.target.files[0].size > 10000000) {
      this.setState({ boxes: [<div style={this.imageErrorStyle} key='fail'>File size should be under 10 Mb, try another image.</div>] });
      event.target.value = null;
    } else {
      this.setState({ boxes: [], file: event.target.files[0]}, () => {
        // console.log(this.state.file)
        this.toBase64(this.state.file)
        .then(bytes => this.setState({imageUrl: bytes }));
      })
    }
  }

  addImageToGallery = () => {
    //console.log("IMAGEURL", this.state.imageUrl)
    fetch(this.apiUrl + "addimage", {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ownerid: this.state.user.id,
        image: this.state.imageUrl
      })
    })
    .then(response => response.json())
    .then(response => console.log('response from server image:', response))
  }

  onButtonSubmit = (event) => {
    let requestData = '';
    if (this.state.tab === 'link') {
      if (this.state.input === '') return;
      requestData = this.state.input;
      this.setState({ imageUrl: this.state.input });
    }
    if (this.state.tab === 'file') {
      if (this.state.file === null) return;
      requestData = { base64: this.state.imageUrl.split("base64,")[1] };        
    }
    this.setState({ imageIsBeingProcessed: true, boxes: [] });
    fetch(this.apiUrl + "imageurl", {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: requestData
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response === "Invalid image link") this.setState({ imageIsBeingProcessed: false, boxes: [<div style={this.imageErrorStyle} key='fail'>Invalid image, try another.</div>] });
      else if (response.outputs[0].data.regions == null) this.setState({ imageIsBeingProcessed: false, boxes: [<div style={this.imageErrorStyle} key='fail'><br/>No faces found on submitted image, try again.</div>] });
      else {
        this.addImageToGallery();
        this.displayFaceBoxes(this.calculateFaceLocation(response));
        fetch(this.apiUrl + "rankup", {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(data => {
          this.setState({
            imageIsBeingProcessed: false,
            user: {
              id: this.state.user.id,
              name: this.state.user.name,
              email: this.state.user.email,
              entries: data,
              joined: this.state.user.joined
            }
          })
        })
        .then(() => {localStorage.setItem(this.localStorageStateKey, JSON.stringify(this.state))})
        .catch(err => {console.log(err); this.setState({ imageIsBeingProcessed: false })})
      } 
    })
    .catch(err => {
      this.setState({ imageIsBeingProcessed:false, boxes: [<div style={this.imageErrorStyle} key='fail'>Unknown server error, try again later.</div>]})
    });
  }

  onRouteChange = (route) =>  { 
    if (route === 'signin') {
      FaceRecLoginManager.signOut();
      localStorage.clear();
      // this.setState({isSignedin: false}, localStorage.setItem(this.localStorageStateKey, JSON.stringify(this.state)))
    } else if (route === 'detect') {
      FaceRecLoginManager.signIn();
      localStorage.setItem("FaceRecLoginManager", JSON.stringify(FaceRecLoginManager));
      // this.setState({isSignedin: true}, localStorage.setItem(this.localStorageStateKey, JSON.stringify(this.state)))
    }
    // this.setState({route: route});
    this.setState({boxes: [], imageUrl: ''});
  }
  onTabChange = (tab) => {
    this.setState( {tab: tab, imageUrl: '', boxes: [] }, () => localStorage.setItem(this.localStorageStateKey, JSON.stringify(this.state)))
  }

  newSignin = (newIsSignedinValue) => {
    this.setState({isSignedin: newIsSignedinValue}, localStorage.setItem(this.localStorageStateKey, JSON.stringify(this.state)))
  }

  componentDidMount() {
    // localStorage.clear();
    let loginManagerData = localStorage.getItem("FaceRecLoginManager");
    if ((loginManagerData !== null) && (typeof loginManagerData !== 'undefined')) {
      if (loginManagerData.signedIn) FaceRecLoginManager.signIn();
      else FaceRecLoginManager.signIn();
      localStorage.setItem("FaceRecLoginManager", JSON.stringify(FaceRecLoginManager));
    }

    let data = localStorage.getItem(this.localStorageStateKey);
    if ((data !== null) && (typeof data !== 'undefined')) {
      let locStor = JSON.parse(data);
      if ((locStor.user !== null) && (typeof locStor.user !== 'undefined')) {
        this.setState({
          input: '',
          imageUrl: '',
          imageIsBeingProcessed: false,
          boxes: '',
          tab: locStor.tab,
          route: 'detect',
          isSignedin: true,
          user: {
            id: locStor.user.id,
            name: locStor.user.name,
            email: locStor.user.email,
            entries: this.smallSpinner,
            joined: locStor.user.joined
          }
        });

        fetch(this.apiUrl + 'profile/' + locStor.user.id, {
          method: 'get',
          headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(data => {
          if (data === 'Error getting user') {
            console.log("Oops, couldn't get rank for a logged in user")
          } else {
            this.setState({
              user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
              }
            });
          }             
        })
        //.then(localStorage.setItem(this.localStorageStateKey, JSON.stringify(this.state)))
        .catch(err => console.log(err)); 
      }
    }
  }

// FULLY WORKING RENDER WITHOUT ROUTER
  // render() {
  //   return (
  //     <div className="App">
  //       <Particles className='particles'
  //                 params={{
  //                     interactivity: {
  //                       onhover: {
  //                         enable: true,
  //                         mode: 'repulse'
  //                       }
  //                     }
  //                 }} />
  //       <div className = 'navig'>
  //         <Logo/>
  //         <Navigation  onRouteChange = { this.onRouteChange } isSignedin = { this.state.isSignedin } route = { this.state.route } />
  //       </div>
  //       { this.state.route === 'home'
  //         ? <div>
  //             <Rank user={ this.state.user }/>
  //             <ImageLinkForm
  //               onInputChange={ this.onInputChange }
  //               onButtonSubmit={ this.onButtonSubmit }
  //               onEnterPress={ this.onEnterPress }
  //               tab={ this.state.tab }
  //               onTabChange={ this.onTabChange }
  //               onFileChange={ this.onFileChange }
  //             />
  //             <FaceRecognition boxes={ this.state.boxes } imageUrl={ this.state.imageUrl } imageIsBeingProcessed = { this.state.imageIsBeingProcessed } bigSpinner = { this.bigSpinner } /> 
  //           </div>
  //         : (
  //             this.state.route === 'signin'
  //               ? <SignIn onRouteChange={ this.onRouteChange } loadUser={ this.loadUser } signInErrorMessage={this.signInErrorMessage} apiUrl={this.apiUrl}/>
  //               : <Register onRouteChange={ this.onRouteChange } loadUser={ this.loadUser } apiUrl={ this.apiUrl }/>
  //           )
  //       }   
  //     </div>
  //   );
  // }

  // RENDER IN DEVELOPMENT, USES ROUTER
  render() {
    return (
      <div className='App'>
      <Particles className='particles'
        params={{
            interactivity: {
              onhover: {
                enable: true,
                mode: 'repulse'
              }
            }
        }} />
    <div className = 'navig'>
      <Logo/>    
        <nav className='mr4' style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end'}}>
          { !FaceRecLoginManager.isSignedin()
            ? 
              <div className='flxwrp'>
                <NavLink to="/facerecognition/signin" className="navButton f4 ml3 mb2" activeClassName="activePage" isActive={isActive.bind(this, "/facerecognition/signin")}>
                  Sign In
                </NavLink>
                <NavLink to="/facerecognition/register" className="navButton f4 ml3 mb2" activeClassName="activePage" isActive={isActive.bind(this, "/facerecognition/register")}>
                  Register
                </NavLink>
              </div>
            :
              <div className='flxwrp'>
                <NavLink to="/facerecognition/detect" className="navButton f4 ml3 mb2" activeClassName="activePage" isActive={isActive.bind(this, "/facerecognition/detect")}>
                    Detect
                  </NavLink>
                  <NavLink to="/facerecognition/gallery" className="navButton f4 ml3 mb2" activeClassName="activePage" isActive={isActive.bind(this, "/facerecognition/gallery")}>
                    Gallery
                  </NavLink>
                  <span onClick={()=>this.onRouteChange('signin')} className="navButton f4 ml3 mb2">
                    Sign Out
                  </span>
                </div>
          }
        </nav>
      </div>

        <Switch>
          <Route exact path='/facerecognition'>
            <Redirect to='/facerecognition/signin' />
          </Route>
          <Route exact path='/facerecognition/signin'>
            { FaceRecLoginManager.isSignedin()
              ?
                <Redirect to='/facerecognition/detect' />
              :
                <div>
                  <SignIn onRouteChange={ this.onRouteChange } loadUser={ this.loadUser } signInErrorMessage={this.signInErrorMessage} apiUrl={this.apiUrl}/>
                </div>
            }
          </Route> 
          <Route exact path='/facerecognition/register'>
            { FaceRecLoginManager.isSignedin()
              ?
                <Redirect to='/facerecognition/detect' />
              :
                <div>
                  <Register onRouteChange={ this.onRouteChange } loadUser={ this.loadUser } apiUrl={ this.apiUrl }/>
                </div>
            } 
          </Route>
          <Route exact path='/facerecognition/detect'>
            { !FaceRecLoginManager.isSignedin()
              ?
                <Redirect to='/facerecognition/signin' />
              :
                <div>
                  <div>
                  <Rank user={ this.state.user }/>
                    <ImageLinkForm
                      onInputChange={ this.onInputChange }
                      onButtonSubmit={ this.onButtonSubmit }
                      onEnterPress={ this.onEnterPress }
                      tab={ this.state.tab }
                      onTabChange={ this.onTabChange }
                      onFileChange={ this.onFileChange }
                    />
                    <FaceRecognition boxes={ this.state.boxes } imageUrl={ this.state.imageUrl } imageIsBeingProcessed = { this.state.imageIsBeingProcessed } bigSpinner = { this.bigSpinner } /> 
                  </div>
                </div>
            } 
          </Route>  
          <Route exact path='/facerecognition/gallery'>
            { !FaceRecLoginManager.isSignedin()
              ?
                <Redirect to='/facerecognition/signin' />
              :
                <div>
                  <Gallery ownerid={ this.state.user.id } apiUrl={ this.apiUrl } user={ this.state.user }/>
                </div>
            } 
          </Route>
          <Route path='*'>            
                  <div>The page doesn't seem to exist.<br/>Why don't you <Link to='/facerecognition/detect' className="navButton">go home</Link>?</div>
          </Route>
        </Switch>        
      </div>
    );
  }
}

const isActive = (path, match, location) => !!(match || path === location.pathname);

export default App;