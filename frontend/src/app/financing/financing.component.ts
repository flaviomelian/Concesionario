import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';

@Component({
  selector: 'app-financing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './financing.component.html',
  styleUrls: ['./financing.component.css']
})
export class Financing {

  constructor(private http: HttpClient, private router: Router) {}

  monthlyPayment: number = 0;

  calculate(amount: string, months: string) {
    const p = parseFloat(amount);
    const n = parseInt(months);
    const interest = 0.0599 / 12; // 5.99% TIN ficticio

    if (p > 0 && n > 0) {
      this.monthlyPayment = Math.round((p * interest) / (1 - Math.pow(1 + interest, -n)));
    }
  }
}