
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ConsultationListService } from '../../services/consultation-list.service';
import { UpdatesummaryService } from '../../services/updatesummary.service';
import { AddMedicamentService } from '../../services/add-medicament.service';
import { AddTestsService } from '../../services/add-tests.service';
import { DeletemedecineService } from '../../services/deletemedecine.service';
@Component({
  selector: 'app-consultation-detail',
  imports: [RouterOutlet,CommonModule,NavbarComponent],
  templateUrl: './consultation-detail.component.html',
  styleUrl: './consultation-detail.component.scss'
})
export class ConsultationDetailComponent {
  tests = [{ name: 'Test 1', type: 'bilan' }, { name: 'Test 2', type: 'bilan' }, { name: 'Test 3', type: 'radio' }];


  soins = [
    'Dose antivirus',
    'Dose insuline',
    'paracetamol 1g'
  ];
  consultations: any[] = [];
  consult: any;
  resume = '';

  listItemsord: { nom: string; dosage: string; duree: string; frequence: string }[] = [{ nom: 'Paracetamol', dosage: '2 cachets', duree: '5 jours', frequence: '2 fois ' },{ nom: 'AntiVirus', dosage: '1 cachet', duree: '4 jours', frequence: '1 '  }];
  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private consultationService: ConsultationListService,
        private updateSummary: UpdatesummaryService,
        private addmedicament: AddMedicamentService,
        private addsoin: AddTestsService,
        private deletemedecine: DeletemedecineService
      ) {}

      toggleModal(exam: any): void {
        exam.showModal = !exam.showModal;
      }
      goBack() {
        this.router.navigate(['dpi-patient/',this.consult.dpi]);
      }
  ngOnInit() {
    const dpiId = this.route.snapshot.paramMap.get('dpiid');
    const consultationId = this.route.snapshot.paramMap.get('id');
    console.log('Consultation:', dpiId, consultationId);
    if (dpiId) {
      

      this.consultationService.getConsultations(dpiId).subscribe({
        next: (data2) => {
          this.consultations = data2;
          console.log('Consultations:', this.consultations);
          this.consult = this.consultations.find(c => c.id == consultationId);
          console.log('Consultation:', this.consult);
          this.resume= this.consult.consultation_summary;


        },
        error: (error) => {
          console.error('Error fetching consultations:', error);
        }
      });
    }

  
}

}