import { events, types, google, wrappers } from "./teleport/teleport"
import { OneOf as Event } from "./teleport/events"
import { HandleEventRequest as Request, HandleEventResponse as Response } from "./teleport/plugin"

export { Event };
export { events, types, google, wrappers };
export { Request, Response };

export class HandleEventBase {
    private request:Request
    private response:Response

    constructor(private requestData: ArrayBuffer) {
        this.request = Request.decode(this.requestData)
        this.response = new Response()
        this.response.Event = this.request.Event
    }

    run():void {
        const event = this.request.Event

        this.any(event)

        if (this.response.Event == null) {
            return
        }

        switch(event.type_index) {        
            case Event.EVENT_ACCESS_REQUEST_CREATE_INDEX:
                this.accessRequestCreate(event.AccessRequestCreate as events.AccessRequestCreate)
                break
        
            case Event.EVENT_ACCESS_REQUEST_DELETE_INDEX:
                this.accessRequestDelete(event.AccessRequestDelete as events.AccessRequestDelete)
                break
        
            case Event.EVENT_APP_CREATE_INDEX:
                this.appCreate(event.AppCreate as events.AppCreate)
                break
        
            case Event.EVENT_APP_DELETE_INDEX:
                this.appDelete(event.AppDelete as events.AppDelete)
                break
        
            case Event.EVENT_APP_SESSION_CHUNK_INDEX:
                this.appSessionChunk(event.AppSessionChunk as events.AppSessionChunk)
                break
        
            case Event.EVENT_APP_SESSION_REQUEST_INDEX:
                this.appSessionRequest(event.AppSessionRequest as events.AppSessionRequest)
                break
        
            case Event.EVENT_APP_SESSION_START_INDEX:
                this.appSessionStart(event.AppSessionStart as events.AppSessionStart)
                break
        
            case Event.EVENT_APP_UPDATE_INDEX:
                this.appUpdate(event.AppUpdate as events.AppUpdate)
                break
        
            case Event.EVENT_AUTH_ATTEMPT_INDEX:
                this.authAttempt(event.AuthAttempt as events.AuthAttempt)
                break
        
            case Event.EVENT_BILLING_CARD_CREATE_INDEX:
                this.billingCardCreate(event.BillingCardCreate as events.BillingCardCreate)
                break
        
            case Event.EVENT_BILLING_CARD_DELETE_INDEX:
                this.billingCardDelete(event.BillingCardDelete as events.BillingCardDelete)
                break
        
            case Event.EVENT_BILLING_INFORMATION_UPDATE_INDEX:
                this.billingInformationUpdate(event.BillingInformationUpdate as events.BillingInformationUpdate)
                break
        
            case Event.EVENT_CERTIFICATE_CREATE_INDEX:
                this.certificateCreate(event.CertificateCreate as events.CertificateCreate)
                break
        
            case Event.EVENT_CLIENT_DISCONNECT_INDEX:
                this.clientDisconnect(event.ClientDisconnect as events.ClientDisconnect)
                break
        
            case Event.EVENT_DATABASE_CREATE_INDEX:
                this.databaseCreate(event.DatabaseCreate as events.DatabaseCreate)
                break
        
            case Event.EVENT_DATABASE_DELETE_INDEX:
                this.databaseDelete(event.DatabaseDelete as events.DatabaseDelete)
                break
        
            case Event.EVENT_DATABASE_SESSION_END_INDEX:
                this.databaseSessionEnd(event.DatabaseSessionEnd as events.DatabaseSessionEnd)
                break
        
            case Event.EVENT_DATABASE_SESSION_QUERY_INDEX:
                this.databaseSessionQuery(event.DatabaseSessionQuery as events.DatabaseSessionQuery)
                break
        
            case Event.EVENT_DATABASE_SESSION_START_INDEX:
                this.databaseSessionStart(event.DatabaseSessionStart as events.DatabaseSessionStart)
                break
        
            case Event.EVENT_DATABASE_UPDATE_INDEX:
                this.databaseUpdate(event.DatabaseUpdate as events.DatabaseUpdate)
                break
        
            case Event.EVENT_DESKTOP_CLIPBOARD_RECEIVE_INDEX:
                this.desktopClipboardReceive(event.DesktopClipboardReceive as events.DesktopClipboardReceive)
                break
        
            case Event.EVENT_DESKTOP_CLIPBOARD_SEND_INDEX:
                this.desktopClipboardSend(event.DesktopClipboardSend as events.DesktopClipboardSend)
                break
        
            case Event.EVENT_DESKTOP_RECORDING_INDEX:
                this.desktopRecording(event.DesktopRecording as events.DesktopRecording)
                break
        
            case Event.EVENT_EXEC_INDEX:
                this.exec(event.Exec as events.Exec)
                break
        
            case Event.EVENT_GITHUB_CONNECTOR_CREATE_INDEX:
                this.githubConnectorCreate(event.GithubConnectorCreate as events.GithubConnectorCreate)
                break
        
            case Event.EVENT_GITHUB_CONNECTOR_DELETE_INDEX:
                this.githubConnectorDelete(event.GithubConnectorDelete as events.GithubConnectorDelete)
                break
        
            case Event.EVENT_KUBE_REQUEST_INDEX:
                this.kubeRequest(event.KubeRequest as events.KubeRequest)
                break
        
            case Event.EVENT_LOCK_CREATE_INDEX:
                this.lockCreate(event.LockCreate as events.LockCreate)
                break
        
            case Event.EVENT_LOCK_DELETE_INDEX:
                this.lockDelete(event.LockDelete as events.LockDelete)
                break
        
            case Event.EVENT_MFA_DEVICE_ADD_INDEX:
                this.mfaDeviceAdd(event.MFADeviceAdd as events.MFADeviceAdd)
                break
        
            case Event.EVENT_MFA_DEVICE_DELETE_INDEX:
                this.mfaDeviceDelete(event.MFADeviceDelete as events.MFADeviceDelete)
                break
        
            case Event.EVENT_MY_SQL_STATEMENT_BULK_EXECUTE_INDEX:
                this.mySqlStatementBulkExecute(event.MySQLStatementBulkExecute as events.MySQLStatementBulkExecute)
                break
        
            case Event.EVENT_MY_SQL_STATEMENT_CLOSE_INDEX:
                this.mySqlStatementClose(event.MySQLStatementClose as events.MySQLStatementClose)
                break
        
            case Event.EVENT_MY_SQL_STATEMENT_EXECUTE_INDEX:
                this.mySqlStatementExecute(event.MySQLStatementExecute as events.MySQLStatementExecute)
                break
        
            case Event.EVENT_MY_SQL_STATEMENT_FETCH_INDEX:
                this.mySqlStatementFetch(event.MySQLStatementFetch as events.MySQLStatementFetch)
                break
        
            case Event.EVENT_MY_SQL_STATEMENT_PREPARE_INDEX:
                this.mySqlStatementPrepare(event.MySQLStatementPrepare as events.MySQLStatementPrepare)
                break
        
            case Event.EVENT_MY_SQL_STATEMENT_RESET_INDEX:
                this.mySqlStatementReset(event.MySQLStatementReset as events.MySQLStatementReset)
                break
        
            case Event.EVENT_MY_SQL_STATEMENT_SEND_LONG_DATA_INDEX:
                this.mySqlStatementSendLongData(event.MySQLStatementSendLongData as events.MySQLStatementSendLongData)
                break
        
            case Event.EVENT_OIDC_CONNECTOR_CREATE_INDEX:
                this.oidcConnectorCreate(event.OIDCConnectorCreate as events.OIDCConnectorCreate)
                break
        
            case Event.EVENT_OIDC_CONNECTOR_DELETE_INDEX:
                this.oidcConnectorDelete(event.OIDCConnectorDelete as events.OIDCConnectorDelete)
                break
        
            case Event.EVENT_PORT_FORWARD_INDEX:
                this.portForward(event.PortForward as events.PortForward)
                break
        
            case Event.EVENT_POSTGRES_BIND_INDEX:
                this.postgresBind(event.PostgresBind as events.PostgresBind)
                break
        
            case Event.EVENT_POSTGRES_CLOSE_INDEX:
                this.postgresClose(event.PostgresClose as events.PostgresClose)
                break
        
            case Event.EVENT_POSTGRES_EXECUTE_INDEX:
                this.postgresExecute(event.PostgresExecute as events.PostgresExecute)
                break
        
            case Event.EVENT_POSTGRES_FUNCTION_CALL_INDEX:
                this.postgresFunctionCall(event.PostgresFunctionCall as events.PostgresFunctionCall)
                break
        
            case Event.EVENT_POSTGRES_PARSE_INDEX:
                this.postgresParse(event.PostgresParse as events.PostgresParse)
                break
        
            case Event.EVENT_RECOVERY_CODE_GENERATE_INDEX:
                this.recoveryCodeGenerate(event.RecoveryCodeGenerate as events.RecoveryCodeGenerate)
                break
        
            case Event.EVENT_RECOVERY_CODE_USED_INDEX:
                this.recoveryCodeUsed(event.RecoveryCodeUsed as events.RecoveryCodeUsed)
                break
        
            case Event.EVENT_RENEWABLE_CERTIFICATE_GENERATION_MISMATCH_INDEX:
                this.renewableCertificateGenerationMismatch(event.RenewableCertificateGenerationMismatch as events.RenewableCertificateGenerationMismatch)
                break
        
            case Event.EVENT_RESIZE_INDEX:
                this.resize(event.Resize as events.Resize)
                break
        
            case Event.EVENT_ROLE_CREATE_INDEX:
                this.roleCreate(event.RoleCreate as events.RoleCreate)
                break
        
            case Event.EVENT_ROLE_DELETE_INDEX:
                this.roleDelete(event.RoleDelete as events.RoleDelete)
                break
        
            case Event.EVENT_SAML_CONNECTOR_CREATE_INDEX:
                this.samlConnectorCreate(event.SAMLConnectorCreate as events.SAMLConnectorCreate)
                break
        
            case Event.EVENT_SAML_CONNECTOR_DELETE_INDEX:
                this.samlConnectorDelete(event.SAMLConnectorDelete as events.SAMLConnectorDelete)
                break
        
            case Event.EVENT_SCP_INDEX:
                this.scp(event.SCP as events.SCP)
                break
        
            case Event.EVENT_SESSION_COMMAND_INDEX:
                this.sessionCommand(event.SessionCommand as events.SessionCommand)
                break
        
            case Event.EVENT_SESSION_CONNECT_INDEX:
                this.sessionConnect(event.SessionConnect as events.SessionConnect)
                break
        
            case Event.EVENT_SESSION_DATA_INDEX:
                this.sessionData(event.SessionData as events.SessionData)
                break
        
            case Event.EVENT_SESSION_DISK_INDEX:
                this.sessionDisk(event.SessionDisk as events.SessionDisk)
                break
        
            case Event.EVENT_SESSION_END_INDEX:
                this.sessionEnd(event.SessionEnd as events.SessionEnd)
                break
        
            case Event.EVENT_SESSION_JOIN_INDEX:
                this.sessionJoin(event.SessionJoin as events.SessionJoin)
                break
        
            case Event.EVENT_SESSION_LEAVE_INDEX:
                this.sessionLeave(event.SessionLeave as events.SessionLeave)
                break
        
            case Event.EVENT_SESSION_NETWORK_INDEX:
                this.sessionNetwork(event.SessionNetwork as events.SessionNetwork)
                break
        
            case Event.EVENT_SESSION_PRINT_INDEX:
                this.sessionPrint(event.SessionPrint as events.SessionPrint)
                break
        
            case Event.EVENT_SESSION_REJECT_INDEX:
                this.sessionReject(event.SessionReject as events.SessionReject)
                break
        
            case Event.EVENT_SESSION_START_INDEX:
                this.sessionStart(event.SessionStart as events.SessionStart)
                break
        
            case Event.EVENT_SESSION_UPLOAD_INDEX:
                this.sessionUpload(event.SessionUpload as events.SessionUpload)
                break
        
            case Event.EVENT_SUBSYSTEM_INDEX:
                this.subsystem(event.Subsystem as events.Subsystem)
                break
        
            case Event.EVENT_TRUSTED_CLUSTER_CREATE_INDEX:
                this.trustedClusterCreate(event.TrustedClusterCreate as events.TrustedClusterCreate)
                break
        
            case Event.EVENT_TRUSTED_CLUSTER_DELETE_INDEX:
                this.trustedClusterDelete(event.TrustedClusterDelete as events.TrustedClusterDelete)
                break
        
            case Event.EVENT_TRUSTED_CLUSTER_TOKEN_CREATE_INDEX:
                this.trustedClusterTokenCreate(event.TrustedClusterTokenCreate as events.TrustedClusterTokenCreate)
                break
        
            case Event.EVENT_UNKNOWN_INDEX:
                this.unknown(event.Unknown as events.Unknown)
                break
        
            case Event.EVENT_USER_CREATE_INDEX:
                this.userCreate(event.UserCreate as events.UserCreate)
                break
        
            case Event.EVENT_USER_DELETE_INDEX:
                this.userDelete(event.UserDelete as events.UserDelete)
                break
        
            case Event.EVENT_USER_LOGIN_INDEX:
                this.userLogin(event.UserLogin as events.UserLogin)
                break
        
            case Event.EVENT_USER_PASSWORD_CHANGE_INDEX:
                this.userPasswordChange(event.UserPasswordChange as events.UserPasswordChange)
                break
        
            case Event.EVENT_USER_TOKEN_CREATE_INDEX:
                this.userTokenCreate(event.UserTokenCreate as events.UserTokenCreate)
                break
        
            case Event.EVENT_WINDOWS_DESKTOP_SESSION_END_INDEX:
                this.windowsDesktopSessionEnd(event.WindowsDesktopSessionEnd as events.WindowsDesktopSessionEnd)
                break
        
            case Event.EVENT_WINDOWS_DESKTOP_SESSION_START_INDEX:
                this.windowsDesktopSessionStart(event.WindowsDesktopSessionStart as events.WindowsDesktopSessionStart)
                break
        
            case Event.EVENT_X11_FORWARD_INDEX:
                this.x11Forward(event.X11Forward as events.X11Forward)
                break

        }
    }

