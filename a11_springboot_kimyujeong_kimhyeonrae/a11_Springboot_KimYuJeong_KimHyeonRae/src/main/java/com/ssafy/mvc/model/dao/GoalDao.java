package com.ssafy.mvc.model.dao;

import com.ssafy.mvc.model.dto.Goal;

public interface GoalDao {
	
	// 목표 등록
	int insertGoal(Goal goal);
	
	// 목표 조회
	Goal selectGoal(String email);
	
	// 목표 수정
	int updateGoal(Goal goal);
	
	// 목표 삭제
	int deleteGoal(String email);
	
}
