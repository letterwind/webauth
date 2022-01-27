// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { UserManagerSettings, WebStorageStateStore } from 'oidc-client';


const userManagerSettings: UserManagerSettings = {
  authority: 'https://keycloak.me-tw.com/auth/realms/letter',
  client_id: 'angular-app1',
  redirect_uri: window.location.origin + '/',
  response_type: 'code',
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  loadUserInfo: true,
  post_logout_redirect_uri: window.location.origin + '/',
}


export const environment = {
  production: false,
  userManagerSettings,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
