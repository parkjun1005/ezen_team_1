package com.example.server.persistence;

import com.example.server.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    List<Payment> findByProductName(String productName);

    // UserEntity의 userId를 기준으로 Payment 엔티티 조회
    List<Payment> findByUser_UserId(String userId); // 수정된 메서드 이름
}
