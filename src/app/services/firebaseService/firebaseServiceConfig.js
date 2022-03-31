const prodConfig = {
  // apiKey           : "YOUR_API_KEY",
  // authDomain       : "your-app.firebaseapp.com",
  // databaseURL      : "https://your-app.firebaseio.com",
  // projectId        : "your-app",
  // storageBucket    : "your-app.appspot.com",
  // messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
};

const devConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: "https://your-app.firebaseio.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// CONFIGURATION FROM THE FIREBASE ITSELF
// const firebaseConfig = {
//   apiKey: "AIzaSyCfPOoTigQufoG5hpyef2o-VkhvC4EqNsY",
//   authDomain: "semetey-authentication.firebaseapp.com",
//   projectId: "semetey-authentication",
//   storageBucket: "semetey-authentication.appspot.com",
//   messagingSenderId: "150917536545",
//   appId: "1:150917536545:web:65ebe3503473f3eedefc60"
// };

// REACT_APP_FIREBASE_API_KEY =AIzaSyCfPOoTigQufoG5hpyef2o-VkhvC4EqNsY
// REACT_APP_FIREBASE_AUTH_DOMAIN=semetey-authentication.firebaseapp.com
// REACT_APP_FIREBASE_PROJECT_ID=semetey-authentication
// REACT_APP_FIREBASE_STORAGE_BUCKET=semetey-authentication.appspot.com
// REACT_APP_FIREBASE_MESSAGING_SENDER_ID=150917536545
// REACT_APP_FIREBASE_APP_ID=1:150917536545:web:65ebe3503473f3eedefc60

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

export default config;
