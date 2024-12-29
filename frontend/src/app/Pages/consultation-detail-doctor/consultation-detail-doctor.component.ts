import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultation-detail-doctor',
  imports: [RouterOutlet,NavbarComponent,CommonModule,FormsModule],
  templateUrl: './consultation-detail-doctor.component.html',
  styleUrl: './consultation-detail-doctor.component.scss'
})
export class ConsultationDetailDoctorComponent {
  isEditing = false;
  resume = 'Lorem ipsum dolor sit amet...';
  tests = ['Test 1', 'Test 2', 'Test 3'];
  soins = ['Soin 1', 'Soin 2', 'Soin 3'];
  showAddMedicament = false;
  listItemsord: { nom: string; dosage: string; duree: string; frequence: string }[] = [];
  newMedicament = { nom: '', dosage: '', duree: '', frequence: ''  };
  showNotification = false;
notificationType: 'success' | 'error' = 'success';
notificationMessage = '';
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
    this.listItemsord.push({ ...this.newMedicament });
    this.toggleAddMedicamentPopup();
  } else {
    alert('Veuillez remplir tous les champs du médicament.'); 
  }
}

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
