import { FirebaseError } from 'firebase/app';
import { checkActionCode, getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { AuthProvider, useFirebaseApp } from 'reactfire';
import './App.scss';
import useLocationHash from './hooks/useLocationHash';
import ActionCodeVerificationInfo from './modules/actionCodeVerificationInfo/ActionCodeVerificationInfo';
import PasswordChange from './modules/passwordChange/PasswordChange';

function App() {
  //Are we currently verifying the action code?
  const [actionCodeVerificationInProgress, setActionCodeVerificationInProgress] = useState(true);
  const [actionCodeVerificationError, setActionCodeVerificationError] = useState<string | undefined>(undefined);

  const hash = useLocationHash();
  const hashParams = hash.split(/&|\?/);
  const actionCode = hashParams.find((param) => param.startsWith("oobCode="))?.substring(8) ?? "";

  const auth = getAuth(useFirebaseApp());

  useEffect(() => {
    setActionCodeVerificationInProgress(true);

    async function verifyActionCode() {
      setActionCodeVerificationInProgress(true);
      setActionCodeVerificationError(undefined);

      try {
        await checkActionCode(auth, actionCode);
      }
      catch (e) {
        const errorCode = (e as FirebaseError).code;
        switch (errorCode) {
          case "auth/expired-action-code":
            setActionCodeVerificationError("Your email link has expired. Please try resetting your password again.");
            break;
          case "auth/invalid-action-code":
            setActionCodeVerificationError("Your email link was invalid. Please try resetting your password again.");
            break;
          case "auth/user-disabled":
            setActionCodeVerificationError("Your account has been disabled.");
            break;
          case "auth/user-not-found":
            setActionCodeVerificationError("Your account could not be found.");
            break;
          default:
            setActionCodeVerificationError("Unable to verify your email link. Please confirm you are connected to the internet and try again.");
            break;
        }
        console.error("Error checking action code", e);
      }
      finally {
        setActionCodeVerificationInProgress(false);
      }
    };

    verifyActionCode()
      .catch(e => {
        console.log("Error verifying action code", e);
      })
      .finally(() => setActionCodeVerificationInProgress(false));
  }, [auth, actionCode]);

  return (
    <AuthProvider sdk={auth}>
      <div className="App">
        { (actionCodeVerificationInProgress || actionCodeVerificationError) &&
          <ActionCodeVerificationInfo errorText={ actionCodeVerificationError }/>
        }
        { !actionCodeVerificationInProgress && !actionCodeVerificationError && 
          <PasswordChange actionCode={ actionCode }/>
        }
      </div>
    </AuthProvider>
  );
}

export default App;
