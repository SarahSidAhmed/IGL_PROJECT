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

  listItemsord = [
    'Paracetamol',
    'anti virus',
    'anti virus',
    'anti virus',
    'anti virus'
  ];

}
