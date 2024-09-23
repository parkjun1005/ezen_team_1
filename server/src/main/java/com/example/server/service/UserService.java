package com.example.server.service;

import com.example.server.model.UserEntity;
import com.example.server.persistence.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserEntity create(final UserEntity userEntity) {
        if (userEntity.getUserId() == null) {
            throw new RuntimeException("잘못되었습니다");
        }
        final String userId = userEntity.getUserId();
        if (userRepository.existsByUserId(userId)) {
            log.warn("이미 사용중인 아이디입니다: {}", userId);
            throw new RuntimeException("이미 사용중인 아이디입니다");
        }
        return userRepository.save(userEntity);
    }

    public UserEntity findByEmailAndPhone(String userEmail, String userPhone) {
        return userRepository.findByUserEmailAndUserPhone(userEmail, userPhone);
    }

    // 이메일과 아이디로 사용자 정보를 확인하는 메서드
    public UserEntity findByEmailAndUserId(String userEmail, String userId) {
        return userRepository.findByUserEmailAndUserId(userEmail, userId);
    }

    // 임시 비밀번호 생성 메서드
    public String generateTemporaryPassword() {
        SecureRandom random = new SecureRandom();
        int passwordLength = 6;
        StringBuilder temporaryPassword = new StringBuilder(passwordLength);

        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (int i = 0; i < passwordLength; i++) {
            int index = random.nextInt(characters.length());
            temporaryPassword.append(characters.charAt(index));
        }
        return temporaryPassword.toString();
    }

    // 사용자 비밀번호를 임시 비밀번호로 업데이트하는 메서드
    public void updateToTemporaryPassword(UserEntity user, String temporaryPassword) {
        user.setUserPw(passwordEncoder.encode(temporaryPassword));
        userRepository.save(user);
    }

    // 사용자 비밀번호를 업데이트하는 메서드
    public void updatePassword(UserEntity user, String newPassword) {
        user.setUserPw(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    // 비밀번호를 비교하는 메서드 추가
    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public boolean existsByUserId(String userId) {
        return userRepository.existsByUserId(userId);
    }

    public UserEntity getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId;

        if (principal instanceof UserDetails) {
            userId = ((UserDetails) principal).getUsername();
        } else {
            userId = principal.toString();
        }
        return userRepository.findByUserId(userId);
    }

    public void updateUser(UserEntity userEntity) {
        userRepository.save(userEntity);
    }


    public UserEntity getByCredentials(final String user_id, final String password, final PasswordEncoder encoder) {
        final UserEntity originalUser = userRepository.findByUserId(user_id);
        if (originalUser != null && encoder.matches(password, originalUser.getUserPw())) {
            return originalUser;
        }
        return null;
    }
}