    protected skip():void {
        this.response.Event = new events.OneOf()
    }

    protected fail(message:string):void {
        throw new Error(message)
    }

    getResponse():ArrayBuffer {
        return this.response.encode()
    }

    any(event: Event):void {
    }

    accessRequestCreate(event: events.AccessRequestCreate):void {
    }

    accessRequestDelete(event: events.AccessRequestDelete):void {
    }

    appCreate(event: events.AppCreate):void {
    }

    appDelete(event: events.AppDelete):void {
    }

    appSessionChunk(event: events.AppSessionChunk):void {
    }

    appSessionRequest(event: events.AppSessionRequest):void {
    }

    appSessionStart(event: events.AppSessionStart):void {
    }

    appUpdate(event: events.AppUpdate):void {
    }

    authAttempt(event: events.AuthAttempt):void {
    }

    billingCardCreate(event: events.BillingCardCreate):void {
    }

    billingCardDelete(event: events.BillingCardDelete):void {
    }

    billingInformationUpdate(event: events.BillingInformationUpdate):void {
    }

    certificateCreate(event: events.CertificateCreate):void {
    }

    clientDisconnect(event: events.ClientDisconnect):void {
    }

    databaseCreate(event: events.DatabaseCreate):void {
    }

    databaseDelete(event: events.DatabaseDelete):void {
    }

