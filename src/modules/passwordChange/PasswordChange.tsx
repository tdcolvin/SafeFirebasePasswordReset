import { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";
import { SubmissionState } from "../../types";

const MIN_SCORE = 3;
const MIN_CHARS = 8;

export interface PasswordChangeParams {
  submissionState: SubmissionState,
  submitNewPassword: (password: string) => {},
  submitError: string | null
}

function PasswordChange(params: PasswordChangeParams) {
  //Password and password confirmation
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  //Result of security check on newPassword1
  const [zxcvbnResult, setZxcvbnResult] = useState<zxcvbn.ZXCVBNResult | null>(null);

  //The headline error - eg password too short or not secure enough
  const [passwordHeadlineError, setPasswordHeadlineError] = useState<string | null>(null);
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

  useEffect(() => setNewPassword(""), []);

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
      { newPassword2.length > 0 && newPassword1 !== newPassword2 &&
        <p className="error">Passwords do not match</p>
      }

      <button disabled={ params.submissionState !== SubmissionState.NOT_SUBMITTING || !!passwordHeadlineError || newPassword1 !== newPassword2 } onClick={() => params.submitNewPassword(newPassword1)}>{ params.submissionState === SubmissionState.SUBMITTING ? "Submitting..." : "Submit" }</button>
      { params.submitError &&
        <p className="error">{params.submitError}</p>
      }
    </div>
  );
}

export default PasswordChange;
