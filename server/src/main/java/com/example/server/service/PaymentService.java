package com.example.server.service;

import com.example.server.dto.PaymentDTO;
import com.example.server.model.Payment;
import com.example.server.persistence.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public void processPayment(PaymentDTO paymentDTO) {
        Payment payment = new Payment();
        // Map fields from DTO to Entity
        payment.setPaymentId(paymentDTO.getPaymentId());
        payment.setProductId(paymentDTO.getProductId());
        payment.setUserId(paymentDTO.getUserId());
        payment.setReservationNumber(paymentDTO.getReservationNumber());
        payment.setReservationDate(paymentDTO.getReservationDate());
        payment.setProductName(paymentDTO.getProductName());
        payment.setOrderName(paymentDTO.getOrderName());
        payment.setOrderPhone(paymentDTO.getOrderPhone());
        payment.setUserEmail(paymentDTO.getUserEmail());
        payment.setPaymentPrice(paymentDTO.getPaymentPrice());
        payment.setProductPrice(paymentDTO.getProductPrice());
        if (!paymentDTO.getOptions().isEmpty()) {
            // Handle options - assuming only one option for simplicity
            Payment.OptionDto option = paymentDTO.getOptions().get(0);
            payment.setOptionName(option.getOptionName());
            payment.setOptionCount(option.getOptionCount());
            payment.setOptionPrice(option.getOptionPrice());
        }
        payment.setOrderDate(paymentDTO.getOrderDate());

        // Save to database
        paymentRepository.save(payment);
    }
}
