import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FirebaseAppProvider } from 'reactfire';
import useLocationHash from './hooks/useLocationHash';
import firebaseConfig from './firebaseConfig';

const FirebaseAppFromApiKey = function() {
  const hash = useLocationHash();
  const apiKey = hash["apiKey"] ?? "";
  const mode = hash["mode"] ?? "";

  useEffect(() => {
    //We only support password reset here. Otherwise redirect to the default Firebase /auth/action app.
    if (mode !== "resetPassword") {
      const redirectParams = Object.keys(hash).reduce((s, key) => `${s ? `${s}&` : "?"}${key}=${hash[key]}`, "");
      window.location.href = `https://${firebaseConfig.projectId ?? "__"}.firebaseapp.com/__/auth/action${redirectParams}`;
    }
  }, [mode]);

  useEffect(() => {
    if (!firebaseConfig.apiKey) {
      console.log("********** WARNING **********");
      console.log("You have not set up an API key. We will use the API key passed in via params. This will work, but means");
      console.log("your hosted app can be used by other Firebase projects.");
      console.log("If that's your intention, then this warning can be ignored.");
      console.log("Otherwise please update the firebaseConfig.ts file.");
      console.log("******************************");
    }
    if (!firebaseConfig.apiKey) {
      console.log("********** WARNING **********");
      console.log("You have not set up an project ID. Without this we won't reliably be able to redirect to the default");
      console.log("/auth/action app in case this app is required to perform something other than password reset.");
      console.log("Please update the firebaseConfig.ts file.");
      console.log("******************************");
    }
  }, [firebaseConfig]);

  //If the programmer hasn't set up the Firebase config properly, then we'll make do with
  //what's passed in.
  const usedFirebaseConfig = (firebaseConfig.apiKey) ? firebaseConfig : { ...firebaseConfig, apiKey };

  return (
    <FirebaseAppProvider firebaseConfig={ usedFirebaseConfig }>
      <App />
    </FirebaseAppProvider>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <FirebaseAppFromApiKey />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
