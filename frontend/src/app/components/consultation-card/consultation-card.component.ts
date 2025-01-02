import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-consultation-card',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './consultation-card.component.html',
  styleUrl: './consultation-card.component.scss'
})
export class ConsultationCardComponent {
  isExpanded = false;

  @Input() consultation: any;
  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  seeMore(): void {
    console.log('Navigating to more details...');
  }

}
