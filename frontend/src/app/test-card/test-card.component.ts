import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-test-card',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './test-card.component.html',
  styleUrl: './test-card.component.scss'
})
export class TestCardComponent {
  listItems = [
    'Radio',
    'Bilan',
    'Graph',
    'Radio',
    'Radio',
    'Radio'

  ];

}
