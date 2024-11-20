package com.ssafy.mvc.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.mvc.model.dao.ReviewDao;
import com.ssafy.mvc.model.dto.Review;

@Service
public class ReviewServiceImpl implements ReviewService {

	private ReviewDao dao;
	
	public ReviewServiceImpl(ReviewDao dao) {
		this.dao = dao;
	}

	@Override
	public List<Review> searchAllReview(String videoId) {
		return dao.selectAllReview(videoId);
	}
	
	@Override
	public Review searchReviewByReviewId(int reviewId) {
		return dao.selectReviewByReviewId(reviewId);
	}

	@Override
	public boolean registReview(Review review) {
		return dao.insertReview(review) > 0;
	}

	@Override
	public boolean modifyReview(Review review) {
		return dao.updateReview(review) > 0;
	}
	
	@Override
	public boolean removeReviewByReviewId(int reviewId) {
		return dao.deleteReviewByReviewId(reviewId) > 0;
	}



}
