(this.webpackJsonpfacerecognitionbrain=this.webpackJsonpfacerecognitionbrain||[]).push([[0],{221:function(e,t,a){},222:function(e,t,a){},224:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(63),i=a.n(s),o=(a(71),a(10)),l=a(11),c=a(13),m=a(12),u=(a(72),a(64)),p=a.n(u),g=(a(221),a(35),function(e){var t=e.imageUrl,a=e.boxes;return r.a.createElement("div",{className:"center",style:{marginTop:"50px",marginBottom:"50px"}},r.a.createElement("div",{className:"imageWrap absolute mt2"},r.a.createElement("img",{id:"image",src:t,alt:"",style:{width:"500px",height:"auto",marginBottom:"-4px"}}),a))}),d=(a(222),function(e){var t=e.onInputChange,a=e.onButtonSubmit,n=e.onEnterPress;return r.a.createElement("div",null,r.a.createElement("p",{className:"f3"},"This engine will detect faces in your pictures. Give it a try!"),r.a.createElement("div",{className:"center"},r.a.createElement("div",{className:"pa3 br3 shadow-5 form",style:{maxWidth:"1400px",width:"90%",display:"inline"}},r.a.createElement("input",{onKeyDown:n,placeholder:"Paste image link here",className:"br3 f4 pa2 w-70",type:"text",onChange:t}),r.a.createElement("button",{className:" br3 grow f4 link ph3 pv2 dib white bg-light-purple ma2",onClick:a},"Detect"))))}),h=function(e){var t=e.onRouteChange;return e.isSignedin?r.a.createElement("nav",{style:{display:"flex",justifyContent:"flex-end",marginRight:"50px"}},r.a.createElement("p",{onClick:function(){return t("signin")},className:"f3 link dim black underline pa3 pointer"},"Sign Out")):r.a.createElement("nav",{style:{display:"flex",justifyContent:"flex-end",marginRight:"50px"}},r.a.createElement("p",{onClick:function(){return t("signin")},className:"f3 link dim black underline pa3 pointer"},"Sign In"),r.a.createElement("p",{onClick:function(){return t("register")},className:"f3 link dim black underline pa3 pointer"}," Register"))},b=function(e){var t=e.user;return r.a.createElement("div",{className:"mt4"},r.a.createElement("div",{className:"white f3"},"".concat(t.name,", you have processed")),r.a.createElement("div",{className:"white f1"},t.entries),r.a.createElement("div",{className:"white f3 ma",style:{marginTop:"-0.3em"}},"images"))},f=a(65),E=a.n(f),v=function(e){Object(c.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this)).onNameChange=function(e){a.setState({name:e.target.value})},a.onEmailChange=function(e){a.setState({email:e.target.value})},a.onPasswordChange=function(e){a.setState({password:e.target.value})},a.onEnterPress=function(e){"Enter"===e.key&&a.onSubmitRegister()},a.onSubmitRegister=function(){E()({email:a.state.email,emailRepeat:a.state.email})?""===a.state.email?a.setState({registerError:"Email is required"}):a.state.password.length<8?a.setState({registerError:"Password should be at least 8 characters long"}):a.state.name.length<2?a.setState({registerError:"Name should be at least 2 characters long"}):(a.setState({registerLoading:!0}),fetch(a.props.apiUrl+"register",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:a.state.name,email:a.state.email,password:a.state.password})}).then((function(e){return e.json()})).then((function(e){"All fields are required"===e||"A profile with this email already exists"===e||"There was a problem with our server"===e?a.setState({registerError:e}):(a.setState({registerregisterError:""}),a.props.loadUser(e),a.props.onRouteChange("home")),a.setState({registerLoading:!1})})).catch((function(e){return a.setState({registerError:"Couldn\u2019t reach server",registerLoading:!1})}))):a.setState({registerError:"Wrong email format"})},a.state={name:"",email:"",password:"",registerError:"",registerLoading:!1},a}return Object(l.a)(n,[{key:"render",value:function(){return r.a.createElement("article",{className:"br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw5 center"},r.a.createElement("main",{className:"pa4 black-80"},r.a.createElement("div",{className:"measure"},r.a.createElement("fieldset",{id:"sign_up",className:"ba b--transparent ph0 mh0"},r.a.createElement("legend",{className:"f2 fw6 ph0 mh0"},"Register"),""!==this.state.registerError?r.a.createElement("div",{style:{color:"red"}},this.state.registerError,", try\xa0again:"):null,r.a.createElement("div",{className:"mt3"},r.a.createElement("label",{className:"db fw6 lh-copy f6",htmlFor:"names"},"Name"),r.a.createElement("input",{onChange:this.onNameChange,onKeyDown:this.onEnterPress,className:"pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100",type:"text",name:"name",id:"name"})),r.a.createElement("div",{className:"mt3"},r.a.createElement("label",{className:"db fw6 lh-copy f6",htmlFor:"email-address"},"E-mail"),r.a.createElement("input",{onChange:this.onEmailChange,onKeyDown:this.onEnterPress,className:"pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100",type:"email",name:"email-address",id:"email-address"})),r.a.createElement("div",{className:"mv3"},r.a.createElement("label",{className:"db fw6 lh-copy f6",htmlFor:"password"},"Password"),r.a.createElement("input",{onChange:this.onPasswordChange,onKeyDown:this.onEnterPress,className:"b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100",type:"password",name:"password",id:"password"}))),r.a.createElement("div",{className:"buttonOrSpinner"},this.state.registerLoading?r.a.createElement("div",{key:"spinner",className:"spinnerWrap"},r.a.createElement("img",{src:a(36),alt:"...",className:"spinner"})):r.a.createElement("input",{onClick:this.onSubmitRegister,className:"b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib",type:"submit",value:"Register"})))))}}]),n}(r.a.Component),w=function(e){Object(c.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this)).onEmailChange=function(e){a.setState({signInEmail:e.target.value})},a.onPasswordChange=function(e){a.setState({signInPassword:e.target.value})},a.onEnterPress=function(e){"Enter"===e.key&&a.onSubmitSignIn()},a.onSubmitSignIn=function(){""!==a.state.signInEmail&&""!==a.state.signInPassword?(a.setState({signInLoading:!0}),fetch(a.props.apiUrl+"signin",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:a.state.signInEmail,password:a.state.signInPassword})}).then((function(e){return e.json()})).then((function(e){"Both fields are required"===e||"Error logging in"===e||"Wrong username or\xa0password"===e?a.setState({signInError:e}):(a.setState({signInError:""}),a.props.loadUser(e),a.props.onRouteChange("home")),a.setState({signInLoading:!1})})).catch((function(e){return a.setState({signInError:"Server is unavailable",signInLoading:!1})}))):a.setState({signInError:"Both fields are required"})},a.state={signInEmail:"",signInPassword:"",signInError:"",signInLoading:!1},a}return Object(l.a)(n,[{key:"render",value:function(){var e=this.props.onRouteChange;return r.a.createElement("article",{className:"br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw5 center"},r.a.createElement("main",{className:"pa4 black-80"},r.a.createElement("div",{className:"measure"},r.a.createElement("fieldset",{id:"sign_up",className:"ba b--transparent ph0 mh0"},r.a.createElement("legend",{className:"f2 fw6 ph0 mh0"},"Sign In"),""!==this.state.signInError?r.a.createElement("div",{style:{color:"red"}},this.state.signInError,", try again:"):null,r.a.createElement("div",{className:"mt3"},r.a.createElement("label",{className:"db fw6 lh-copy f6",htmlFor:"email-address"},"E-mail"),r.a.createElement("input",{onChange:this.onEmailChange,onKeyDown:this.onEnterPress,className:"pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100",type:"email",name:"email-address",id:"email-address"})),r.a.createElement("div",{className:"mv3"},r.a.createElement("label",{className:"db fw6 lh-copy f6",htmlFor:"password"},"Password"),r.a.createElement("input",{onChange:this.onPasswordChange,onKeyDown:this.onEnterPress,className:"b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100",type:"password",name:"password",id:"password"}))),r.a.createElement("div",{className:"buttonOrSpinner"},this.state.signInLoading?r.a.createElement("div",{key:"spinner",className:"spinnerWrap"},r.a.createElement("img",{src:a(36),alt:"...",className:"spinner"})):r.a.createElement("input",{onClick:this.onSubmitSignIn,className:"b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib",type:"submit",value:"Sign in"})),r.a.createElement("div",{className:"lh-copy mt3"},r.a.createElement("p",{onClick:function(){return e("register")},className:"pointer f6 link dim black db"},"Register")))))}}]),n}(r.a.Component),y=function(e){Object(c.a)(n,e);var t=Object(m.a)(n);function n(){var e;return Object(o.a)(this,n),(e=t.call(this)).loadUser=function(t){e.setState({user:{id:t.id,name:t.name,email:t.email,entries:t.entries,joined:t.joined}})},e.calculateFaceLocation=function(e){for(var t=[],a=e.outputs[0].data.regions.length,n=0;n<a;n++){var r=e.outputs[0].data.regions[n].region_info.bounding_box,s=document.getElementById("image"),i=Number(s.width),o=Number(s.height);t.push({leftCol:Math.floor(r.left_col*i)+"px",topRow:Math.floor(r.top_row*o)+"px",rightCol:Math.floor(i-r.right_col*i)+"px",bottomRow:Math.floor(o-r.bottom_row*o)+"px"})}return t},e.displayFaceBoxes=function(t){for(var a=[],n=0;n<t.length;n++){var s=[r.a.createElement("div",{key:n,className:"bounding-box",style:{top:t[n].topRow,right:t[n].rightCol,bottom:t[n].bottomRow,left:t[n].leftCol}},"  ")];a=a.concat(s)}e.setState({boxes:a})},e.onInputChange=function(t){e.setState({input:t.target.value})},e.onEnterPress=function(t){"Enter"===t.key&&e.onButtonSubmit()},e.submitImage=function(){fetch(e.apiUrl+"imageurl",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({input:e.state.input})}).then((function(e){return e.json()})).then((function(t){"Invalid image link"===t?e.setState({boxes:[r.a.createElement("div",{style:{color:"red",fontSize:"16pt",textShadow:"0px 1px 3px black"},key:"fail"},"Invalid link, try again.")]}):null==t.outputs[0].data.regions?e.setState({boxes:[r.a.createElement("div",{style:{color:"red",fontSize:"16pt"},key:"fail"},r.a.createElement("br",null),"No faces found on submitted image, try again.")]}):(e.displayFaceBoxes(e.calculateFaceLocation(t)),fetch(e.apiUrl+"rankup",{method:"put",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e.state.user.id})}).then((function(e){return e.json()})).then((function(t){e.setState({user:{id:e.state.user.id,name:e.state.user.name,email:e.state.user.email,entries:t,joined:e.state.user.joined}})})).catch(console.log))})).catch((function(t){e.setState({boxes:[r.a.createElement("div",{style:{color:"red",fontSize:"16pt"},key:"fail"},"Unknown server error, try again later.")]})}))},e.onButtonSubmit=function(t){e.setState({imageUrl:e.state.input,boxes:[r.a.createElement("div",{key:"spinner",className:"spinnerWrap onTop"},r.a.createElement("img",{src:a(36),alt:"...",className:"spinner bigger"}))]},(function(){return e.submitImage()}))},e.onRouteChange=function(t){"signin"===t?e.setState({isSignedin:!1}):"home"===t&&e.setState({isSignedin:!0}),e.setState({route:t}),e.setState({boxes:[],imageUrl:""})},e.state={input:"",imageUrl:"",boxes:[],route:"signin",isSignedin:!1,user:{id:"",name:"",email:"",entries:0,joined:""}},e.apiUrl="https://limitless-badlands-68204.herokuapp.com/",e}return Object(l.a)(n,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(p.a,{className:"particles",params:{interactivity:{onhover:{enable:!0,mode:"repulse"}}}}),r.a.createElement(h,{onRouteChange:this.onRouteChange,isSignedin:this.state.isSignedin}),"home"===this.state.route?r.a.createElement("div",null,r.a.createElement(b,{user:this.state.user}),r.a.createElement(d,{onInputChange:this.onInputChange,onButtonSubmit:this.onButtonSubmit,onEnterPress:this.onEnterPress}),r.a.createElement(g,{boxes:this.state.boxes,imageUrl:this.state.imageUrl})):"signin"===this.state.route?r.a.createElement(w,{onRouteChange:this.onRouteChange,loadUser:this.loadUser,signInErrorMessage:this.signInErrorMessage,apiUrl:this.apiUrl}):r.a.createElement(v,{onRouteChange:this.onRouteChange,loadUser:this.loadUser,apiUrl:this.apiUrl}))}}]),n}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(223);i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},35:function(e,t,a){},36:function(e,t,a){e.exports=a.p+"static/media/spinner.15268e97.png"},66:function(e,t,a){e.exports=a(224)},71:function(e,t,a){},72:function(e,t,a){}},[[66,1,2]]]);