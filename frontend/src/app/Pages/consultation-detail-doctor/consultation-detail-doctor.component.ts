import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultation-detail-doctor',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './consultation-detail-doctor.component.html',
  styleUrls: ['./consultation-detail-doctor.component.scss']
})

export class ConsultationDetailDoctorComponent {
  consultationId: number = 3;

  isEditing = false;
  resume = 'Lorem ipsum dolor sit amet...';
  tests = ['Test 1', 'Test 2', 'Test 3'];
  soins = ['Soin 1', 'Soin 2', 'Soin 3'];
  showAddMedicament = false;
  listItemsord: { nom: string; dosage: string; duree: string; frequence: string }[] = [];
  newMedicament = { nom: '', dosage: '', duree: '', frequence: '' };
  showNotification = false;
  notificationType: 'success' | 'error' = 'success';
  notificationMessage = '';

  constructor(private http: HttpClient) {

  }

  toggleAddMedicamentPopup() {
    this.showAddMedicament = !this.showAddMedicament;
    this.newMedicament = { nom: '', dosage: '', duree: '', frequence: '' };
  }

  addMedicament() {
    if (
      this.newMedicament.nom &&
      this.newMedicament.dosage &&
      this.newMedicament.duree &&
      this.newMedicament.frequence
    ) {
      
      this.http
        .get(`http://127.0.0.1:8000/api/prescription/${this.consultationId}/`)
        .subscribe(
          (prescriptionResponse: any) => {
            const prescriptionId = prescriptionResponse.prescription_id;
  
            
            this.http
              .get(`http://127.0.0.1:8000/api/prescription/${prescriptionId}/`)
              .subscribe(
                (prescriptionDetails: any) => {
                  console.log('Prescription details:', prescriptionDetails);
  
                  
                  const medicamentPayload = {
                    ...this.newMedicament,
                    prescription_id: prescriptionId,
                  };
  
                  // Step 4: Make the HTTP request to add the medicine
                  this.http
                    .post('http://127.0.0.1:8000/api/medicine/add/', medicamentPayload)
                    .subscribe(
                      (response: any) => {
                        // Assuming response is a success confirmation
                        this.listItemsord.push({ ...this.newMedicament });
                        this.toggleAddMedicamentPopup();
                        this.showNotificationMessage(
                          'success',
                          'Médicament ajouté avec succès!'
                        );
                      },
                      (error: HttpErrorResponse) => {
                        console.error(error);
                        this.showNotificationMessage(
                          'error',
                          "Échec de l'ajout du médicament."
                        );
                      }
                    );
                },
                (error: HttpErrorResponse) => {
                  console.error(error);
                  this.showNotificationMessage(
                    'error',
                    "Échec de la récupération des détails de l'ordonnance."
                  );
                }
              );
          },
          (error: HttpErrorResponse) => {
            console.error(error);
            this.showNotificationMessage(
              'error',
              "Échec de la récupération ou de la création de l'ordonnance."
            );
          }
        );
    } else {
      alert('Veuillez remplir tous les champs du médicament.');
    }
  }
  

  // addMedicament(consultationId: number) {
  //   if (
  //     this.newMedicament.nom &&
  //     this.newMedicament.dosage &&
  //     this.newMedicament.duree &&
  //     this.newMedicament.frequence
  //   ) {
  //     // Make the HTTP request to add the medicament to the backend
  //     this.http
  //       .post('http://127.0.0.1:8000/api/medicine/add/', this.newMedicament)
  //       .subscribe(
  //         (response: any) => {
  //           // Assuming response is a success confirmation
  //           this.listItemsord.push({ ...this.newMedicament });
  //           this.toggleAddMedicamentPopup();
  //           this.showNotificationMessage('success', 'Medicament ajouté avec succès!');
  //         },
  //         (error: HttpErrorResponse) => {
  //           console.error(error);
  //           this.showNotificationMessage('error', 'Échec de l\'ajout du médicament.');
  //         }
  //       );
  //   } else {
  //     alert('Veuillez remplir tous les champs du médicament.');
  //   }
  // }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  discardChanges() {
    this.isEditing = false;
  }

  deleteItem(list: any[], index: number) {
    list.splice(index, 1);
  }

  showNotificationMessage(type: 'success' | 'error', message: string) {
    this.notificationType = type;
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }

  saveChanges() {
    this.isEditing = false;
    const isSaveSuccessful = true;

    if (isSaveSuccessful) {
      this.showNotificationMessage('success', 'Changes saved successfully!');
    } else {
      this.showNotificationMessage('error', 'Failed to save changes. Please try again.');
    }
  }
}
