import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDpiComponent } from './edit-dpi.component';

describe('EditDpiComponent', () => {
  let component: EditDpiComponent;
  let fixture: ComponentFixture<EditDpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
