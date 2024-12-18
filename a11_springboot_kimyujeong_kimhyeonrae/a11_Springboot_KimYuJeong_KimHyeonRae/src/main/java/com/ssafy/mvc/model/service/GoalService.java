package com.ssafy.mvc.model.service;

import com.ssafy.mvc.model.dto.Goal;

public interface GoalService {
	
	// 목표 등록	
	boolean registGoal(Goal goal);
	
	// 목표 조회
	Goal searchGoal(String email);
	
	// 목표 수정
	boolean modifyGoal(Goal goal);
	
	// 목표 삭제
	boolean removeGoal(String email);
}
