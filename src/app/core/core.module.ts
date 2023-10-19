import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalLoginComponent } from './auth/modal-login/modal-login.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { MenuComponent } from './layout/header/menu/menu.component';
import { SendEmailComponent } from './auth/password/send-email/send-email.component';
import { ChangePasswordComponent } from './auth/password/change-password/change-password.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { sessionInitializer } from './initializer/session-initializer';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';

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
  providers:[
    {
      provide: APP_INITIALIZER,
      useFactory: sessionInitializer,
      deps: [TokenService,  AuthService],
      multi: true,
    },
  ],
  exports: [MenuComponent],
})
export class CoreModule {}
