import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoinPopupComponent } from './soin-popup.component';

describe('SoinPopupComponent', () => {
  let component: SoinPopupComponent;
  let fixture: ComponentFixture<SoinPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoinPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoinPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
