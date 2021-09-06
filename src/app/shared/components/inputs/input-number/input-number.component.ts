import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ValidateInputService } from '../validate-input.service';

@Component({
  selector: 'dio-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css']
})
export class InputNumberComponent {

  @Input() title: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() minimum = -100;
  @Input() maximum = 100;
  @Input() step = 1;

  constructor(public validation: ValidateInputService) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
