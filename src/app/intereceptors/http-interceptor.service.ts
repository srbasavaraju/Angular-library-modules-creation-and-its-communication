import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from 'storage-wrapper';
import { AuthorizationService } from '../services/authorization.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private _localStorageService: LocalStorageService, private _authorizationService: AuthorizationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        req = this.setHeaders(req);
        this.checkAccessTokenExpire();
        return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {

            }
        }));
    }

    private checkAccessTokenExpire() {
        const tokenStorageTime = this._localStorageService.get('token_storage_time');
        const expiresIn = this._localStorageService.get('expires_in');
        if (new Date((new Date().getTime() - tokenStorageTime)).getMinutes() > (expiresIn * 0.75 / 60)) {
            this._authorizationService.renewToken();
        }
    }

    private setHeaders(req: HttpRequest<any>) {
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }
        return req;
    }
}
