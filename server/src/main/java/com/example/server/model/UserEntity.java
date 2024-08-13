package com.example.server.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Set;
@Builder
@Getter
@Setter
@Entity
@Table(name = "User")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private String userId;

    @Column(name = "user_pw", nullable = false)
    private String userPw;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @Column(name = "user_phone", nullable = false)
    private String userPhone;

    @Column(name = "address")
    private String address;

    @Column(name = "address_detail")
    private String addressDetail;

    @Column(name = "zone_code")
    private Integer zoneCode;

    @Column(name = "social_login")
    private String socialLogin;

    @Column(name = "enroll_date")
    private Timestamp enrollDate;

    @Column(name = "login_token")
    private String loginToken;

    // User와 Payment 엔티티 간의 1:N 관계 설정
    @OneToMany(mappedBy = "user")
    private Set<Payment> payments;
}