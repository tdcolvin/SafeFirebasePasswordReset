import ProgressSpinner from "../../components/progressSpinner/ProgressSpinner";

export interface ActionCodeVerificationInfoParams {
    errorText?: string;
}
function ActionCodeVerificationInfo(params: ActionCodeVerificationInfoParams) {
    return (<>
        { params.errorText && <h1>{ params.errorText }</h1> }
        { !params.errorText && <ProgressSpinner /> }
    </>);
}

export default ActionCodeVerificationInfo;