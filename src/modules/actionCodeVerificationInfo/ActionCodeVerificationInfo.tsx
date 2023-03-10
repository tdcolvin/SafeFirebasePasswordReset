import ProgressSpinner from "../../components/progressSpinner/ProgressSpinner";

export interface ActionCodeVerificationInfoParams {
    errorText: string | null;
}
function ActionCodeVerificationInfo(params: ActionCodeVerificationInfoParams) {
    return (<>
        { params.errorText && <h1>{ params.errorText }</h1> }
        { !params.errorText && <ProgressSpinner /> }
    </>);
}

export default ActionCodeVerificationInfo;