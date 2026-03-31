import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface CarConfig {
  hex: string;
  llantas: string;
}

@Component({
  selector: 'app-digital-vehicle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './digitalVehicle.component.html',
  styleUrls: ['./digitalVehicle.component.css'],
})
export class DigitalVehicleComponent {
  // Estado inicial
  config: CarConfig = {
    hex: '#ff0000', // Rojo Pasión por defecto
    llantas: 'basicas',
  };

  // Estos datos vendrían de tu API de Spring
  opcionesColor = [
    { id: 'rojo', label: 'Rojo Pasión', hex: '#ff0000' },
    { id: 'azul', label: 'Azul Eléctrico', hex: '#0000ff' },
    { id: 'negro', label: 'Negro Obsidian', hex: '#000000' },
  ];

  opcionesLlantas = [
    { id: 'basicas', label: '17" Standard' },
    { id: 'deportivas', label: '19" AMG Style' },
  ];

  // En tu componente
  actualizarColorManual(hex: string) {
    this.config.hex = hex; // Para el coche CSS
    this.config.hex = 'custom'; // Opcional: para marcar que no es un preset
  }

  cambiarLlantas(llantaId: string) {
    this.config.llantas = llantaId;
  }
}
