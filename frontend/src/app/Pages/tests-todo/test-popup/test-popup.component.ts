 import { CommonModule } from '@angular/common';
 import { UpdateTestService } from '../../../services/update-test.service';
 import { FormsModule } from '@angular/forms'; 
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

interface MedicalResults {
  param1: number | null;
  param2: number | null;
  param3: number | null;
  param4: number | null;
  param5: number | null;
  param6: number | null;
}


@Component({
  selector: 'app-test-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './test-popup.component.html',
  styleUrls: ['./test-popup.component.scss'],
})
export class TestPopupComponent {
  @Input() patientName!: string;
  @Input() gender!: string;
  @Input() age!: number;
  @Input() testId!: number;
  @Input() testsNeeded!: string;
  @Input() param1!: [boolean, string, number];
  @Input() param2!: [boolean, string, number];
  @Input() param3!: [boolean, string, number];
  @Input() param4!: [boolean, string, number];
  @Input() param5!: [boolean, string, number];
  @Input() param6!: [boolean, string, number];


  @Output() closePopup = new EventEmitter<void>();

  @Output() submitResults = new EventEmitter<{
    results: MedicalResults;
    report: string;
  }>();



  constructor(
  private cdr: ChangeDetectorRef,
  private updateTestService: UpdateTestService
) {}

  ngOnInit(): void {
    console.log(this.param1); // Moved to ngOnInit lifecycle hook
  }


  report: string = '';
  results: MedicalResults = {
    param1: 0,
    param2: 0,
    param3: 0,
    param4: 0,
    param5: 0,
    param6: 0,
  };

  showGraph: boolean = false;

  // Chart.js data and configuration
  chartData: ChartData<'bar'> = {
    labels: [
      "param1",
      "param2",
      "param3",
      "param4",
      "param5",
      "param6",
    ],
    datasets: [
      {
        label: 'Test Results',
        data: [
          this.results.param1,
          this.results.param2,
          this.results.param3,
          this.results.param4,
          this.results.param5,
          this.results.param6,
        ],
        backgroundColor: Array(6).fill('#0F766E'),
      },
    ],
  };

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
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

  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;


  // console.log(this.param1);
  /**
   * Updates the `results` object when input values change.
   * @param field The field name being updated.
   * @param value The new value of the field.
   */
  onInputChange(field: keyof MedicalResults, event: Event): void {
    const target = event.target as HTMLInputElement; // Cast to HTMLInputElement
    const value = target.value; // Access the value safely
    this.results[field] = value ? Number(value) : null; // Convert to number or assign null if empty
    console.log(this.results); // Debug: Log updated results
  }

  onGenerateGraph(): void {
    this.chartData.datasets[0].data = [
      this.results.param1 || 0,
      this.results.param2 || 0,
      this.results.param3 || 0,
      this.results.param4 || 0,
      this.results.param5 || 0,
      this.results.param6 || 0,
    ];
    this.showGraph = true;
    this.cdr.detectChanges();
    console.log(this.results);
  }

  closeGraph(): void {
    this.showGraph = false;
  }

  onClose(): void {
    this.closePopup.emit();
  }

onSubmit(): void {
  const parameters = [];

  if (this.param1[0]) {
    parameters.push({ id: this.param1[2], value: this.results.param1 || 0 });
  }

  if (this.param2[0]) {
    parameters.push({ id: this.param2[2], value: this.results.param2 || 0 });
  }

  if (this.param3[0]) {
    parameters.push({ id: this.param3[2], value: this.results.param3 || 0 });
  }

  if (this.param4[0]) {
    parameters.push({ id: this.param4[2], value: this.results.param4 || 0 });
  }

  if (this.param5[0]) {
    parameters.push({ id: this.param5[2], value: this.results.param5 || 0 });
  }

  if (this.param6[0]) {
    parameters.push({ id: this.param6[2], value: this.results.param6 || 0 });
  }

  const data = {
    result: this.report,
    exam_date: new Date().toISOString().split('T')[0],
    lab_technician: 7, 
    parameters: parameters,
  };

  this.updateTestService.updateTest(this.testId, data).subscribe({
    next: (response) => {
      console.log('Update successful', response);
      this.onClose();
    },
    error: (error) => {
      console.error('Update failed', error);
    },
  });
}


  onReset(): void {
    this.results = {
      param1: null,
      param2: null,
      param3: null,
      param4: null,
      param5: null,
      param6: null,
    };
    this.report = '';
    this.closePopup.emit();
  }

}
