import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ResumeEducation } from '../utils/resume-education.interface';

@Component({
  selector: 'app-education-input',
  templateUrl: './education-input.component.html',
  styleUrls: ['./education-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => EducationInputComponent),
      multi: true
    }
  ]
})
export class EducationInputComponent implements ControlValueAccessor {

  educationForm = this.formBuilder.group({
    degree: ['', [Validators.required]],
    school: ['', [Validators.required]],
    location: ['', [Validators.required]],
    startDate: [new Date(), [Validators.required]],
    endDate: [new Date(), [Validators.required]]
  });

  _value: ResumeEducation;


  get value() {
    return this._value;
  }

  set value(value: ResumeEducation) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: ResumeEducation) {
    this._value = value;
    this.educationForm.setValue(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }


  constructor(
    private formBuilder: FormBuilder
  ) { }

  emitValue() {
    this.value = this.educationForm.value;
  }

}
