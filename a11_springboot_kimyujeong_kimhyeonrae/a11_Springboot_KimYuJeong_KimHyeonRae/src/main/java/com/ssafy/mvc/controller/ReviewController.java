package com.ssafy.mvc.controller;

import java.util.List;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.mvc.model.dto.Review;
import com.ssafy.mvc.model.service.ReviewService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api-review")
@Tag(name="ReviewController")
@CrossOrigin("*")
public class ReviewController {

	private ReviewService service;
	
	public ReviewController(ReviewService service) {
		this.service = service;
	}

	@GetMapping("/review/review-list/{videoId}")
	@Operation(summary="해당 영상에 대한 리뷰 전체를 조회한다.")
	public ResponseEntity<?> searchReviewByVideoId(@PathVariable("videoId") String videoId) {
		List<Review> list = service.searchAllReview(videoId);
		
		if(list != null && list.size() > 0) {
			return new ResponseEntity<List<Review>>(list, HttpStatus.OK);
		}
		
		return new ResponseEntity<String>("해당 영상에 대한 리뷰가 없습니다.", HttpStatus.NO_CONTENT);
	}
	
	@GetMapping("/review/{reviewId}")
	@Operation(summary="해당 리뷰를 조회한다.")
	public ResponseEntity<?> searchReviewByReviewId(@PathVariable("reviewId") int reviewId) {
		Review review = service.searchReviewByReviewId(reviewId);
		
		if(review != null) {
			return new ResponseEntity<Review>(review, HttpStatus.OK);
		}
		
		return new ResponseEntity<String>("해당 리뷰가 없습니다.", HttpStatus.NO_CONTENT);
	}
	
	@PostMapping("/review")
	@Operation(summary="리뷰를 등록합니다.")
	public ResponseEntity<String> registReview(@RequestBody Review review) {
		System.out.println(review);
		if(service.registReview(review)) {
			return new ResponseEntity<String>("리뷰 등록에 성공하였습니다.", HttpStatus.CREATED);
		}
		
		return new ResponseEntity<String>("리뷰 등록에 실패하였습니다.", HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping("/review")
	@Operation(summary="리뷰를 수정합니다.")
	public ResponseEntity<String> modifyReview(@RequestBody Review review) {		
		if(service.modifyReview(review)) {
			return new ResponseEntity<String>("리뷰 수정에 성공하였습니다.", HttpStatus.CREATED);
		}
		
		return new ResponseEntity<String>("리뷰 수정에 실패하였습니다.", HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping("/review/{reviewId}")
	@Operation(summary="리뷰를 삭제합니다.")
	public ResponseEntity<String> removeReviewByReviewId(@PathVariable("reviewId") int reviewId) {
		if(service.removeReviewByReviewId(reviewId)) {
			return new ResponseEntity<String>("리뷰 삭제에 성공하였습니다.", HttpStatus.OK);
		}
		
		return new ResponseEntity<String>("리뷰 삭제에 실패하였습니다.", HttpStatus.BAD_REQUEST);
	}
	
}
