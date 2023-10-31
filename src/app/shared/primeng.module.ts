import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    DropdownModule
  ],
  exports:[
    TableModule,
    CardModule,
    DropdownModule,
    MultiSelectModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule
  ]
})
export class PrimengModule { }
