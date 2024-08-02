package com.example.server.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "pay")
public class Payment {

    @Id
    private String paymentId;
    private String productId;
    private String userId;
    private String reservationNumber;
    private String reservationDate;
    private String productName;
    private String orderName;
    private String orderPhone;
    private String userEmail;
    private double paymentPrice;
    private double productPrice;
    private String optionName;
    private int optionCount;
    private double optionPrice;
    private LocalDateTime orderDate;

    // Getters and Setters
}
