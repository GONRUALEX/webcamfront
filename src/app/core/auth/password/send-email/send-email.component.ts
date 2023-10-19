import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmailPasswordService } from 'src/app/core/services/email-password.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValuesDto } from 'src/app/shared/models/auth/email-values-dto';
import { Forms } from 'src/app/shared/models/forms/forms';
import { Errors } from 'src/app/shared/models/types/errors';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
})
export class SendEmailComponent implements OnInit {
  myForm: FormGroup;
  @Output() close = new EventEmitter<boolean>();
  dto: EmailValuesDto = new EmailValuesDto('');
  optionsForm: Forms[];
  constructor(
    private fb: FormBuilder,
    private emailPasswordService: EmailPasswordService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.optionsForm = [
      {
        nameString: 'mailTo',
        validations: [
          Errors.MAX_LENGTH,
          Errors.MIN_LENGTH,
          Errors.REQUIRED,
          Errors.EMAIL,
        ],
        name: 'Introduce tu email, en el caso que te tengamos registrado en nuestra base de datos te enviaremos un email de recuperación.',
      },
    ];
    this.myForm = this.fb.group({
      mailTo: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.email,
        ],
      ],
    });
  }

  getResult(event: FormGroup): void {
    this.onSendEmail(event);
  }

  onSendEmail(form: FormGroup) {
    this.dto = new EmailValuesDto(form.value.emailTo);

    this.emailPasswordService.sendEmail(this.dto).subscribe({
      next: (data) => {
        this.reset();
        this.toastr.success(data.mensaje, 'OK', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
      error: (err) => {
        this.toastr.error(err.error.mensaje, 'Fail', {
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
