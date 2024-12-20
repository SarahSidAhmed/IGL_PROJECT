import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-staff-form',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class StaffFormComponent {
onLogout() {
throw new Error('Method not implemented.');
}
  staff = {
    staffName: '',
    gender: '',
    age: '',
    contactNumber: '',
    email: '',
  };

  onSubmit(form: any) {
    if (form.valid) {
      // Handle form submission, for example, send data to a server
      console.log('Form Submitted:', this.staff);
      // Reset form after submission
      form.reset();
    }
  }
}
