import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestListService } from '../../services/test-list.service';

@Component({
  selector: 'app-test-card',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './test-card.component.html',
  styleUrl: './test-card.component.scss'
})
export class TestCardComponent implements OnInit{
  @Input() dpiId!: number; // Accept the DPI ID as an input
  exams: any[] = []; // Store the exams data

  constructor(private examService: TestListService) {}

  ngOnInit(): void {
    this.loadExams();
  }

  loadExams(): void {
    this.examService.getExams(this.dpiId).subscribe(
      (data) => {
        this.exams = data; // Store the fetched data
        console.log('Exams:', this.exams);
      },
      (error) => {
        console.error('Error fetching exams:', error);
      }
    );
  }

}
