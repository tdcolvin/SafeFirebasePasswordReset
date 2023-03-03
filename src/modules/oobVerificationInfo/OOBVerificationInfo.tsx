import ProgressSpinner from "../../components/progressSpinner/ProgressSpinner";

export interface OOBVerificationInfoParams {
    errorText?: string;
}
function OOBVerificationInfo(params: OOBVerificationInfoParams) {
    return (<>
        { params.errorText && <h1>{ params.errorText }</h1> }
        { !params.errorText && <ProgressSpinner /> }
    </>);
}

export default OOBVerificationInfo;