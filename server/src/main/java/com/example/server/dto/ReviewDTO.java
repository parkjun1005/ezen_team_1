package com.example.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {
    private Long review_id;
    private String userId; // UserEntity의 user_id만 포함
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
    private List<CommentDTO> comments; // Comment도 DTO로 변환해서 사용

    // 필요한 경우, 모든 필드를 받는 생성자 추가 가능

}
