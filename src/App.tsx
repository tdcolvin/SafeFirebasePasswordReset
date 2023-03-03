import { useEffect, useState } from 'react';
import './App.scss';
import OOBVerificationInfo from './modules/oobVerificationInfo/OOBVerificationInfo';
import PasswordChange from './modules/passwordChange/PasswordChange';

function App() {
  //Are we currently verifying the OOB?
  const [oobVerificationInProgress, setOobVerificationInProgress] = useState(true);
  const [oobVerificationError, setOobVerificationError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setOobVerificationInProgress(true);

    async function verifyOob() {
      setOobVerificationInProgress(true);
      setOobVerificationError(undefined);

      await new Promise((resolve) => setTimeout(() => resolve(null), 5000));
    };

    verifyOob()
      .catch(e => {
        setOobVerificationError("Unable to verify your email link. Please confirm you are connected to the internet and try again.");
        console.log("Error verifying OOB", e);
      })
      .finally(() => setOobVerificationInProgress(false));
  }, []);

  return (
    <div className="App">
      { (oobVerificationInProgress || oobVerificationError) &&
        <OOBVerificationInfo errorText={ oobVerificationError }/>
      }
      { !oobVerificationInProgress && !oobVerificationError && 
        <PasswordChange />
      }
    </div>
  );
}

export default App;
