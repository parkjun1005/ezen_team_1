package com.example.server.controller;

import com.example.server.dto.CommentDTO;
import com.example.server.dto.ReviewDTO;
import com.example.server.entity.Comment;
import com.example.server.entity.Review;
import com.example.server.model.UserEntity; // UserEntity 추가
import com.example.server.repository.CommentRepository;
import com.example.server.repository.ReviewRepository;
import com.example.server.persistence.UserRepository; // UserRepository 추가
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository; // UserRepository 주입

    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    // 엔티티를 DTO로 변환하는 메서드
    private ReviewDTO convertToDTO(Review review) {
        return new ReviewDTO(
                review.getReview_id(),
                review.getUser().getUserId(), // UserEntity에서 user_id를 가져옵니다.
                review.getReview_num(),
                review.getReview_no(),
                review.getReview_head(),
                review.getReview_content(),
                review.getPost_date(),
                review.getModi_date(),
                review.getAuthor(),
                review.getDate(),
                review.getFile_path(),
                review.getView_count(),
                review.getComments().stream()
                        .map(this::convertCommentToDTO)
                        .collect(Collectors.toList())
        );
    }

    // DTO를 엔티티로 변환하는 메서드
    private Review convertToEntity(ReviewDTO reviewDTO) {
        Review review = new Review();
        review.setReview_id(reviewDTO.getReview_id());

        // UserRepository를 사용하여 UserEntity를 찾고 설정합니다.
        UserEntity user = userRepository.findByUserId(reviewDTO.getUserId()); // user_id로 UserEntity를 조회합니다.
        review.setUser(user);

        review.setReview_num(reviewDTO.getReview_num());
        review.setReview_no(reviewDTO.getReview_no());
        review.setReview_head(reviewDTO.getReview_head());
        review.setReview_content(reviewDTO.getReview_content());
        review.setPost_date(reviewDTO.getPost_date());
        review.setModi_date(reviewDTO.getModi_date());
        review.setAuthor(reviewDTO.getAuthor());
        review.setDate(reviewDTO.getDate());
        review.setFile_path(reviewDTO.getFile_path());
        review.setView_count(reviewDTO.getView_count());

        // CommentDTO를 Comment로 변환하고 설정합니다.
        List<Comment> comments = reviewDTO.getComments().stream()
                .map(commentDTO -> convertCommentToEntity(commentDTO, review))
                .collect(Collectors.toList());
        review.setComments(comments);

        return review;
    }

    private CommentDTO convertCommentToDTO(Comment comment) {
        return new CommentDTO(
                comment.getId(),
                comment.getReview().getReview_id(),
                comment.getText(),
                comment.getRating()
        );
    }

    private Comment convertCommentToEntity(CommentDTO commentDTO, Review review) {
        Comment comment = new Comment();
        comment.setId(commentDTO.getId());
        comment.setReview(review);
        comment.setText(commentDTO.getText());
        comment.setRating(commentDTO.getRating());
        return comment;
    }

    @GetMapping
    public List<ReviewDTO> getAllReviews() {
        List<Review> reviews = reviewRepository.findAll();
        return reviews.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewDTO> getReviewById(@PathVariable("id") Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        return ResponseEntity.ok(convertToDTO(review));
    }

    @PostMapping
    public ResponseEntity<ReviewDTO> createReview(@RequestBody ReviewDTO reviewDTO) {
        Review review = convertToEntity(reviewDTO);
        review.setDate(LocalDate.now());
        Review savedReview = reviewRepository.save(review);
        return ResponseEntity.ok(convertToDTO(savedReview));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReviewDTO> updateReview(@PathVariable("id") Long id, @RequestBody ReviewDTO reviewDTO) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        review.setReview_head(reviewDTO.getReview_head());
        review.setReview_content(reviewDTO.getReview_content());
        review.setFile_path(reviewDTO.getFile_path());
        review.setDate(reviewDTO.getDate());
        Review savedReview = reviewRepository.save(review);
        return ResponseEntity.ok(convertToDTO(savedReview));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable("id") Long id) {
        reviewRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<List<CommentDTO>> getCommentsByReviewId(@PathVariable("id") Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        List<Comment> comments = commentRepository.findByReview(review);
        List<CommentDTO> commentDTOs = comments.stream()
                .map(this::convertCommentToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(commentDTOs);
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<CommentDTO> addCommentToReview(@PathVariable("id") Long id, @RequestBody CommentDTO commentDTO) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        Comment comment = convertCommentToEntity(commentDTO, review);
        Comment savedComment = commentRepository.save(comment);
        return ResponseEntity.ok(convertCommentToDTO(savedComment));
    }
}
