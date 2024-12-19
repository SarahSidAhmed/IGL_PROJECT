import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCardComponent } from './qr-card.component';

describe('QrCardComponent', () => {
  let component: QrCardComponent;
  let fixture: ComponentFixture<QrCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
