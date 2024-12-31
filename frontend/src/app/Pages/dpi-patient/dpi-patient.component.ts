import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TestCardComponent } from '../../components/test-card/test-card.component';
import { InfoCardComponent } from '../../components/info-card/info-card.component';
import { ConsultationCardComponent } from '../../components/consultation-card/consultation-card.component';

@Component({
  selector: 'app-dpi-patient',
  imports: [RouterOutlet,CommonModule,NavbarComponent,TestCardComponent,InfoCardComponent,ConsultationCardComponent],
  templateUrl: './dpi-patient.component.html',
  styleUrl: './dpi-patient.component.scss'
})
export class DpiPatientComponent {
  consultations = [
    { id: 1, title: 'Consultation 1', details: 'Details about consultation 1' },
    { id: 2, title: 'Consultation 2', details: 'Details about consultation 2' },
    { id: 3, title: 'Consultation 3', details: 'Details about consultation 3' },
  ];

}
