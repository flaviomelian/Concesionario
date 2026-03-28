package com.flavio.api.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.flavio.api.model.Vehicle;
import com.flavio.api.repository.VehicleRepository;

@Service
public class VehicleService {
    @Autowired
    private VehicleRepository vehicleRepository;

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public List<Vehicle> getTop3Vehicles() {
        return vehicleRepository.findTop3ByOrderByIdDesc();
    }

    public List<Vehicle> getFilteredVehicles(String brand, Double maxPrice) {
        return vehicleRepository.findFiltered(brand, maxPrice);
    }

    public Vehicle getVehicleById(Long id) {
        return vehicleRepository.findById(id).orElse(null);
    }

    public Vehicle saveVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }
}