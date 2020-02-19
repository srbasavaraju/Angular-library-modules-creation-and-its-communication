import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadingRoutingModule, LazyLoadingLibModule } from 'lazy-loading-lib';
@NgModule({
    imports: [
        CommonModule,
        LazyLoadingLibModule,
        LazyLoadingRoutingModule.getRoutes()
    ]
})
export class LazyLoadingModule { }