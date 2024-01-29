import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencesInputComponent } from './experiences-input.component';

describe('ExperiencesInputComponent', () => {
  let component: ExperiencesInputComponent;
  let fixture: ComponentFixture<ExperiencesInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperiencesInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperiencesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
