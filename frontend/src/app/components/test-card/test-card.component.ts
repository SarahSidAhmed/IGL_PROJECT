import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestListService } from '../../services/test-list.service';

@Component({
  selector: 'app-test-card',
  imports: [CommonModule],
  templateUrl: './test-card.component.html',
  styleUrl: './test-card.component.scss'
})
export class TestCardComponent implements OnInit {
  @Input() dpiId!: string ;
  exams: any[] = [];

  constructor(private examService: TestListService) {}

  ngOnInit(): void {
    this.loadExams();
  }
  

  loadExams(): void {
    this.examService.getExams(this.dpiId).subscribe({
      next: (data) => {
        this.exams = data;
        console.log('Exams:', this.exams);
      },
      error: (error) => {
        console.error('Error fetching exams:', error);
      }
  });
  }

  toggleModal(exam: any): void {
    exam.showModal = !exam.showModal;
  }
}
