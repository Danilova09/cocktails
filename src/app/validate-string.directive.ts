import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive } from '@angular/core';

export const stringValidator = (control: AbstractControl): ValidationErrors | null => {
  const hasNumber = /^[0-9]*$/.test(control.value);
  if (!hasNumber) {
    return null;
  }
  return {string: true};
};

@Directive({
  selector: '[appString]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidateStringDirective,
    multi: true
  }]
})
export class ValidateStringDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return stringValidator(control);
  }
}
