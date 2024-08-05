package com.example.server.service;

import com.example.server.dto.PaymentDTO;
import com.example.server.model.Payment;
import com.example.server.model.User;
import com.example.server.persistence.PaymentRepository;
import com.example.server.persistence.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository; // UserRepository 주입

    @Transactional
    public void processPayment(PaymentDTO paymentDTO) {
        Payment payment = new Payment();

        // PaymentDTO의 데이터를 Payment 엔티티에 매핑
        payment.setProductId(paymentDTO.getProductId());

        // UserRepository를 사용하여 User 객체를 로드하고 설정
        User user = userRepository.findById(paymentDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        payment.setUser(user);

        payment.setReservationNumber(paymentDTO.getReservationNumber());
        payment.setReservationDate(paymentDTO.getReservationDate());
        payment.setProductName(paymentDTO.getProductName());
        payment.setOrderName(paymentDTO.getOrderName());
        payment.setOrderPhone(paymentDTO.getOrderPhone());
        payment.setUserEmail(paymentDTO.getUserEmail());
        payment.setPaymentPrice(paymentDTO.getPaymentPrice());
        payment.setProductPrice(paymentDTO.getProductPrice());
        payment.setOptionName(paymentDTO.getOptionName());
        payment.setOptionCount(paymentDTO.getOptionCount());
        payment.setOptionPrice(paymentDTO.getOptionPrice());
        payment.setOrderDate(paymentDTO.getOrderDate());
        payment.setPersonNumber(paymentDTO.getPersonNumber());
        paymentRepository.save(payment);
    }
}
