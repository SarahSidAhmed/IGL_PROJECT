import { Component } from '@angular/core';
import { RadioCardComponent } from '../radio-card/radio-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface data {
  patientName: string;
  gender: string;
  age: number;
  patientId: string;
  radioNeeded:string;
}
@Component({
  selector: 'app-radio-list',
  imports: [RadioCardComponent, CommonModule,FormsModule],
  templateUrl: './radio-list.component.html',
  styleUrl: './radio-list.component.scss'
})
export class RadioListComponent {
  scanQrCode() {
    throw new Error('Method not implemented.');
    }
      searchQuery: string = '';
      radioList: data[] = [
        {
          patientName: 'John Doeeeeeee',
          gender: 'Male',
          age: 30,
          patientId: '001',
          radioNeeded:'left arm'
        },
        {
          patientName: 'Kheddia Assiaas',
          gender: 'Male',
          age: 30,
          patientId: '001',
          radioNeeded:'chest'
        },
        {
          patientName: 'Kadid Selssabil',
          gender: 'Male',
          age: 30,
          patientId: '001',
          radioNeeded:'brain scan'
        },
        {
          patientName: 'Djouaher Yasmine',
          gender: 'Male',
          age: 30,
          patientId: '001',
          radioNeeded:'teeth'
        },
        {
          patientName: 'Jane Smith',
          gender: 'Female',
          age: 25,
          patientId: '002',
          radioNeeded:'jsppp'
        },
        // Add more dummy data here
      ];
    
      filteredRadioList: data[] = [...this.radioList];
    
      onLogout() {
        console.log('Logging out...');
        // Add logout logic here
      }
      
    
      // Triggered on clicking the Search button
      onSearch() {
        this.filteredRadioList = this.radioList.filter((card) =>
          card.patientName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
     
}
