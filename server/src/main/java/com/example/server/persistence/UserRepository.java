package com.example.server.persistence;

import com.example.server.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {
    UserEntity findByUserId(String userId);
    Boolean existsByUserId(String userId);
    UserEntity findByUserEmailAndUserPhone(String userEmail, String userPhone);
    UserEntity findByUserEmailAndUserId(String userEmail, String userId);

}
