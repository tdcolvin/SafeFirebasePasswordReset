import { useEffect, useState } from 'react';
import './App.scss';
import ActionCodeVerificationInfo from './modules/actionCodeVerificationInfo/ActionCodeVerificationInfo';
import PasswordChange from './modules/passwordChange/PasswordChange';

function App() {
  //Are we currently verifying the action code?
  const [actionCodeVerificationInProgress, setActionCodeVerificationInProgress] = useState(true);
  const [actionCodeVerificationError, setActionCodeVerificationError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setActionCodeVerificationInProgress(true);

    async function verifyActionCode() {
      setActionCodeVerificationInProgress(true);
      setActionCodeVerificationError(undefined);

      await new Promise((resolve) => setTimeout(() => resolve(null), 5000));
    };

    verifyActionCode()
      .catch(e => {
        setActionCodeVerificationError("Unable to verify your email link. Please confirm you are connected to the internet and try again.");
        console.log("Error verifying action code", e);
      })
      .finally(() => setActionCodeVerificationInProgress(false));
  }, []);

  return (
    <div className="App">
      { (actionCodeVerificationInProgress || actionCodeVerificationError) &&
        <ActionCodeVerificationInfo errorText={ actionCodeVerificationError }/>
      }
      { !actionCodeVerificationInProgress && !actionCodeVerificationError && 
        <PasswordChange />
      }
    </div>
  );
}

export default App;
