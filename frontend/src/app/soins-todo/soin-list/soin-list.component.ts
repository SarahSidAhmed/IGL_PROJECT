import { Component } from '@angular/core';
import { SoinCardComponent } from '../soin-card/soin-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface data {
  patientName: string;
  gender: string;
  age: number;
  patientId: string;
  soinNeeded:string;
}
@Component({
  selector: 'app-soin-list',
  imports: [SoinCardComponent,CommonModule,FormsModule],
  templateUrl: './soin-list.component.html',
  styleUrl: './soin-list.component.scss'
})
export class SoinListComponent {
  scanQrCode() {
    throw new Error('Method not implemented.');
    }
      searchQuery: string = '';
      soinList: data[] = [
        {
          patientName: 'John Doeeeeeee',
          gender: 'Male',
          age: 30,
          patientId: '001',
          soinNeeded:'left arm'
        },
        {
          patientName: 'Kheddia Assiaas',
          gender: 'Male',
          age: 30,
          patientId: '001',
          soinNeeded:'chest'
        },
        {
          patientName: 'Kadid Selssabil',
          gender: 'Male',
          age: 30,
          patientId: '001',
          soinNeeded:'brain scan'
        },
        {
          patientName: 'Djouaher Yasmine',
          gender: 'Male',
          age: 30,
          patientId: '001',
          soinNeeded:'teeth'
        },
        {
          patientName: 'Jane Smith',
          gender: 'Female',
          age: 25,
          patientId: '002',
          soinNeeded:'jsppp'
        },
        // Add more dummy data here
      ];
    
      filteredSoinList: data[] = [...this.soinList];
    
      onLogout() {
        console.log('Logging out...');
        // Add logout logic here
      }
      
    
      // Triggered on clicking the Search button
      onSearch() {
        this.filteredSoinList = this.soinList.filter((card) =>
          card.patientName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
     
}
