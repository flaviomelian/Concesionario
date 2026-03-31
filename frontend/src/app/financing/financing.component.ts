import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // NECESARIO para el binding
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-financing',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './financing.component.html',
  styleUrls: ['./financing.component.css']
})
export class Financing {
  monthlyPayment: number = 0;
  interestRate: number = 4.9; // Valor inicial por defecto

  calculate(amount: string, months: string, rate: number | string) {
    const P = parseFloat(amount);
    const n = parseInt(months);
    const annualRate = typeof rate === 'string' ? parseFloat(rate) : rate;
    
    if (P > 0 && n > 0 && annualRate > 0) {
      const i = (annualRate / 100) / 12; // Interés mensual decimal
      const cuota = (P * i) / (1 - Math.pow(1 + i, -n));
      this.monthlyPayment = Math.round(cuota * 100) / 100; // Redondeo a 2 decimales
    } else {
      this.monthlyPayment = 0;
    }
  }
}