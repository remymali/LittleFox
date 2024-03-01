// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyDNMQO11KHil0Avlr4Xn3CkAKtNFdUzGn8",
    authDomain: "littlefoxpushnotification.firebaseapp.com",
    projectId: "littlefoxpushnotification",
    storageBucket: "littlefoxpushnotification.appspot.com",
    messagingSenderId: "359454662127",
    appId: "1:359454662127:web:ef11f7a63a3e6513d3aa1a",
    measurementId: "G-KWE0XYK6Q1"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
      icon: payload.data.image,
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });