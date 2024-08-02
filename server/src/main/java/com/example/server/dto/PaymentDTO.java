package com.example.server.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;



@Getter
@Setter
public class PaymentDTO {


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
    private List<OptionDto> options;
    private LocalDateTime orderDate;

    // Getters and Setters

    public static class OptionDto {
        private String optionName;
        private int optionCount;
        private double optionPrice;

        public String getOptionName() {
            return optionName;
        }

        public void setOptionName(String optionName) {
            this.optionName = optionName;
        }

        public int getOptionCount() {
            return optionCount;
        }

        public void setOptionCount(int optionCount) {
            this.optionCount = optionCount;
        }

        public double getOptionPrice() {
            return optionPrice;
        }

        public void setOptionPrice(double optionPrice) {
            this.optionPrice = optionPrice;
        }
        // Getters and Setters
    }
}
