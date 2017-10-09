import firebase from "firebase";

// Initialize Firebase
let config = {
    apiKey: "AIzaSyDcIAX3pLTYodCScTU9g2psIfjkG5BHfmA",
    authDomain: "seoulapp-391fe.firebaseapp.com",
    databaseURL: "https://seoulapp-391fe.firebaseio.com",
    projectId: "seoulapp-391fe",
    storageBucket: "",
    messagingSenderId: "92794462361"
};

let fire = firebase.initializeApp(config);

export default fire;