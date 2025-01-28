
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ConsultationListService } from '../../services/consultation-list.service';
import { UpdatesummaryService } from '../../services/updatesummary.service';
import { AddMedicamentService } from '../../services/add-medicament.service';
import { AddTestsService } from '../../services/add-tests.service';
import { DeletemedecineService } from '../../services/deletemedecine.service';

interface newMedicament {
  nom: string;
  dosage: string;
  duree: string;
  frequence: string;
}

interface Consultation{
  id: number;
  prescription: number;
  doctor: number;
  medicines?: {
    name: string;
    dosage: string;
    duration: string;
    frequency: string;
  }[];
}

@Component({
  selector: 'app-consultation-detail-doctor',
  imports: [RouterOutlet,NavbarComponent,CommonModule,FormsModule],
  templateUrl: './consultation-detail-doctor.component.html',
  styleUrl: './consultation-detail-doctor.component.scss'
})

export class ConsultationDetailDoctorComponent {
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private consultationService: ConsultationListService,
      private updateSummary: UpdatesummaryService,
      private addmedicament: AddMedicamentService,
      private addsoin: AddTestsService,
      private deletemedecine: DeletemedecineService
    ) {}
    
  consultations: any[] = [];
  consult: any;
  bilanParameters = ['Glucose', 'Créatinine', 'Sodium', 'CRP', 'Cholestérol', 'Potassium'];
  consultation = { id: 1, prescription: 1, doctor: 1 ,dpi: 1};
  prescriptionId = 1; 
  consultationId = 1;
  dpi_id = 3;
  isEditing = false;
  resume = '';

  tests: any[] = [];
  soins = ['Soin 1', 'Soin 2', 'Soin 3'];
  medicaments = [ { nom: 'Medicament 1', dosage: '10mg', duree: '1 semaine', frequence: '3 fois par jour' }, { nom: 'Medicament 2', dosage: '20mg', duree: '2 semaines', frequence: '2 fois par jour' }, { nom: 'Medicament 3', dosage: '30mg', duree: '3 semaines', frequence: '1 fois par jour' }];
  showAddMedicament = false;
  showAddSoin = false;
  showAddTest = false;
  newSoin = '';
  newMedicament = { nom: '', dosage: '', duree: '', frequence: ''  };
  showNotification = false;
  notificationType: 'success' | 'error' = 'success';
  notificationMessage = '';
  newTest = {
    name: '',
    type: '',
    parameters: {} as Record<string, boolean>,
  };
toggleAddMedicamentPopup() {
  this.showAddMedicament = !this.showAddMedicament;
  this.newMedicament = { nom: '', dosage: '', duree: '', frequence: '' };
}
addTest() {
  if (this.newTest.name.trim() && this.newTest.type.trim()) {
    if (this.newTest.type === 'bilan') {
      const parameters = Object.keys(this.newTest.parameters)
        .filter(key => this.newTest.parameters[key])
        .map(paramName => ({ param_name: paramName }));

      const payload = {
        consultation: this.consult.id,
        exam_name: this.newTest.name.trim(),
        parameters: parameters
      };

      this.addsoin.addbilan(payload).subscribe(
        response => {
          this.consult.biological_exams.push(response); // Optionally update local list
          this.newTest = { name: '', type: '', parameters: {} };
          this.toggleAddTestPopup();
          this.showNotificationMessage('success', 'Test ajouté!');
        },
        error => {
          console.error(error);
          this.showNotificationMessage('error', 'Erreur lors de l’ajout du test.');
        }
      );
    }else if (this.newTest.type === 'radio'){
      const payload = {
        consultation: this.consult.id,
        exam_name: this.newTest.name.trim(),
      };

      this.addsoin.addradio(payload).subscribe(
        response => {
          this.consult.radiological_exams.push(response); // Optionally update local list
          this.newTest = { name: '', type: '', parameters: {} };
          this.toggleAddTestPopup();
          this.showNotificationMessage('success', 'Test ajouté!');
        },
        error => {
          console.error(error);
          this.showNotificationMessage('error', 'Erreur lors de l’ajout du test.');
        }
      );

    
    } else {
      this.showNotificationMessage('error', 'Type de test non pris en charge.');
    }
  } else {
    this.showNotificationMessage('error', 'Veuillez remplir tous les champs.');
  }
}
toggleAddSoinPopup() {
  this.showAddSoin = !this.showAddSoin;
}
toggleModal(exam: any): void {
  exam.showModal = !exam.showModal;
}
goBack() {
  this.router.navigate(['dpi-doctor/',this.consult.dpi]);
}
toggleAddTestPopup() {
  this.showAddTest = !this.showAddTest;
}
// addMedicament() {
//   if (
//     this.newMedicament.nom &&
//     this.newMedicament.dosage &&
//     this.newMedicament.duree &&
//     this.newMedicament.frequence
//   ) {
//     this.listItemsord.push({ ...this.newMedicament });
//     this.toggleAddMedicamentPopup();
//   } else {
//     alert('Veuillez remplir tous les champs du médicament.'); 
//   }
// }
fetchMedicationsByConsultation() {
  const apiUrl = `http://127.0.0.1:8000/api/consultation/all/${this.dpi_id}`;

  fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch consultations');
      }
      return response.json();
    })
    .then((consultations) => {
      // Find the consultation with the specified consultation ID
      const consultation = consultations.find((c: Consultation) => c.id === this.consultation.id);

      if (consultation && consultation.prescription && consultation.prescription.medicines) {
        // Extract medications from the prescription
        const medications = consultation.prescription.medicines.map((medicine: newMedicament) => ({
          nom: medicine.nom,
          dosage: medicine.dosage,
          duree: medicine.duree, 
          frequence: medicine.dosage, 
        }));

        // Update the local state or display the medications
        this.medicaments = medications;
        console.log('Medications fetched:', medications); // Optional: Debugging output
      } else {
        console.log('No medications found for the specified consultation ID.');
        this.medicaments = []; // Clear the list if no medications are found
      }
    })
    .catch((error) => {
      console.error('Error fetching medications:', error);
    });
}

