import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PrimengModule } from './primeng/primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, AsyncPipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from 'tour-of-heros';
import { FormsModule } from '@angular/forms';
import { WindowsService } from './services/window.service';
import { InputTextModule } from 'primeng/inputtext';
import { AuthorizationService } from './services/authorization.service';
import { HttpInterceptorService } from './intereceptors/http-interceptor.service';
import { AuthorizationGuard } from './guards/authorization-guard';
import { MplStateService } from 'mpl';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    InputTextModule,
    PrimengModule,
    ButtonModule
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
    //   dataEncapsulation: false
    // })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    WindowsService,
    AuthorizationGuard,
    AuthorizationService,
    MplStateService
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})

export class AppModule { }
