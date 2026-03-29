import { ChangeDetectorRef, Component, OnInit } from '@angular/core'; // Ya no necesitas OnDestroy ni Subscription para el router
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class Home implements OnInit {
  vehicles: any[] = [];
  private apiUrl = 'http://localhost:8080/api/vehicles';

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {
    // ESTO ES LO MÁS IMPORTANTE: 
    // Obliga a Angular a destruir y recrear el componente al navegar hacia él
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.ngOnInit(); // Llama a ngOnInit para cargar los vehículos al crear el componente
  }

  ngOnInit() {
    console.log('Home inicializado, cargando vehículos...');
    this.searchVehicles('', '');
  }

  searchVehicles(brand: string, maxPrice: string) {
    let params = new HttpParams();
    if (brand) params = params.set('brand', brand);
    if (maxPrice) params = params.set('maxPrice', maxPrice);

    this.http.get<any[]>(`${this.apiUrl}/filtered`, { params }).subscribe({
      next: (data) => {
        console.log('Vehículos recibidos:', data);
        this.vehicles = data;
        this.cdr.detectChanges(); // Asegura que Angular actualice la vista con los nuevos datos
      },
      error: (err) => console.error('Error al obtener vehículos', err)
    });
  }
}