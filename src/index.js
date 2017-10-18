// npm modules
import React from "react";
import ReactDOM from "react-dom";

// service worker for create react app
import registerServiceWorker from "registerServiceWorker";

// firebase module for login
//import firebase from "fire";

// user modules
import App from "app";

// style
import "../node_modules/reset-css/reset.css";

// firebase.auth().getRedirectResult().then(function(result) {
//   if (result.credential) {
//     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//     //let token = result.credential.accessToken;
//     console.log("success");
//     // ...
//   }
//   // The signed-in user info.
//   //let user = result.user;
// }).catch(function(error) {
//   // Handle Errors here.
//   //let errorCode = error.code;
//   //let errorMessage = error.message;
//   // The email of the user's account used.
//   //let email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   //let credential = error.credential;
//   // ...
//   console.log("fail");
// });

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
