import { AuthConfig } from 'angular-oauth2-oidc';
const baseUrl = 'http://localhost:4200';

export const authCodeFlowConfig: AuthConfig = {
    // // Url of the Identity Provider
    // issuer: 'https://keycloak.me-tw.com/auth/realms/letter',
    // postLogoutRedirectUri: window.location.origin + '/home',
    // // URL of the SPA to redirect the user to after login
    // redirectUri: window.location.origin + '/',

    // // The SPA's id. The SPA is registerd with this id at the auth-server
    // // clientId: 'server.code',
    // clientId: 'angular-app1',

    // // Just needed if your auth server demands a secret. In general, this
    // // is a sign that the auth server is not configured with SPAs in mind
    // // and it might not enforce further best practices vital for security
    // // such applications.
    // // dummyClientSecret: 'secret',

    // responseType: 'code',

    // // set the scope for the permissions the client should request
    // // The first four are defined by OIDC.
    // // Important: Request offline_access to get a refresh token
    // // The api scope is a usecase specific one
    // scope: 'openid profile email offline_access',

    // showDebugInformation: true,

    issuer: 'https://localhost:44347',
    redirectUri: baseUrl,
    clientId: 'ContentCreator_App',
    dummyClientSecret: '1q2w3e*',
    responseType: 'code',
    scope: 'offline_access openid profile role email phone ContentCreator',
    requireHttps: false,
    showDebugInformation: true,

    // issuer: 'https://localhost:44325',
    // postLogoutRedirectUri: window.location.origin + '/home',
    // redirectUri: baseUrl,
    // silentRefreshRedirectUri: window.location.origin + '/home',
    // requestAccessToken: true,
    // clientId: 'client_id_angular',

    // // dummyClientSecret: '1q2w3e*',
    // responseType: 'code',
    // scope: 'offline_access openid my.scope ApiOne profile',
    // // requireHttps: true,
    // showDebugInformation: true,
  };
