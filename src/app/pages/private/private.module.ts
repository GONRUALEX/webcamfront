import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaintenanceUserComponent } from '@pages/private/maintenance-user/maintenance-user.component';
import { PrivateRoutingModule } from '@pages/private/private-routing.module';
import { PrimengModule } from '@shared/primeng.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [MaintenanceUserComponent],
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
    PrivateRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    SharedModule
  ],
})
export class PrivateModule {}
