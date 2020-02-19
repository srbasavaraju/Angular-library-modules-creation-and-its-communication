import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourOfHerosModule, TourOfHerosRoutingModule } from 'tour-of-heros';
import { environment } from 'src/environments/environment';

@NgModule({
    imports: [
        CommonModule,
        TourOfHerosModule.getSettings(environment.settings),
        TourOfHerosRoutingModule.getRoutes()
    ]
})
export class TohModule { }