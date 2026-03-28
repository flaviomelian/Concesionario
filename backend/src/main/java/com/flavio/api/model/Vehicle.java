package com.flavio.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "vehicles")
@Data
public class Vehicle {
    @Id
    private Long id;
    private String make;
    private String model;
    private String imageURL;
    private int year;
    private double price;    
}