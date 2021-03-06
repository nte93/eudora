import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

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
        this.storage = app.storage();
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
    userDb = uid => this.db.ref(`users/${uid}`);
    
    users = () => this.db.ref('users');

    currentUser = () => this.auth.currentUser;



    // *** Profile API ***

    profile = uid => this.db.ref(`profiles/${uid}`);

    profiles = () => this.db.ref('profiles');

    following = (uid) => this.db.ref(`profiles/${uid}/following`);

    updateAvatar = (avatar) => this.auth.currentUser.updateProfile({photoUrl:avatar});

    updateAvatarDb = (uid, photoUrl) => this.db.ref(`profiles/${uid}`).update({photoUrl: photoUrl});

    fileRef = (foldername, filename, uid) => this.storage.ref(`${foldername}`).child(`${uid}/${filename}`);

    addWishlistDb = (uid, title, url, image, id, price, purchased, note, seller) => this.db.ref(`profiles/${uid}/wishlist/${id}`).update({id: id, title: title, url: url, image: image, price: price, purchased: purchased, note:note, seller: seller});

    removeWishlistDb = (uid, id) => this.db.ref(`profiles/${uid}/wishlist/${id}`).remove();

    getWishlistNote = (uid, id) => this.db.ref(`profiles/${uid}/wishlist/${id}/note`);

    updateWishlistNote = (uid, id, note) => this.db.ref(`profiles/${uid}/wishlist/${id}`).update({note:note});

    items = (uid) => this.db.ref(`profiles/${uid}/wishlist`);

    getFirstName = (uid) => this.db.ref(`profiles/${uid}/firstName`);

    getLastName = (uid) => this.db.ref(`profiles/${uid}/lastName`);

    getPhotoUrl = (uid) => this.db.ref(`profiles/${uid}/photoUrl`);

    getPurchaseStatus = (uid, id) => this.db.ref(`profiles/${uid}/wishlist/${id}/purchased`);

    updatePurchaseStatus = (uid, id, status) => this.db.ref(`profiles/${uid}/wishlist/${id}`).update({purchased: status});

    getFollowingList = (uid)  => this.db.ref(`profiles/${uid}/following`);

    addFollowingList = (uid, targetUid) => this.db.ref(`profiles/${uid}/following/${targetUid}`).update({followingUid: targetUid});

    updateFollowingList = (uid, targetUid) => this.db.ref(`profiles/${uid}/following/${targetUid}`).update({followingUid: targetUid});

    removeFollowingList = (uid, targetUid) => this.db.ref(`profiles/${uid}/following/${targetUid}`).remove();

    getBirthday = (uid) => this.db.ref(`profiles/${uid}/holidays/birthday/date`);
    getBirthdayObj = (uid) => this.db.ref(`profiles/${uid}/holidays/birthday`);

    //updateBirthday = (uid, birthday) => this.db.ref(`profiles/${uid}/holidays/birthday`).update({date: birthday, celebrated: false, holiday: "My Birthday", holidayId: "birthday"});

    updateBirthday = (uid, birthday, date) => this.db.ref(`profiles/${uid}/holidays/birthday`).update({date: date, celebrated: false, holiday: "My Birthday", holidayId: "birthday", label: "Birthday", value: "birthday"});

    getHolidays = (uid) => this.db.ref(`profiles/${uid}/holidays`);

    addHolidays = (uid, label, holidayId, value, holiday, date, celebrated) => this.db.ref(`profiles/${uid}/holidays/${holidayId}`).update({date: date, celebrated: celebrated, holiday: holiday, holidayId: holidayId, label: label, value: value});

    removeHolidays = (uid, targetHoliday) => this.db.ref(`profiles/${uid}/holidays/${targetHoliday}`).remove();

    removeAllHolidays = (uid) => this.db.ref(`profiles/${uid}/holidays`).remove();

    getLanguage = (uid) => this.db.ref(`profiles/${uid}/language`);

    setLanguage = (uid, language) => this.db.ref(`profiles/${uid}/language`).update({language});

}

export default Firebase;