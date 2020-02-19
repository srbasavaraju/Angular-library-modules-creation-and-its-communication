import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TokenManagementService } from './token-management.service';
import { AppshellStateService } from './appshell-state.service';
import { Token } from '../models/token';
import { mergeMap } from 'rxjs/operators';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements OnDestroy {

  private accessTokenExpirationOffsetInMinutes = 10;
  refreshTokenTimer: any;
  code = 'code';
  constructor(private httpClient: HttpClient,
    private tokenManagementService: TokenManagementService,
    private appShellStateService: AppshellStateService,
    private notifyService: NotifyService) { }


  ngOnDestroy(): void {
    if (this.refreshTokenTimer) {
      clearInterval(this.refreshTokenTimer);
    }
  }


  getAccessTokenDetails(): Observable<boolean> {
    return this.getAccessToken().pipe(
      mergeMap(() => this.getIntrospectToken())
    )
  }

  getAccessToken(): Observable<boolean> {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get(this.code);
    const url = `https://localhost:44348/api/AccessToken/getAccessToken?authorizationCode=${code}`;

    return this.httpClient.get(url).pipe(
      map((token: Token) => {
        this.tokenManagementService.setToken(token);
        return true;
      }), catchError(_error => {
        return throwError('Something went wrong!');
      })
    )
  }

  getIntrospectToken() {
    const accessToken = localStorage.getItem('access_token').replace(/['"]+/g, '');
    const url = `https://localhost:44348/api/AccessToken/getIntrospectToken?accessToken=${accessToken}`;

    return this.httpClient.get<any>(url).pipe(
      map((introspectToken: any) => {
        this.appShellStateService.userName = introspectToken.userName;
        this.notifyService.onUserNameChanged(introspectToken.userName);
        return true;
      },
        (_error: HttpErrorResponse) => {
          return false;
        })
    );
  }

  renewToken() {
    this.refreshTokenTimer = setTimeout(() => {
      this.renew();
    }, ((this.appShellStateService.expiresIn / 60) - this.accessTokenExpirationOffsetInMinutes));
  }

  private renew() {
    const refreshToken = this.appShellStateService.refreshToken;
    const url = `https://localhost:44348/api/AccessToken/getAccessToken?authorizationCode=${refreshToken}`;
    return this.httpClient.get(url).pipe(map((token: Token) => {
      this.tokenManagementService.setToken(token);
    }), catchError(_error => {
      return throwError('Something went wrong!');
    }));
  }
}
