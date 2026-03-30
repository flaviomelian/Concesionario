import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'add-vehicle',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './addVehicle.component.html',
  styleUrls: ['./addVehicle.component.css'],
})
export class AddVehicle {
  vehicleForm: FormGroup;
  apiUrl = 'http://localhost:8080/api/vehicles'; // Ajusta según tu configuración

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.vehicleForm = this.fb.group({
      make: ['', [Validators.required, Validators.minLength(2)]],
      model: ['', Validators.required],
      year: [new Date().getFullYear(), [Validators.required, Validators.min(1900)]],
      price: [0, [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const fullBase64String = reader.result as string;

        // LA MAGIA ESTÁ AQUÍ:
        // Dividimos por la coma y nos quedamos con la segunda parte
        const cleanBase64 = fullBase64String.split(',')[1];

        this.vehicleForm.patchValue({
          image: cleanBase64,
        });
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.vehicleForm.valid) {
      this.http.post(this.apiUrl, this.vehicleForm.value).subscribe({
        next: (response) => {
          console.log('Vehículo creado con éxito', response);
          // 3. Redirige al Home tras el éxito
          this.router.navigate(['/home']);
        },
        error: (error) => console.error('Error al crear vehículo', error),
      });
    }
  }
}
