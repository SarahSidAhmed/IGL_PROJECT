import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-consultation-card',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './consultation-card.component.html',
  styleUrl: './consultation-card.component.scss'
})
export class ConsultationCardComponent {
  isExpanded = false;

  listItems = [
    'Radio',
    'Bilan',
    'Graph'
  ];
  listItemsord = [
    'Paracetamol',
    'anti virus'
  ];

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  seeMore(): void {
    console.log('Navigating to more details...');
  }

}
