import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = require('../../config').default;

var firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    databaseURL: config.databaseURL,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
  };

class Firebase{
    constructor(){
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.db = app.database();
    }

    // Authentication API

    // Create user with email and password
    doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

    // Setup Signin that uses Email and Password
    doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    // Sign Out
    doSignOut = () => this.auth.signOut();

    // Reset and update passsword
    doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

    // Password update
    doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);

    // *** User API ***
    user = uid => this.db.ref(`users/${uid}`);
    
    users = () => this.db.ref('users');

    
}

export default Firebase;