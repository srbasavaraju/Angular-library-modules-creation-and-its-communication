import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MplRoutingModule, MplModule } from 'mpl';

@NgModule({

  imports: [
    CommonModule,
    MplModule,
    MplRoutingModule.getRoutes()
  ]
})
export class MplWrapperModule { }