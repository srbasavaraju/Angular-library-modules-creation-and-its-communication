import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReceiverComponent } from '../communication/receiver.component';
import { FormsModule } from '@angular/forms';
import { WindowsService } from '../services/window.service';
import { ButtonModule } from 'primeng/button';

const routes: Routes = [
    {
        path: '',
        component: ReceiverComponent
    },
    {
        path: ':id/:name',
        component: ReceiverComponent
    }
];

const routing: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
    exports: [RouterModule]
})
export class ReceiverRoutingModule {
    public static getRoutes() {
        return routing;
    }
}


@NgModule({
    declarations: [ReceiverComponent],
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        ReceiverRoutingModule.getRoutes()
    ],
    providers: [WindowsService]
})
export class ReceiverModule { }


