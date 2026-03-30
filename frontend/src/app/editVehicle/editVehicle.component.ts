import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-vehicle',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editVehicle.component.html',
})
export class EditVehicle implements OnInit {
  vehicleForm: FormGroup;
  vehicleId!: number;
  private apiUrl = 'http://localhost:8080/api/vehicles'; // Asegúrate de que coincida con tu backend

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    // Inicializamos el formulario con los mismos nombres del backend
    this.vehicleForm = this.fb.group({
      make: [''],
      model: [''],
      year: [''],
      price: [''],
      image: [''],
    });
  }

  ngOnInit(): void {
    // Capturamos el ID de la URL configurada como /edit-vehicle/:id
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.vehicleId = +idParam;
      this.loadVehicleData();
    }
  }

  loadVehicleData() {
    // Traemos los datos de ESE coche específico por ID
    this.http.get<any>(`${this.apiUrl}/${this.vehicleId}`).subscribe({
      next: (data) => {
        console.log('Vehículo recibido para editar:', data);

        // El patchValue mapea automáticamente las claves del JSON a los inputs del form
        this.vehicleForm.patchValue(data);

        // Forzamos la actualización de la vista
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener el vehículo', err),
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;

        /* CLAVE: Separamos por la coma.
         result es "data:image/jpeg;base64,ASDF123..."
         split(',')[1] nos da solo "ASDF123..."
      */
        const base64Data = result.split(',')[1];
        console.log('Base64 limpio para enviar al backend:', base64Data);
        this.vehicleForm.patchValue({
          image: base64Data,
        });

        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.vehicleForm.valid) {
      this.http.put(`${this.apiUrl}/${this.vehicleId}`, this.vehicleForm.value).subscribe({
        next: (response) => {
          console.log('Vehículo actualizado con éxito', response);
          // 3. Redirige al Home tras el éxito
          this.router.navigate(['/home']);
        },
        error: (error) => console.error('Error al actualizar vehículo', error),
      });
    }
  }
}
