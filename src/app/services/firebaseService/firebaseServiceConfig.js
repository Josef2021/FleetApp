const prodConfig = {
  apiKey: "AIzaSyBi1ZnoE2MLILp-TCNW3vtjhVCOoKoZc9Y",
  authDomain: "semetey-fuse-prod.firebaseapp.com",
  databaseURL: "https://semetey-fuse-prod-default-rtdb.firebaseio.com",
  projectId: "semetey-fuse-prod",
  storageBucket: "semetey-fuse-prod.appspot.com",
  messagingSenderId: "960278787110",
  appId: "1:960278787110:web:ab73e03623412b971d62e7"
};

const devConfig = {
  apiKey: "AIzaSyBAzvIPGN67QLp76be7_cKJFY9PrFY3n9g",
  authDomain: "semetey-fuse-dev.firebaseapp.com",
  databaseURL: "https://semetey-fuse-dev-default-rtdb.firebaseio.com",
  projectId: "semetey-fuse-dev",
  storageBucket: "semetey-fuse-dev.appspot.com",
  messagingSenderId: "473902364459",
  appId: "1:473902364459:web:3a97c1f14ad5a33ab2376e"
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

export default config;

// apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATA_BASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,