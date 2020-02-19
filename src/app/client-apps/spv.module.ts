import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpvLibModule, SpvLibRoutingModule} from 'spv-lib';

@NgModule({
    imports: [
        CommonModule,
        SpvLibModule,
        SpvLibRoutingModule.getRoutes()
    ]
})
export class SpvModule { }