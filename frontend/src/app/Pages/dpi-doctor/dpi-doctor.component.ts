import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TestCardComponent } from '../../components/test-card/test-card.component';
import { InfoCardComponent } from '../../components/info-card/info-card.component';
import { ConsultationCardComponent } from '../../components/consultation-card/consultation-card.component';
import { CommonModule } from '@angular/common';
import { PatientInfoService } from '../../services/patient-info.service';
import { ConsultationListService } from '../../services/consultation-list.service';
import { Router } from '@angular/router';
import { CreateConsultationService } from '../../services/create-consultation.service';

@Component({
  selector: 'app-dpi-doctor',
    imports: [RouterOutlet,CommonModule,NavbarComponent,TestCardComponent,InfoCardComponent,ConsultationCardComponent],
  
  templateUrl: './dpi-doctor.component.html',
  styleUrl: './dpi-doctor.component.scss'
})
export class DpiDoctorComponent implements OnInit {
  dpi: any = null;
  consultations: any[] = [];
  id: any;
  
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientInfoService,
    private consultationService: ConsultationListService,
    private consultation: CreateConsultationService,

    private router: Router
  ) {}
  
  toggleAddConsultation(): void {
    const dpiId = this.route.snapshot.paramMap.get('id');
    const dataconsultation = {
      "prescription": {
        "consultation": 0
      },
      "doctor": {
        "name": "string"
      },
      "consultation_summary": "string",
      "dpi": 0
    }
  
    this.consultation.createConsultation(dataconsultation).subscribe({
      next: (response) => {
        const id = response.id; // Assuming the response contains the consultation ID
        this.router.navigate(['dpi-doctor/:id', id]);
      },
      error: (error) => {
        console.error('Error creating consultation:', error);
      },
    });
  }
  ngOnInit(): void {
    const dpiId = this.route.snapshot.paramMap.get('id');
    if (dpiId) {
      this.patientService.getDpiById(dpiId).subscribe({
        next: (data) => {
          this.dpi = data;
          this.id=data.id;

        },
        error: (error) => {
          console.error('Error fetching dpi:', error);
          console.log(this.id);
        }
      });

      this.consultationService.getConsultations(dpiId).subscribe({
        next: (data2) => {
          this.consultations = data2;
        },
        error: (error) => {
          console.error('Error fetching consultations:', error);
        }
      });
    }
  }

  
}