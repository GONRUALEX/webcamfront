import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenService } from '@core/services/token.service';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Forms } from '@shared/models/forms/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent {
  @Input() optionsForm: Forms[];
  @Input() myForm: FormGroup;
  @Output() result = new EventEmitter<FormGroup>();

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}
  onLogin(form: FormGroup): void {
    console.log('forms del form', form);
    if (form.valid) this.result.emit(form);
    /*if (!form.valid){
      this.toastr.error("Los campos introducidos no han pasado las validaciones" + ' 😒', 'Fail', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
      return;
    }
    this.loginUsuario = new LoginUsuario(this.nombreUsuario!, this.password!);
    this.authService.login(this.loginUsuario).subscribe({
      next: (data: any) => {
        this.tokenService.setToken(data.token);
        this.close.emit(true);
        setTimeout(
          () =>
            this.toastr.success(
              'Bienvenido 😀 ' + this.tokenService.getUserName(),
              '',
              {
                timeOut: 3000,
                positionClass: 'toast-top-center',
              }
            ),
          500
        );
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errMsj = err.error != null ? err.error.mensaje : 'No autorizado';
        this.toastr.error(this.errMsj + ' 😒', 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });*/
  }

  isFieldValid(field: string) {
    return !this.myForm.get(field).valid && this.myForm.get(field).touched;
  }

  reset() {
    this.myForm.reset();
  }
}
