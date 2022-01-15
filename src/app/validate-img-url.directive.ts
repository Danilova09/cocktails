import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive } from '@angular/core';

export const imgUrlValidator = (control: AbstractControl): ValidationErrors | null => {
  const hasImgUrl = /(https?:\/\/.*\.(?:png|jpg))/.test(control.value);
  if (hasImgUrl) {
    return null;
  }
  return {imgUrl: true};
};

@Directive({
  selector: '[appPassword]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidateImgUrlDirective,
    multi: true
  }]
})
export class  ValidateImgUrlDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return imgUrlValidator(control);
  }
}
