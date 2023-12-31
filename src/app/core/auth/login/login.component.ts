import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TokenService } from '@core/services/token.service';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginUsuario } from '@shared/models/users/login-usuario';
import { Forms } from '@shared/models/forms/forms';
import { Errors } from '@shared/models/types/errors';
import { MasterTable } from '@shared/models/master-table';
import { TypeForms } from '@shared/models/types/type-forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  @Output() close = new EventEmitter<boolean>();
  loginUsuario?: LoginUsuario;
  errMsj?: string;
  optionsForm: Forms[];
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.optionsForm = [
      {
        nameString: 'nameUser',
        validations: [Errors.MAX_LENGTH, Errors.MIN_LENGTH, Errors.REQUIRED],
        name: 'Nombre Usuario',
      },
      {
        nameString: 'password',
        validations: [
          Errors.MAX_LENGTH,
          Errors.MIN_LENGTH,
          Errors.REQUIRED,
          Errors.PATTERN,
        ],
        name: 'Contraseña',
        type: TypeForms.PASSWORD
      },
    ];
    this.myForm = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!$_%*?&])([A-Za-zd$@$!$_%*?&]|[^ ,.#~()-]){8,}$'
          ),
        ],
      ],
      nameUser: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.required,
        ],
      ],
    });
  }

  getResult(event: FormGroup): void {
    this.onLogin(event);
  }

  getRolesToken(token: string): string[] {
    const payload = token!.split('.')[1];
    const payloadecode = atob(payload);
    const values = JSON.parse(payloadecode);
    return values.roles;
  }

  mapperRoles(roles: string[]): MasterTable[] {
    let rolesMasterTable: MasterTable[] = [];
    for (let role of roles) {
      rolesMasterTable.push({
        description: role,
        valid: true,
      });
    }
    return rolesMasterTable;
  }

  onLogin(form: FormGroup): void {
    this.loginUsuario = new LoginUsuario(
      form.value.nameUser,
      form.value.password
    );
    this.authService.login(this.loginUsuario).subscribe({
      next: (data: any) => {
        console.log("login")
        this.tokenService.setToken(data.token);
        this.tokenService.setRoles(
          this.mapperRoles(this.getRolesToken(data.token))
        );
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
        this.reset();
        this.router.navigate(['/private']);
      },
      error: (err) => {
        this.errMsj = err.error != null ? err.error.mensaje : 'No autorizado';
        this.toastr.error(this.errMsj + ' 😒', 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }
  reset() {
    this.myForm.reset();
  }
}
