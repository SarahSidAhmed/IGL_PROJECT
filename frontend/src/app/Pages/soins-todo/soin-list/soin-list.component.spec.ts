import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoinListComponent } from './soin-list.component';

describe('SoinListComponent', () => {
  let component: SoinListComponent;
  let fixture: ComponentFixture<SoinListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoinListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
