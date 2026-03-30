package com.flavio.api.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.flavio.api.model.Vehicle;
import com.flavio.api.service.VehicleService;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class VehicleController {
    @Autowired
    private VehicleService vehicleService;

    @GetMapping
    public List<Vehicle> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    @GetMapping("/filtered")
    public List<Vehicle> getVehicles(
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) Double maxPrice) {
        return vehicleService.getFilteredVehicles(brand, maxPrice);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable Long id) {
        Vehicle vehicle = vehicleService.getVehicleById(id);
        if (vehicle != null)
            return ResponseEntity.ok(vehicle);
        else
            return ResponseEntity.notFound().build();
    }

    @PostMapping
    public Vehicle createVehicle(@RequestBody Vehicle vehicle) {
        return vehicleService.saveVehicle(vehicle);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable Long id, @RequestBody Vehicle vehicleDetails) {
        // 1. Buscas el coche por ID
        Vehicle vehicle = vehicleService.getVehicleById(id);
        if (vehicle != null) {
            // 2. Actualizas los campos
            vehicle.setMake(vehicleDetails.getMake());
            vehicle.setModel(vehicleDetails.getModel());
            vehicle.setYear(vehicleDetails.getYear());
            vehicle.setPrice(vehicleDetails.getPrice());
            vehicle.setImage(vehicleDetails.getImage()); // Aquí es donde el LONGBLOB importa

            // 3. Guardas los cambios
            Vehicle updated = vehicleService.saveVehicle(vehicle);
            return ResponseEntity.ok(updated);
        }else return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.noContent().build();
    }
}