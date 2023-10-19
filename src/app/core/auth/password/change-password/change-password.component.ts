import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmailPasswordService } from '@core/services/email-password.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Forms } from '@shared/models/forms/forms';
import { ChangePasswordDto } from '@shared/models/auth/change-password';
import { Errors } from '@shared/models/types/errors';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  myForm: FormGroup;
  @Output() close = new EventEmitter<boolean>();
  tokenPassword: string = '';
  optionsForm: Forms[];

  dto: ChangePasswordDto = new ChangePasswordDto('', '', '');
  constructor(
    private emailPasswordService: EmailPasswordService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.optionsForm = [
      {
        nameString: 'password',
        validations: [Errors.MAX_LENGTH, Errors.MIN_LENGTH, Errors.REQUIRED],
        name: 'Contraseña',
      },
      {
        nameString: 'confirmPassword',
        validations: [
          Errors.MAX_LENGTH,
          Errors.MIN_LENGTH,
          Errors.REQUIRED,
          Errors.PATTERN,
        ],
        name: 'Confirmar contraseña',
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
      confirmPassword: [
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
    });
  }
  getResult(event: FormGroup): void {
    this.onChangePassword(event);
  }
  onChangePassword(form: FormGroup): void {
    if (form.value.password != form.value.confirmPassword) {
      this.toastrService.error('Las constraseñas no coinciden', 'Fail', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
      return;
    }
    this.tokenPassword = this.activatedRoute.snapshot.params['tokenPassword'];
    this.dto = new ChangePasswordDto(
      form.value.password,
      form.value.confirmPassword,
      this.tokenPassword
    );
    this.emailPasswordService.changePassword(this.dto).subscribe({
      next: (data) => {
        this.toastrService.success(data.mensaje, 'OK', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.close.emit(true);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.toastrService.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }
}
