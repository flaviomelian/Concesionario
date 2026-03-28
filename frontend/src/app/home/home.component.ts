import { HttpClient, HttpParams } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class Home implements OnInit {
  vehicles: any[] = [];
  private apiUrl = 'http://localhost:8080/api/vehicles';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.searchVehicles('', ''); // Carga inicial sin filtros
  }

  searchVehicles(brand: string, maxPrice: string) {
    console.log('Buscando vehículos con marca:', brand, 'y precio máximo:', maxPrice);
    let params = new HttpParams();
    
    if (brand) params = params.set('brand', brand);
    if (maxPrice) params = params.set('maxPrice', maxPrice);

    this.http.get<any[]>(`${this.apiUrl}/filtered`, { params }).subscribe({
      next: (data) => (this.vehicles = data),
      error: (err) => console.error('Error al filtrar vehículos', err)
    });
  }
}