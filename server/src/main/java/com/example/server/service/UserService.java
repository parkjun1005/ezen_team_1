package com.example.server.service;

import com.example.server.model.UserEntity;
import com.example.server.persistence.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;

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

    public UserEntity getByCredentials(final String user_id, final String password, final PasswordEncoder encoder) {
        final UserEntity originalUser = userRepository.findByUserId(user_id);
        if (originalUser != null && encoder.matches(password, originalUser.getUserPw())) {
            return originalUser;
        }
        return null;
    }
}
