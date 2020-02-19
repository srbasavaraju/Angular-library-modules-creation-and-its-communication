import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SenderComponent } from '../communication/sender.component';
import { FormsModule } from '@angular/forms';
import { WindowsService } from '../services/window.service';


const routes: Routes = [
    {
        path: '', component: SenderComponent
    }
];

const routing: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
    exports: [RouterModule]
})
export class SenderRoutingModule {
    public static getRoutes() {
        return routing;
    }
}


@NgModule({
    declarations: [SenderComponent],
    imports: [
        CommonModule,
        FormsModule,
        SenderRoutingModule.getRoutes()
    ],
    providers: [WindowsService]
})
export class SenderModule { }


