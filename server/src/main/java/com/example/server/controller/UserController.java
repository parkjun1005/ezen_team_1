package com.example.server.controller;

import com.example.server.dto.PasswordResetDTO;
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
import org.springframework.web.bind.annotation.*;

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
                    .userPhone(registeredUser.getUserPhone())
                    .build();

            return ResponseEntity.ok().body(registeredUserDTO);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseDTO responseDTO = ResponseDTO.builder()
                    .error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @GetMapping("/check-id")
    public ResponseEntity<?> checkUserId(@RequestParam String userId) {
        boolean exists = userService.existsByUserId(userId);
        return ResponseEntity.ok(exists);
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


    @PostMapping("/findid")
    public ResponseEntity<?> findId(@RequestBody UserDTO userDTO) {
        try {
            UserEntity user = userService.findByEmailAndPhone(userDTO.getUserEmail(), userDTO.getUserPhone());

            if (user != null) {
                UserDTO responseUserDTO = UserDTO.builder()
                        .userId(user.getUserId())
                        .build();
                return ResponseEntity.ok().body(responseUserDTO);
            } else {
                return ResponseEntity.badRequest().body("아이디를 찾을 수 없습니다.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            ResponseDTO responseDTO = ResponseDTO.builder()
                    .error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }


    @PostMapping("/findpassword")
    public ResponseEntity<?> findPassword(@RequestBody UserDTO userDTO) {
        try {
            UserEntity user = userService.findByEmailAndUserId(userDTO.getUserEmail(), userDTO.getUserId());

            if (user != null) {
                // 임시 비밀번호 생성
                String tempPassword = userService.generateTemporaryPassword();

                // 생성된 임시 비밀번호로 사용자 비밀번호를 변경
                userService.updatePassword(user, tempPassword);

                // 임시 비밀번호를 클라이언트로 반환
                return ResponseEntity.ok().body(tempPassword);
            } else {
                return ResponseEntity.badRequest().body("사용자 정보를 찾을 수 없습니다.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            ResponseDTO responseDTO = ResponseDTO.builder()
                    .error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }


    @PostMapping("/resetpassword")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetDTO passwordResetDTO) {
        try {
            UserEntity user = userService.getCurrentUser(); // 현재 로그인된 사용자 정보 가져오기
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("사용자 인증 정보가 없습니다.");
            }

            if (userService.checkPassword(passwordResetDTO.getCurrentPassword(), user.getUserPw())) {
                userService.updatePassword(user, passwordResetDTO.getNewPassword());
                return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
            } else {
                return ResponseEntity.badRequest().body("현재 비밀번호가 잘못되었습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("비밀번호 변경 중 오류가 발생했습니다.");
        }
    }
    @GetMapping("/info")
    public ResponseEntity<UserDTO> getUserInfo() {
        UserEntity currentUser = userService.getCurrentUser();
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(currentUser.getUserId());
        userDTO.setUserName(currentUser.getUserName());
        userDTO.setUserEmail(currentUser.getUserEmail());
        userDTO.setUserPhone(currentUser.getUserPhone());
        userDTO.setAddress(currentUser.getAddress());
        userDTO.setAddressDetail(currentUser.getAddressDetail());
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/update-info")
    public ResponseEntity<?> updateUserInfo(@RequestBody UserDTO userDTO) {
        UserEntity currentUser = userService.getCurrentUser();
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("사용자 인증 정보가 없습니다.");
        }
        // 사용자의 정보를 업데이트합니다.
        currentUser.setUserPhone(userDTO.getUserPhone());
        currentUser.setAddress(userDTO.getAddress());
        currentUser.setAddressDetail(userDTO.getAddressDetail());
        userService.updateUser(currentUser); // 서비스 메서드를 통해 저장
        return ResponseEntity.ok("사용자 정보가 성공적으로 업데이트되었습니다.");
    }


}