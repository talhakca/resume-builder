import { Component, OnInit, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ResumeExperience } from '../utils/resume-experience.interface';

@Component({
  selector: 'app-experiences-input',
  templateUrl: './experiences-input.component.html',
  styleUrls: ['./experiences-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => ExperiencesInputComponent),
      multi: true
    }
  ]
})
export class ExperiencesInputComponent implements OnInit, ControlValueAccessor {
  experienceGroup = this.fb.group({
    title: ['', Validators.required],
    company: ['', Validators.required],
    location: ['', Validators.required],
    startDate: [new Date(), Validators.required],
    endDate: [new Date()],
    description: ['', Validators.required]
  });

  experiencesForm = this.fb.group({
    experiences: this.fb.array([])
  });

  _value: ResumeExperience[];


  get value() {
    return this._value;
  }

  set value(value: ResumeExperience[]) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: ResumeExperience[]) {
    this._value = value;
    if (value?.length) {
      value.forEach((item) => {
        this.onAddNewExperienceClicked();
      });
      this.experiencesForm.get('experiences').setValue(value);
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  get experiences(): FormArray {
    return this.experiencesForm.controls['experiences'] as FormArray;
  }


  onAddNewExperienceClicked() {
    const experienceControl = this.fb.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      location: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date()],
      description: ['', Validators.required]
    });
    this.experiences.push(experienceControl);
  }

  saveForm() {
    if (this.experiencesForm.valid) {
      this.value = this.experiencesForm.value.experiences;
    } else {
      Object.values(this.experiencesForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  getPanelName(control: AbstractControl) {
    const value = control.value;
    if (value.company || value.title) {
      return `${value.title} ${value.company}`;
    } else {
      return 'New Experience';
    }
  }

  remove(index: number) {
    this.experiences.removeAt(index);
  }

}
