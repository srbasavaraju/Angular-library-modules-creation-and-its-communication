import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { TokenManagementService } from '../services/token-management.service';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';
import { map } from 'rxjs/operators';
import { Token } from '../models/token';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private readonly _tokenManagementService: TokenManagementService,
        private readonly _authorizationService: AuthorizationService,
    ) { }


    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this._authorizationService.getAccessTokenDetails().pipe(
            map((token: boolean) => {
                if (token) {
                    this._authorizationService.renewToken();
                    return true;
                } else {
                    return false;
                }
            })
        );
    }
}
