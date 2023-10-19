import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
  ],
  exports:[
    TableModule
  ]
})
export class PrimengModule { }
