import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**Prime-Ng components */
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { PanelModule } from 'primeng/panel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PickListModule } from 'primeng/picklist';
import { CheckboxModule } from 'primeng/checkbox';
import { DragDropModule } from 'primeng/dragdrop';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    SliderModule,
    PanelModule,
    InputSwitchModule,
    ToggleButtonModule,
    RadioButtonModule,
    DropdownModule,
    ButtonModule,
    MenuModule,
    DropdownModule,
    PickListModule,
    CheckboxModule,
    DragDropModule,
    DialogModule,
    ProgressSpinnerModule,
    TooltipModule,
    TabViewModule,
    TreeModule
  ],
  exports: [
    InputTextModule,
    SliderModule,
    PanelModule,
    ButtonModule,
    InputSwitchModule,
    ToggleButtonModule,
    RadioButtonModule,
    DropdownModule,
    ButtonModule,
    MenuModule,
    PickListModule,
    CheckboxModule,
    DragDropModule,
    DialogModule,
    ProgressSpinnerModule,
    TooltipModule,
    TabViewModule,
    TreeModule
  ]
})
export class PrimengModule { }