    databaseSessionEnd(event: events.DatabaseSessionEnd):void {
    }

    databaseSessionQuery(event: events.DatabaseSessionQuery):void {
    }

    databaseSessionStart(event: events.DatabaseSessionStart):void {
    }

    databaseUpdate(event: events.DatabaseUpdate):void {
    }

    desktopClipboardReceive(event: events.DesktopClipboardReceive):void {
    }

    desktopClipboardSend(event: events.DesktopClipboardSend):void {
    }

    desktopRecording(event: events.DesktopRecording):void {
    }

    exec(event: events.Exec):void {
    }

    githubConnectorCreate(event: events.GithubConnectorCreate):void {
    }

    githubConnectorDelete(event: events.GithubConnectorDelete):void {
    }

    kubeRequest(event: events.KubeRequest):void {
    }

    lockCreate(event: events.LockCreate):void {
    }

    lockDelete(event: events.LockDelete):void {
    }

    mfaDeviceAdd(event: events.MFADeviceAdd):void {
    }

    mfaDeviceDelete(event: events.MFADeviceDelete):void {
    }

    mySqlStatementBulkExecute(event: events.MySQLStatementBulkExecute):void {
    }

    mySqlStatementClose(event: events.MySQLStatementClose):void {
    }

    mySqlStatementExecute(event: events.MySQLStatementExecute):void {
    }

