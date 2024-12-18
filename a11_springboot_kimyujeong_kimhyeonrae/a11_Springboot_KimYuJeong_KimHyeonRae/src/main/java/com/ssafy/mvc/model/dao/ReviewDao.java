package com.ssafy.mvc.model.dao;

import java.util.List;

import com.ssafy.mvc.model.dto.Review;

public interface ReviewDao {
	
	// 해당 영상에 대한 리뷰 전체 조회
	List<Review> selectAllReview(String videoId);
	
	// 리뷰 조회
	Review selectReviewByReviewId(int reviewId);
	
	// 리뷰 등록
	int insertReview(Review review);
	
	// 리뷰 수정
	int updateReview(Review review);
	
	// 리뷰 삭제
	int deleteReviewByReviewId(int reviewId);
	
}
