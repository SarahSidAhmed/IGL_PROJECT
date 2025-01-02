
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-consultation-detail-doctor',
  imports: [RouterOutlet,NavbarComponent,CommonModule,FormsModule],
  templateUrl: './consultation-detail-doctor.component.html',
  styleUrl: './consultation-detail-doctor.component.scss'
})
export class ConsultationDetailDoctorComponent {
  isEditing = false;
  resume = 'Lorem ipsum dolor sit amet...';
  newTest = { name: '', type: '' };
  tests = [{ name: 'Test 1', type: 'bilan' }, { name: 'Test 2', type: 'bilan' }, { name: 'Test 3', type: 'radio' }];
  soins = ['Soin 1', 'Soin 2', 'Soin 3'];
  showAddMedicament = false;
  showAddSoin = false;
  showAddTest = false;
  newSoin = '';
  listItemsord: { nom: string; dosage: string; duree: string; frequence: string }[] = [];
  newMedicament = { nom: '', dosage: '', duree: '', frequence: ''  };
  showNotification = false;
notificationType: 'success' | 'error' = 'success';
notificationMessage = '';
toggleAddMedicamentPopup() {
  this.showAddMedicament = !this.showAddMedicament;
  this.newMedicament = { nom: '', dosage: '', duree: '', frequence: '' };
}
addTest() {
  if (this.newTest.name.trim() && this.newTest.type.trim()) {
    this.tests.push({ name: this.newTest.name.trim(), type: this.newTest.type.trim() });
    this.newTest = { name: '', type: '' };
    this.toggleAddTestPopup(); 
    this.showNotificationMessage('success', 'Test ajouté!');
  } else {
    this.showNotificationMessage('error', 'Une erreur s\'est produite. Veuillez remplir tous les champs.');
  }
}
toggleAddSoinPopup() {
  this.showAddSoin = !this.showAddSoin;
}

toggleAddTestPopup() {
  this.showAddTest = !this.showAddTest;
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
addSoin() {
  if (this.newSoin.trim()) {
    this.soins.push(this.newSoin.trim());
    this.newSoin = ''; 
    this.toggleAddSoinPopup(); 
    this.showNotificationMessage('success', 'Soin ajouté!');
  } else {
    this.showNotificationMessage('error', 'Une erreur s\'est produite. Veuillez réessayer.');
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
      this.showNotificationMessage('success', 'les changements ont été enregistré!');
    } else {
      this.showNotificationMessage('error', 'Une erreur s\'est produite. Veuillez réessayer.');
    }
  }
}

