import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Forms } from '@shared/models/forms/forms';
import { Errors } from '@shared/models/types/errors';
import { User } from '@shared/models/users/user';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  myForm: FormGroup;
  @Output() close = new EventEmitter<boolean>();
  nuevoUsuario?: User;
  errMsj?: string;
  optionsForm: Forms[];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.nuevoUsuario = {
      name: '',
      password: '',
      nameUser: '',
      email: '',
    };
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
      },
      {
        nameString: 'name',
        validations: [Errors.MAX_LENGTH, Errors.MIN_LENGTH, Errors.REQUIRED],
        name: 'Nombre',
      },
      {
        nameString: 'email',
        validations: [
          Errors.MAX_LENGTH,
          Errors.MIN_LENGTH,
          Errors.REQUIRED,
          Errors.EMAIL,
        ],
        name: 'Correo Electronico',
      },
    ];
    this.myForm = this.fb.group({
      name: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.required,
        ],
      ],
      email: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.required,
          Validators.email,
        ],
      ],
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
    this.onRegister(event);
  }
  onRegister(form: FormGroup) {
    this.nuevoUsuario.nameUser = form.value.nameUser;
    this.nuevoUsuario.email = form.value.email;
    this.nuevoUsuario.password = form.value.password;
    console.log('holaa ue tal');
    this.authService.nuevo(this.nuevoUsuario).subscribe({
      next: (data) => {
        this.toastr.success('Nuevo usario creado ' + data.nameUser, '😀', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.close.emit(true);
        this.reset();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errMsj =
          err.error != null
            ? err.error.mensaje
            : 'Algo a ocurrido, vuelve a intentarlo';
        this.toastr.error(this.errMsj + ' 😒', 'Error en el registro', {
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
