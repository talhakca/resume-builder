import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTreeItemSettingsComponent } from './content-tree-item-settings.component';

describe('ContentTreeItemSettingsComponent', () => {
  let component: ContentTreeItemSettingsComponent;
  let fixture: ComponentFixture<ContentTreeItemSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentTreeItemSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTreeItemSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