    mySqlStatementFetch(event: events.MySQLStatementFetch):void {
    }

    mySqlStatementPrepare(event: events.MySQLStatementPrepare):void {
    }

    mySqlStatementReset(event: events.MySQLStatementReset):void {
    }

    mySqlStatementSendLongData(event: events.MySQLStatementSendLongData):void {
    }

    oidcConnectorCreate(event: events.OIDCConnectorCreate):void {
    }

    oidcConnectorDelete(event: events.OIDCConnectorDelete):void {
    }

    portForward(event: events.PortForward):void {
    }

    postgresBind(event: events.PostgresBind):void {
    }

    postgresClose(event: events.PostgresClose):void {
    }

    postgresExecute(event: events.PostgresExecute):void {
    }

    postgresFunctionCall(event: events.PostgresFunctionCall):void {
    }

    postgresParse(event: events.PostgresParse):void {
    }

    recoveryCodeGenerate(event: events.RecoveryCodeGenerate):void {
    }

    recoveryCodeUsed(event: events.RecoveryCodeUsed):void {
    }

    renewableCertificateGenerationMismatch(event: events.RenewableCertificateGenerationMismatch):void {
    }

    resize(event: events.Resize):void {
    }

    roleCreate(event: events.RoleCreate):void {
    }

    roleDelete(event: events.RoleDelete):void {
    }

