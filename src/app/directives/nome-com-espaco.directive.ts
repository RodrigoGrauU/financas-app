import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';


@Directive({
  selector: '[appNomeComEspaco]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: NomeComEspacoDirective,
    multi: true
  }]
})
export class NomeComEspacoDirective implements Validator {

  constructor() { }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return control.value ? this.validaNomeComEspaco(new RegExp(/\s/)) (control)
    : null;
  }

  validaNomeComEspaco(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? { nomeComEspacoEmBranco: { value: control.value } } : null;
    };
  }
}
