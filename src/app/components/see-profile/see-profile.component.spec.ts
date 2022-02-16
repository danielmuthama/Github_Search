import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeProfileComponent } from './see-profile.component';

describe('SeeProfileComponent', () => {
  let component: SeeProfileComponent;
  let fixture: ComponentFixture<SeeProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