    samlConnectorCreate(event: events.SAMLConnectorCreate):void {
    }

    samlConnectorDelete(event: events.SAMLConnectorDelete):void {
    }

    scp(event: events.SCP):void {
    }

    sessionCommand(event: events.SessionCommand):void {
    }

    sessionConnect(event: events.SessionConnect):void {
    }

    sessionData(event: events.SessionData):void {
    }

    sessionDisk(event: events.SessionDisk):void {
    }

    sessionEnd(event: events.SessionEnd):void {
    }

    sessionJoin(event: events.SessionJoin):void {
    }

    sessionLeave(event: events.SessionLeave):void {
    }

    sessionNetwork(event: events.SessionNetwork):void {
    }

    sessionPrint(event: events.SessionPrint):void {
    }

    sessionReject(event: events.SessionReject):void {
    }

    sessionStart(event: events.SessionStart):void {
    }

    sessionUpload(event: events.SessionUpload):void {
    }

    subsystem(event: events.Subsystem):void {
    }

    trustedClusterCreate(event: events.TrustedClusterCreate):void {
    }

    trustedClusterDelete(event: events.TrustedClusterDelete):void {
    }

    trustedClusterTokenCreate(event: events.TrustedClusterTokenCreate):void {
    }

    unknown(event: events.Unknown):void {
    }

    userCreate(event: events.UserCreate):void {
    }

    userDelete(event: events.UserDelete):void {
    }

    userLogin(event: events.UserLogin):void {
    }

    userPasswordChange(event: events.UserPasswordChange):void {
    }

    userTokenCreate(event: events.UserTokenCreate):void {
    }

    windowsDesktopSessionEnd(event: events.WindowsDesktopSessionEnd):void {
    }

    windowsDesktopSessionStart(event: events.WindowsDesktopSessionStart):void {
    }

    x11Forward(event: events.X11Forward):void {
    }

}

export function handleEvent<T extends HandleEventBase>(requestData: ArrayBuffer): ArrayBuffer {
    let handler = instantiate<T>(requestData);    
    handler.run()
    return handler.getResponse()
}            
