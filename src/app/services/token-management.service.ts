import { Injectable } from '@angular/core';
import { LocalStorageService } from 'storage-wrapper';
import { MplStateService } from 'mpl';
import { AuthorizationService } from './authorization.service';
import { AppshellStateService } from './appshell-state.service';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class TokenManagementService {

  constructor(private readonly _localStorageService: LocalStorageService,
    private readonly _mplStateService: MplStateService,
    private _appshellStateService: AppshellStateService) { }

  setToken(token: Token) {
    this.setTokenToLocalStorage(token);
    this.setTokenToApplicationState(token);
  }

  private setTokenToLocalStorage(token: Token) {
    this._localStorageService.set('access_token', token.access_token);
    this._localStorageService.set('refresh_token', token.refresh_token);
    this._localStorageService.set('expires_in', token.expires_in);
    this._localStorageService.set('token_storage_time', new Date().getTime());
  }

  private setTokenToApplicationState(token: Token) {
    this._appshellStateService.refreshToken = token.refresh_token;
    this._appshellStateService.expiresIn = token.expires_in;
    this._mplStateService.setAccessToken(token.access_token);
  }
}
