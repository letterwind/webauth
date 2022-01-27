import { HttpClient, HttpHeaders, HttpUserEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client';
import { OAuthService, OAuthStorage } from "angular-oauth2-oidc";
import { filter, Observable } from 'rxjs';
import { authCodeFlowConfig } from './auth/auth-config';
import { UserManager, User } from 'oidc-client';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userData$?: Observable<UserDataResult>;
  userManager: UserManager = new UserManager(environment.userManagerSettings);
  claims?: Object;
  JwtObj?: Object;
  user?: User | null;
  constructor(
    // private oidcSecurityService: OidcSecurityService,
     private oauthService: OAuthService
    , private httpClient: HttpClient ) {

  }

  get userName(): string | null {
    const claims = this.oauthService.getIdentityClaims();
    console.log(claims);
    if (!claims) return null;
    return claims.name;
    // return this.oidcSecurityService.getUserData().name;
  }

  get idToken(): string {
    return this.oauthService.getIdToken();
    // return this.oidcSecurityService.getIdToken();
  }

  get accessToken(): string {
    return this.oauthService.getAccessToken();
    // return this.oidcSecurityService.getAccessToken();
  }

  refresh() {
    // this.oauthService.refreshToken();
  }

  ngOnInit(): void {
    // this.userData$ = this.oidcSecurityService.userData$;

    // Automatically load user profile
    this.oauthService.events
    .pipe(filter((e) => e.type === 'token_received'))
    .subscribe((e) => {
      console.log(e.type);
      this.oauthService.loadUserProfile().then(user=>{
        console.log(user);
      });
    });

    // // //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // // //Add 'implements OnInit' to the class.
    // this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken, idToken }) => {
    //   console.log(isAuthenticated, userData, accessToken, idToken);
    //   this.user = userData;
    // });
    // this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData}) => );
    // this.JwtObj = this.getJwtAsObject();
    // if(this.oauthService.getAccessToken()) {
    //   this.oauthService.loadUserProfile().then((up) => {
    //     this.claims = up;
    //   });
    this.oauthService.setStorage(localStorage);
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then((isSuccess) => {
      console.log(isSuccess);
    });

    //   if(this.oauthService.getIdentityClaims()) {
    //     // Extract identity claims from the OpenID Connect ID Token
    //     this.claims = this.oauthService.getIdentityClaims();
    //     // Extract the OpenID Client ID from the access token

    //     // Extract the JWT issuer from the access token
    //     // this.issuer = this.authService.getIssuer();
    //   }
    // }

    // this.userManager.signinRedirectCallback().then(user =>{
    //   this.userManager.storeUser(user);
    //   this.user = user;
    // }, error => {
    //   console.error(error);
    // });

    // this.userManager.getUser().then(user => {
    //   this.user = user;
    // }, error => {
    //   console.error(error)
    // })

  }

  /**
   * Helper method to extract the claims from the body component of the signed access token
   */
//    private getJwtAsObject(): object {
//     const accessToken: string = this.oauthService.getAccessToken();
//     const tokens: string[] = accessToken.split('.');
//     return JSON.parse(atob(tokens[1]));
// }

  login() {
    // this.oidcSecurityService.authorize();
    // console.log(this.oauthService.getAccessToken());


    // this.oauthService.loadDiscoveryDocument().then((isSuccess) => {
    //   console.log(isSuccess);
    //   // this.oauthService.initLoginFlow();
    // });
    this.oauthService.initCodeFlow();
    this.oauthService.oidc = true;



    // this.userManager.signinRedirect();
  }

  logout() {
    // this.oidcSecurityService.logoff();
    this.oauthService.logOut();
    // this.userManager.signoutRedirect();
  }

  callApi() {
    // const token = this.oidcSecurityService.getAccessToken();
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     Authorization: 'Bearer ' + token
    //   }),
    // };

    // this.httpClient.get("https://localhost:44351/secret", httpOptions).subscribe(res => {
    //   console.log(res);
    // });

    const token = this.oauthService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      }),
    };
    this.httpClient.get("https://localhost:44351/secret", httpOptions).subscribe(res => {
      console.log(res);
    });
  }
}
