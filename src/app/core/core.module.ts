import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalLoginComponent } from '@core/auth/modal-login/modal-login.component';
import { LoginComponent } from '@core/auth/login/login.component';
import { RegistroComponent } from '@core/auth/registro/registro.component';
import { MenuComponent } from '@core/layout/header/menu/menu.component';
import { SendEmailComponent } from '@core/auth/password/send-email/send-email.component';
import { ChangePasswordComponent } from '@core/auth/password/change-password/change-password.component';
import { FooterComponent } from '@core/layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { sessionInitializer } from '@core/initializer/session-initializer';
import { TokenService } from '@core/services/token.service';
import { AuthService } from '@core/services/auth.service';

@NgModule({
  declarations: [
    ModalLoginComponent,
    LoginComponent,
    RegistroComponent,
    MenuComponent,
    SendEmailComponent,
    ChangePasswordComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: sessionInitializer,
      deps: [TokenService, AuthService],
      multi: true,
    },
  ],
  exports: [MenuComponent],
})
export class CoreModule {}
