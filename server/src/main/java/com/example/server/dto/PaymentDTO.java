package com.example.server.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Getter
@Setter
public class PaymentDTO {
    private Integer productId;
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
    private Integer optionCount;
    private double optionPrice;
    private OffsetDateTime orderDate;
    private Integer personNumber;
}
