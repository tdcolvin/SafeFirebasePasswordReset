import { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";

const MIN_SCORE = 3;
const MIN_CHARS = 8;

function PasswordChange() {
  //Password and password confirmation
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  //Result of security check on newPassword1
  const [zxcvbnResult, setZxcvbnResult] = useState<zxcvbn.ZXCVBNResult | null>(null);

  //The headline error - eg password too short or not secure enough
  const [passwordHeadlineError, setPasswordHeadlineError] = useState<string | null>(null);

  //Any error which turned up whilst trying to submit the new password
  const [error, setError] = useState<string | null>(null);

  //Are we currently submitting the new password?
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => setNewPassword(""), []);

  function setNewPassword(password: string) {
    setNewPassword1(password);
    
    const zr = zxcvbn(password);
    setZxcvbnResult(zr);
    
    if (password.length < MIN_CHARS) {
      setPasswordHeadlineError(`Please enter at least ${MIN_CHARS} characters`);
    }
    else if (zr.score < MIN_SCORE) {
      setPasswordHeadlineError("Password is not secure enough");
    }
    else {
      setPasswordHeadlineError(null);
    }
  }
  
  async function doSubmit() {
    setSubmitting(true);
    setError(null);

    try {
      if (newPassword1 != newPassword2) {
        //Don't display anything else, the UI will already be showing the error
        return;
      }

      //Test the password security
      const securityResult = zxcvbn(newPassword1);

      //Cancel if security is not sufficient
      if (securityResult.score < MIN_SCORE) {
        setError("Password is not secure enough");
        return;
      }
    }
    finally {
      //setSubmitting(false);
    }
  }

  return (
    <div className="App">
      <h1>Reset your password</h1>
      <p>Thanks for confirming your email address. You can now reset your password below.</p>

      <label htmlFor="newPassword1">New password</label>
      <input type="password" id="newPassword1" value={newPassword1} onChange={ event => setNewPassword(event.target.value) } />

      { newPassword1.length < MIN_CHARS &&
        <p className="error">Please enter at least { MIN_CHARS } characters</p>
      }

      { newPassword1.length >= MIN_CHARS && <>
        { passwordHeadlineError &&
          <p className="error">{ passwordHeadlineError }</p>
        }
        { !passwordHeadlineError &&
          <p className="ok">Strong password</p>
        }

        { zxcvbnResult?.feedback?.warning &&
          <p className="warn">{ zxcvbnResult.feedback.warning }</p>
        }

        { !!zxcvbnResult?.feedback?.suggestions?.length &&
          <ul className="suggestions">
            { zxcvbnResult.feedback.suggestions.map(suggestion =>
                <li>{ suggestion }</li>
              )
            }
          </ul>
        }
      </>}

      <label htmlFor="newPassword2">Confirm password</label>
      <input type="password" id="newPassword2" value={newPassword2} onChange={ event => setNewPassword2(event.target.value) } />
      { newPassword2.length > 0 && newPassword1 != newPassword2 &&
        <p className="error">Passwords do not match</p>
      }

      <button disabled={ submitting || !!passwordHeadlineError || newPassword1 !== newPassword2 } onClick={() => doSubmit()}>{ submitting ? "Submitting..." : "Submit" }</button>
      { error &&
        <p className="error">{error}</p>
      }
    </div>
  );
}

export default PasswordChange;
