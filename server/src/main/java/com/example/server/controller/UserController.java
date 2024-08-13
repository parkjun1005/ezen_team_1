package com.example.server.controller;

import com.example.server.dto.ResponseDTO;
import com.example.server.dto.UserDTO;
import com.example.server.model.UserEntity;
import com.example.server.security.TokenProvider;
import com.example.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;


@RestController
@RequestMapping("/member")
public class UserController {

    @Autowired
    private UserService userService;
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private TokenProvider tokenProvider;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        try {
            UserEntity user = UserEntity.builder()
                    .userId(userDTO.getUserId())
                    .userPw(passwordEncoder.encode(userDTO.getUserPw()))
                    .userName(userDTO.getUserName())
                    .userEmail(userDTO.getUserEmail())
                    .userPhone(userDTO.getUserPhone())
                    .address(userDTO.getAddress())
                    .addressDetail(userDTO.getAddressDetail())
                    .zoneCode(userDTO.getZoneCode())
                    .socialLogin(userDTO.getSocialLogin())
                    .enrollDate(LocalDateTime.now())  // 여기에서 설정
                    .build();

            UserEntity registeredUser = userService.create(user);

            UserDTO registeredUserDTO = UserDTO.builder()
                    .userId(registeredUser.getUserId())
                    .userName(registeredUser.getUserName())
                    .build();

            return ResponseEntity.ok().body(registeredUserDTO);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseDTO responseDTO = ResponseDTO.builder()
                    .error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody UserDTO userDTO) {
        try {
            UserEntity user = userService.getByCredentials(
                    userDTO.getUserId(),
                    userDTO.getUserPw(),
                    passwordEncoder
            );
            if (user != null) {
                final String token = tokenProvider.create(user);
                final UserDTO responseUserDTO = UserDTO.builder()
                        .userId(user.getUserId())
                        .loginToken(token)
                        .build();
                return ResponseEntity.ok().body(responseUserDTO);
            } else {
                throw new RuntimeException("Invalid login credentials");
            }
        } catch (Exception e) {
            e.printStackTrace(); // 콘솔에 오류를 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    ResponseDTO.builder().error("로그인 처리 중 오류가 발생했습니다.").build()
            );
        }
    }
}
