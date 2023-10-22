import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { interceptorProvider } from '@core/interceptors/prod.interceptor';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { PrimengModule } from '@shared/primeng.module';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
registerLocaleData(localeEs, 'es');
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
    CoreModule,
    PrimengModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.cubeGrid,
      backdropBackgroundColour: "rgb(0, 128, 128,0.2)",
      backdropBorderRadius: "200px",
      primaryColour: "#008080",
      secondaryColour: "#ffffff",
      tertiaryColour: "#ffffff",
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    interceptorProvider,
    {
      provide: LOCALE_ID, useValue: 'es'
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
