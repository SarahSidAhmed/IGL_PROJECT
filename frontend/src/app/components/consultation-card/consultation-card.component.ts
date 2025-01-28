import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-consultation-card',
  imports: [CommonModule],
  templateUrl: './consultation-card.component.html',
  styleUrl: './consultation-card.component.scss'
})
export class ConsultationCardComponent {
  isExpanded = false;
  constructor(private router: Router) {}

  @Input() consultation: any;
  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }
 
  seeMore(): void {
    this.router.navigate(['consultation-detail-doctor/', this.consultation.id,this.consultation.dpi]);
    
  }

}
