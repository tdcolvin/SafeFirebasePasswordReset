import ok from "../../res/ok.svg";
import "./PasswordChangeSuccess.scss"

function PasswordChangeSuccess() {
    return (<>
        <img src={ ok } alt="" />
        <h1>Your password has been successfully changed</h1>
        <p>You can now close this window and log in as usual with your new password.</p>
    </>);
}

export default PasswordChangeSuccess;