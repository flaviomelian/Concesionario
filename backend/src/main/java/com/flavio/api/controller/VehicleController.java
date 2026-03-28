package com.flavio.api.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.flavio.api.model.Vehicle;
import com.flavio.api.service.VehicleService;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = { "http://localhost:4200", "http://127.0.0.1:4200" })
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
        if (vehicle != null) return ResponseEntity.ok(vehicle);
        else return ResponseEntity.notFound().build();
    }

    @PostMapping
    public Vehicle createVehicle(@RequestBody Vehicle vehicle) {
        return vehicleService.saveVehicle(vehicle);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.noContent().build();
    }
}