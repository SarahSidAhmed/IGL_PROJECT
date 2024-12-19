import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ConsultationCardComponent } from '../consultation-card/consultation-card.component';
import { InfoCardComponent } from '../info-card/info-card.component';
import { TestCardComponent } from '../test-card/test-card.component';
import { DpiPatientComponent } from '../dpi-patient/dpi-patient.component';

@Component({
  selector: 'app-signin',
  imports: [RouterOutlet,DpiPatientComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  passwordVisible: boolean = false;

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }


}