addMedicament() {
  if (
    this.newMedicament.nom &&
    this.newMedicament.dosage &&
    this.newMedicament.duree &&
    this.newMedicament.frequence
  ) {
    // Prepare data to match the API structure
    const data = {
      prescription: this.consult.prescription.id, // Replace with the actual prescription ID
      medication_name: this.newMedicament.nom,
      dosage: this.newMedicament.dosage,
      duration: this.newMedicament.duree,
      frequency: this.newMedicament.frequence
    };
    this.addmedicament.addMedicament(data).subscribe({
      next: (data5) => {

        this.consult.prescription.medicines.push({medication_name: this.newMedicament.nom,
          dosage: this.newMedicament.dosage,
          duration: this.newMedicament.duree,
          frequency: this.newMedicament.frequence});
        this.showNotificationMessage('success', 'Les changements ont été enregistrés!');
      },
      error: (error) => {
        
        this.showNotificationMessage('error', 'Les changements n\'ont pas été enregistré!');
      }
    });

    
  } else {
    alert('Veuillez remplir tous les champs du médicament.');
  }

  this.showAddMedicament = false;
}

addSoin() {
  if (this.newSoin.trim()) {
    // Prepare the data to send to the API
    const data = {
      consultation: this.consult.id, // Replace with the actual consultation ID
      care_name: this.newSoin.trim(),
    };
    this.addsoin.addSoin(data).subscribe({
      next: (data5) => {
        this.consult.nursing_records.push({id: data5.id, care_name: this.newSoin.trim()});
        this.showNotificationMessage('success', 'Les changements ont été enregistrés!');
      },
      error: (error) => {
        
        this.showNotificationMessage('error', 'Les changements n\'ont pas été enregistré!');
      }
    });

    
  }
  this.showAddSoin = false;
}



  toggleEdit() {
    this.isEditing = !this.isEditing;
  }


  discardChanges() {
    this.isEditing = false;
  }

  deleteItem(index: number) {
   const id = this.consult.prescription.medicines[index].id;
   this.deletemedecine.delete(id).subscribe({
    next: (data5) => {
      this.consult.prescription.medicines.splice(index, 1);
      this.showNotificationMessage('success', 'Les changements ont été enregistrés!');
    },
    error: (error) => {
      this.showNotificationMessage('error', 'Les changements n\'ont pas été enregistré!');
    }
  });
}

  showNotificationMessage(type: 'success' | 'error', message: string) {
    this.notificationType = type;
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }
  
  // saveChanges() {
  //   this.isEditing = false;
  //   const isSaveSuccessful = true;
    
  
  //   if (isSaveSuccessful) {
  //     this.showNotificationMessage('success', 'les changements ont été enregistré!');
  //   } else {
  //     this.showNotificationMessage('error', 'Une erreur s\'est produite. Veuillez réessayer.');
  //   }
  // }

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
  
    this.fetchMedicationsByConsultation();
  }
  saveChanges() {
    const data4={
      consultation_summary: this.resume,
      dpi: this.consult.dpi.id,
      doctor: this.consult.doctor.id
    }
    this.updateSummary.updateSummary(this.consult.id, data4).subscribe({
      next: (data5) => { console.log(data5);
        this.consult.consultation_summary = this.resume;
        this.showNotificationMessage('success', 'Les changements ont été enregistrés!');
      },
      error: (error) => {
        console.error('Error updating summary:', error);
        this.showNotificationMessage('error', 'Les changements n\'ont pas été enregistré!');
      }
    });
    this.isEditing = false; // Disable editing state
    
    
  }
  
}

