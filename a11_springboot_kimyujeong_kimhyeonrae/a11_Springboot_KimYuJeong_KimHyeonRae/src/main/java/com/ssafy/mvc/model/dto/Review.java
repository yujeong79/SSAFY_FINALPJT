package com.ssafy.mvc.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name="리뷰 객체입니다.")
public class Review {
	private int reviewId;
	private String email;
	private String nickname;
	private String content;
	private String videoId;
	private String registDay;
	
	public Review() {}

	public Review(int reviewId, String email, String nickname, String content, String videoId, String registDay) {
		this.reviewId = reviewId;
		this.email = email;
		this.nickname = nickname;
		this.content = content;
		this.videoId = videoId;
		this.registDay = registDay;
	}

	public int getReviewId() {
		return reviewId;
	}

	public void setReviewId(int reviewId) {
		this.reviewId = reviewId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getVideoId() {
		return videoId;
	}

	public void setVideoId(String videoId) {
		this.videoId = videoId;
	}

	public String getRegistDay() {
		return registDay;
	}

	public void setRegistDay(String registDay) {
		this.registDay = registDay;
	}

	@Override
	public String toString() {
		return "Review [reviewId=" + reviewId + ", email=" + email + ", nickname=" + nickname + ", content=" + content
				+ ", videoId=" + videoId + ", registDay=" + registDay + "]";
	}
	
}
