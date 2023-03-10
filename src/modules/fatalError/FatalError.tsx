export interface ActionCodeVerificationInfoParams {
    errorText: string | null;
}
function FatalError(params: ActionCodeVerificationInfoParams) {
    return (<>
        <h1>{ params.errorText }</h1>
    </>);
}

export default FatalError;