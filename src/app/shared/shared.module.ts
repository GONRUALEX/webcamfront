import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsComponent } from './components/forms/forms.component';
import { ValidationsComponent } from './components/validations/validations.component';
import { PrimengModule } from './primeng.module';

@NgModule({
  declarations: [ValidationsComponent, FormsComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, PrimengModule],
  exports: [FormsComponent],
})
export class SharedModule {}
