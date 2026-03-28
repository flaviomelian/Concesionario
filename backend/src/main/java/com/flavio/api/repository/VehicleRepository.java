package com.flavio.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.flavio.api.model.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findTop3ByOrderByIdDesc();

    @Query("SELECT v FROM Vehicle v WHERE " +
            "(:brand IS NULL OR v.make = :brand) AND " +
            "(:maxPrice IS NULL OR v.price <= :maxPrice)")
    List<Vehicle> findFiltered(@Param("brand") String brand, @Param("maxPrice") Double maxPrice);
}