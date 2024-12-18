import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpiCardComponent } from './dpi-card.component';

describe('DpiCardComponent', () => {
  let component: DpiCardComponent;
  let fixture: ComponentFixture<DpiCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DpiCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DpiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
