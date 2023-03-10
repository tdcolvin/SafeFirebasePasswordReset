import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FirebaseAppProvider } from 'reactfire';
import useLocationHash from './hooks/useLocationHash';

const FirebaseAppFromApiKey = function() {
  const hashParams = useLocationHash().split(/&|\?/);
  const apiKey = hashParams.find((param) => param.startsWith("apiKey="))?.substring(7) ?? "";

  return (
    <FirebaseAppProvider firebaseConfig={ {apiKey} }>
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
