import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { LoginComponent } from '../login/login.component';


const routes: Routes = [
    {
        path: '', component: LoginComponent
    }
];

const routing: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
    declarations: [LoginComponent],
    exports: [RouterModule]
})
export class LoginRoutingModule {
    public static getRoutes() {
        return routing;
    }
}


@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule.getRoutes()
    ]
})
export class LoginModule { }
