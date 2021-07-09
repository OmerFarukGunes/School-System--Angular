import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyDetailComponent } from './family-detail.component';

describe('FamilyDetailComponent', () => {
  let component: FamilyDetailComponent;
  let fixture: ComponentFixture<FamilyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
