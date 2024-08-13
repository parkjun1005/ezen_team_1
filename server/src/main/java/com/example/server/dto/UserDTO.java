package com.example.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private String userId;
    private String userName;
    private String userPw;
    private String userEmail;
    private String userPhone;
    private String address;
    private String addressDetail;
    private int zoneCode;
    private String socialLogin;
    private Timestamp enrollDate;
    private String loginToken;
}
