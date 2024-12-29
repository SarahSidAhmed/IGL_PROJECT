import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestCardComponent } from '../test-card/test-card.component';
import { FormsModule } from '@angular/forms';
interface data {
  patientName: string;
  gender: string;
  age: number;
  patientId: string;
  testsNeeded:string;
}

@Component({
  selector: 'app-test-list',
  imports: [CommonModule, TestCardComponent, FormsModule],
  templateUrl: './test-list.component.html',
  styleUrl: './test-list.component.scss'
})
export class TestListComponent {
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
          testsNeeded:'left arm, mewi, lala'
        },
        {
          patientName: 'Kheddia Assiaas',
          gender: 'Male',
          age: 30,
          patientId: '001',
          testsNeeded:'chest, dddd, hhhhh'
        },
        {
          patientName: 'Kadid Selssabil',
          gender: 'Male',
          age: 30,
          patientId: '001',
          testsNeeded:'brain, oops, nann'
        },
        {
          patientName: 'Djouaher Yasmine',
          gender: 'Male',
          age: 30,
          patientId: '001',
          testsNeeded:'glucose, etc'
        },
        {
          patientName: 'Jane Smith',
          gender: 'Female',
          age: 25,
          patientId: '002',
          testsNeeded:'jsppp, cutttt'
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
