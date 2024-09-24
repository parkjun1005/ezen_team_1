package com.example.server.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import com.example.server.model.UserEntity; // UserEntity 클래스 import
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "review")
@Getter
@Setter

public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long review_id;

    // UserEntity와의 관계 설정
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private UserEntity user;

    private Integer review_num;
    private Integer review_no;
    private String review_head;
    private String review_content;
    private LocalDate post_date;
    private LocalDate modi_date;
    private String author;
    private LocalDate date;
    private String file_path;
    private Integer view_count;

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Comment> comments;

    @Transient
    private String formattedDate;


}
