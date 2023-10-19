import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Errors } from '../../models/types/errors';

@Component({
  selector: 'app-validations',
  templateUrl: './validations.component.html',
  styleUrls: ['./validations.component.scss']
})
export class ValidationsComponent {
  errorEnum: typeof Errors = Errors;
  @Input() field: string;
  @Input() caractersMin: number;
  @Input() caractersMax: number;
  @Input() myForm: FormGroup;
  @Input() errors: Errors[];
  @Input() msgPattern: string ;

  constructor(){
  }
  hasError(value:Errors):boolean{
    return this.errors.includes(value);
  }
}
