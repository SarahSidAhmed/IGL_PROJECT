import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { TestCardComponent } from '../test-card/test-card.component';
import { InfoCardComponent } from '../info-card/info-card.component';
import { ConsultationCardComponent } from '../consultation-card/consultation-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dpi-doctor',
    imports: [RouterOutlet,CommonModule,NavbarComponent,TestCardComponent,InfoCardComponent,ConsultationCardComponent],
  
  templateUrl: './dpi-doctor.component.html',
  styleUrl: './dpi-doctor.component.scss'
})
export class DpiDoctorComponent {
  showAddConsultation = false;

  consultations = [
    { id: 1, title: 'Consultation 1', details: 'Details about consultation 1' },
    { id: 2, title: 'Consultation 2', details: 'Details about consultation 2' },
    { id: 3, title: 'Consultation 3', details: 'Details about consultation 3' },
    
  ];
  

  toggleAddConsultationPopup() {
    this.showAddConsultation = !this.showAddConsultation;
  }

  addConsultation() {
    this.consultations.push({ id: 4, title: 'Consultation 4', details: 'Details about consultation 4' });
    this.showAddConsultation=false;
    
  }
}
