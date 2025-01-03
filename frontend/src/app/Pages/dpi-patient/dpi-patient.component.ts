import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TestCardComponent } from '../../components/test-card/test-card.component';
import { InfoCardComponent } from '../../components/info-card/info-card.component';
import { ConsultationCardComponent } from '../../components/consultation-card/consultation-card.component';
import { DpiListService } from '../../services/dpi-list.service';
import { PatientInfoService } from '../../services/patient-info.service';
import { ConsultationListService } from '../../services/consultation-list.service';

@Component({
  selector: 'app-dpi-patient',
  imports: [RouterOutlet,CommonModule,NavbarComponent,TestCardComponent,InfoCardComponent,ConsultationCardComponent],
  templateUrl: './dpi-patient.component.html',
  styleUrl: './dpi-patient.component.scss'
})
export class DpiComponent implements OnInit {
  dpi: any = null;
  consultations: any[] = [];
  id: any;


  constructor(
    private route: ActivatedRoute,
    private patientService: PatientInfoService,
    private consultationService: ConsultationListService
  ) {}

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