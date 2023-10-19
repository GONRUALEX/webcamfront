import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.cubeGrid,
      backdropBackgroundColour: 'rgb(0, 128, 128,0.2)',
      backdropBorderRadius: '200px',
      primaryColour: '#008080',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
    }),
    PublicRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PublicModule {}
