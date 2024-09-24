package com.example.server.service;

import com.example.server.dto.CommentDTO;
import com.example.server.dto.ReviewDTO;
import com.example.server.entity.Comment;
import com.example.server.entity.Review;
import com.example.server.repository.ReviewRepository;
import com.example.server.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private CommentRepository commentRepository;

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
        // review.setUser(...) // UserEntity를 설정하는 로직 필요
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
        // CommentDTO를 Comment로 변환하는 로직 필요
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

    public List<ReviewDTO> getAllReviews() {
        List<Review> reviews = reviewRepository.findAll();
        return reviews.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ReviewDTO getReviewById(Long id) {
        Review review = reviewRepository.findById(id).orElse(null);
        return review != null ? convertToDTO(review) : null;
    }

    public ReviewDTO saveReview(ReviewDTO reviewDTO) {
        Review review = convertToEntity(reviewDTO);
        Review savedReview = reviewRepository.save(review);
        return convertToDTO(savedReview);
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }

    @Transactional
    public ReviewDTO updateReview(Long id, ReviewDTO reviewDTO) {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new RuntimeException("Review not found"));
        review.setReview_head(reviewDTO.getReview_head());
        review.setReview_content(reviewDTO.getReview_content());
        review.setFile_path(reviewDTO.getFile_path());
        review.setDate(reviewDTO.getDate());
        review.setAuthor(reviewDTO.getAuthor());
        review.setView_count(reviewDTO.getView_count());

        // 기존 댓글 삭제 및 새 댓글 추가
        review.getComments().clear();
        for (CommentDTO commentDTO : reviewDTO.getComments()) {
            Comment comment = convertCommentToEntity(commentDTO, review);
            review.getComments().add(comment);
        }

        Review updatedReview = reviewRepository.save(review);
        return convertToDTO(updatedReview);
    }
}
