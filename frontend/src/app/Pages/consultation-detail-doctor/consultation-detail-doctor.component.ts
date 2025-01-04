
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
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
  prescriptionId = 1; 
  consultationId = 1;
  consultation = { id: 40, dpi: 3, prescription: 1, doctor: 1 };
  dpi_id = 3;
  isEditing = false;
  resume = 'Lorem ipsum dolor sit amet...';
  newTest = { name: '', type: '' };
  tests = [{ name: 'Test 1', type: 'bilan' }, { name: 'Test 2', type: 'bilan' }, { name: 'Test 3', type: 'radio' }];
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
      prescription: this.consultation.prescription, // Replace with the actual prescription ID
      medication_name: this.newMedicament.nom,
      dosage: this.newMedicament.dosage,
      duration: this.newMedicament.duree,
      frequency: this.newMedicament.frequence,
    };

    // API call
    fetch('http://127.0.0.1:8000/api/medicine/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          this.showNotificationMessage('success', 'Medicament ajouté!');
          return response.json();
        } else {
          throw new Error('Failed to add medicine');
        } 
      })
      .then((responseData) => {
        // Add the medicine to the local list
        this.medicaments.push({ ...this.newMedicament });
        this.toggleAddMedicamentPopup();
      })
      .catch((error) => {
        alert('Error: ' + error.message);
        this.showNotificationMessage(
          'error',
          'Une erreur s\'est produite. Veuillez réessayer.'
        );
      });
  } else {
    alert('Veuillez remplir tous les champs du médicament.');
  }
}

addSoin() {
  if (this.newSoin.trim()) {
    // Prepare the data to send to the API
    const data = {
      consultation: this.consultation.id, // Replace with the actual consultation ID
      care_name: this.newSoin.trim(),
    };

    // Call the Django API
    fetch('http://127.0.0.1:8000/api/nursing-records/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        // Update local state with the new soin
        this.soins.push(this.newSoin.trim());
        this.newSoin = ''; 
        this.toggleAddSoinPopup();
        this.showNotificationMessage('success', 'Soin ajouté!');

        console.log('Response data:', responseData); // Optional: Log the response
      })
      .catch((error) => {
        console.error('Error adding soin:', error);
        this.showNotificationMessage(
          'error',
          'Une erreur s\'est produite. Veuillez réessayer.'
        );
      });
  } else {
    this.showNotificationMessage(
      'error',
      'Une erreur s\'est produite. Veuillez réessayer.'
    );
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
    this.fetchMedicationsByConsultation();
  }
  saveChanges() {
    this.isEditing = false; // Disable editing state
  
    // Define the API URL and payload
    const apiUrl = `http://127.0.0.1:8000/api/consultation/update/${this.consultation.id}`;
    const payload = {
      consultation_summary: this.resume, // Updated summary value
      dpi: this.consultation.dpi, // Required DPI ID
      doctor: this.consultation.doctor, // Required doctor ID
    };
  
    // Make the PUT request
    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update consultation');
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful save
        this.showNotificationMessage('success', 'Les changements ont été enregistrés!');
        console.log('Updated consultation:', data);
      })
      .catch((error) => {
        // Handle errors
        this.showNotificationMessage('error', 'Une erreur s\'est produite. Veuillez réessayer.');
        console.error('Error updating consultation:', error);
      });
  }
  
}

