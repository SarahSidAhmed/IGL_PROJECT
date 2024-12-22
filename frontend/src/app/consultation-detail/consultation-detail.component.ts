import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-consultation-detail',
  imports: [RouterOutlet,CommonModule,NavbarComponent],
  templateUrl: './consultation-detail.component.html',
  styleUrl: './consultation-detail.component.scss'
})
export class ConsultationDetailComponent {
  tests = [
    'Radio',
    'Bilan',
    'Graph'
  ];

  soins = [
    'Dose antivirus',
    'Dose insuline',
    'paracetamol 1g'
  ];

  listItemsord: { nom: string; dosage: string; duree: string; frequence: string }[] = [{ nom: 'Paracetamol', dosage: '2 cachets', duree: '5 jours', frequence: '2 fois ' },{ nom: 'AntiVirus', dosage: '1 cachet', duree: '4 jours', frequence: '1 '  }];

}
