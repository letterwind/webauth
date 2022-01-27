import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        // config: {
        //       authority: 'https://keycloak.me-tw.com/auth/realms/letter',
        //       redirectUrl: window.location.origin,
        //       postLogoutRedirectUri: window.location.origin,
        //       clientId: 'angular-app1',
        //     //   scope: 'roles profile email web-origins offline_access', // 'openid profile offline_access ' + your scopes
        //       responseType: 'code',
        //       logLevel: LogLevel.Debug,
        //       silentRenew: true,
        //       useRefreshToken: true,
        //       renewTimeBeforeTokenExpiresInSeconds: 30,
        //   }
      //   config: {
      //     // storage: localStorage,
      //     authority: 'https://localhost:44325',
      //     redirectUrl: window.location.origin,
      //     postLogoutRedirectUri: window.location.origin,
      //     clientId: 'client_id_angular',
      //     scope: 'offline_access openid my.scope ApiOne profile', // 'openid profile offline_access ' + your scopes
      //     responseType: 'code',
      //     logLevel: LogLevel.Debug,
      //     // silentRenew: true,
      //     // useRefreshToken: true,
      //     // renewTimeBeforeTokenExpiresInSeconds: 30,
      // }
      config: {
        // storage: localStorage,
        authority: 'https://localhost:44347',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'ContentCreator_App',
        scope: 'offline_access openid profile role email phone ContentCreator', // 'openid profile offline_access ' + your scopes
        responseType: 'code',
        logLevel: LogLevel.Debug,
        // silentRenew: true,
        // useRefreshToken: true,
        // renewTimeBeforeTokenExpiresInSeconds: 30,
    }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
