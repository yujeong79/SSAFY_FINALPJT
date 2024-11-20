package com.ssafy.mvc.model.service;

import java.util.List;

import com.ssafy.mvc.model.dto.Review;

public interface ReviewService {
	
	// 해당 영상에 대한 리뷰 전체 조회
	List<Review> searchAllReview(String videoId);
	
	// 리뷰 조회
	Review searchReviewByReviewId(int reviewId);
	
	// 리뷰 등록
	boolean registReview(Review review);
	
	// 리뷰 수정
	boolean modifyReview(Review review);
	
	// 리뷰 삭제
	boolean removeReviewByReviewId(int reviewId);

	
}
