import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoinCardComponent } from './soin-card.component';

describe('SoinCardComponent', () => {
  let component: SoinCardComponent;
  let fixture: ComponentFixture<SoinCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoinCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoinCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
