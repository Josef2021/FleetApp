const prodConfig = {
  apiKey: process.env.PROD_REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.PROD_REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.PROD_REACT_APP_FIREBASE_DATA_BASE_URL,
  projectId: process.env.PROD_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.PROD_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.PROD_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.PROD_REACT_APP_FIREBASE_APP_ID,
};

const devConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATA_BASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

export default config;
