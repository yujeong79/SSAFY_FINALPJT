package com.ssafy.mvc.model.service;

import org.springframework.stereotype.Service;

import com.ssafy.mvc.model.dao.GoalDao;
import com.ssafy.mvc.model.dto.Goal;

@Service
public class GoalServiceImpl implements GoalService {

	private GoalDao dao;
	
	public GoalServiceImpl(GoalDao dao) {
		this.dao = dao;
	}

	@Override
	public boolean registGoal(Goal goal) {
		return dao.insertGoal(goal) > 0;
	}

	@Override
	public Goal searchGoal(String email) {
		return dao.selectGoal(email);
	}

	@Override
	public boolean modifyGoal(Goal goal) {
		return dao.updateGoal(goal) > 0;
	}

	@Override
	public boolean removeGoal(String email) {
		return dao.deleteGoal(email) > 0;
	}

}
