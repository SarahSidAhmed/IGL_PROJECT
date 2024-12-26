import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { provideCharts } from 'ng2-charts';

import { BaseChartDirective } from 'ng2-charts';

interface MedicalResults {
  glucose: number | null;
  crp: number | null;
  creatinine: number | null;
  cholesterol: number | null;
  sodium: number | null;
  potassium: number | null;
}

@Component({
  selector: 'app-test-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './test-popup.component.html',
  styleUrl: './test-popup.component.scss',
})
export class TestPopupComponent {
  @Input() patientName!: string;
  @Input() gender!: string;
  @Input() age!: number;
  @Input() patientId!: string;
  @Input() testsNeeded!: string;

  @Output() closePopup = new EventEmitter<void>();
  @Output() submitResults = new EventEmitter<{
    results: MedicalResults;
    report: string;
  }>();

  report: string = '';
  results: MedicalResults = {
    glucose: null,
    crp: null,
    creatinine: null,
    cholesterol: null,
    sodium: null,
    potassium: null,
  };

  showGraph: boolean = false;

  // Chart.js data and configuration
  chartData: ChartData<'bar'> = {
    labels: ['Glucose', 'Créatinine', 'Sodium', 'Cholesterol', 'Potassium'],
    datasets: [
      {
        label: 'Test Results',
        data: [],
        backgroundColor: [
          '#0F766E',
          '#0F766E',
          '#0F766E',
          '#0F766E',
          '#0F766E',
        ],
      },
    ],
  };

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tests',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Values',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  onGenerateGraph(): void {
    this.chartData.datasets[0].data = [
      this.results.glucose || 0,
      this.results.creatinine || 0,
      this.results.sodium || 0,
      this.results.cholesterol || 0,
      this.results.potassium || 0,
    ];
    this.showGraph = true;
  }

  closeGraph(): void {
    this.showGraph = false;
  }

  onClose(): void {
    this.closePopup.emit();
  }

  onSubmit(): void {
    this.submitResults.emit({
      results: this.results,
      report: this.report,
    });
    this.onClose();
  }

  onReset(): void {
    this.results = {
      glucose: null,
      crp: null,
      creatinine: null,
      cholesterol: null,
      sodium: null,
      potassium: null,
    };
    this.report = '';
  }
}
