package com.ssafy.mvc.controller;

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

import com.ssafy.mvc.model.dto.Goal;
import com.ssafy.mvc.model.service.GoalService;
import com.ssafy.mvc.model.service.MessageService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api-goal")
@Tag(name="GoalController")
@CrossOrigin("*")
public class GoalController {
	//
	private final GoalService goalService;

	public GoalController(GoalService goalService) {
		this.goalService = goalService;
	}
	
	@GetMapping("/goal/{email}")
	@Operation(summary="사용자의 목표를 조회한다.")
	public ResponseEntity<?> searchGoal(@PathVariable("email") String email) {
		Goal goal = goalService.searchGoal(email);
		
		if(goal != null) {
			return new ResponseEntity<Goal>(goal, HttpStatus.OK);
		}
		
		return new ResponseEntity<String>("사용자는 목표를 등록하지 않았습니다.", HttpStatus.NO_CONTENT);
	}
	
	@PostMapping("/goal")
	@Operation(summary="사용자의 목표를 등록합니다.")
	public ResponseEntity<?> registGoal(@RequestBody Goal goal) {
		if(goalService.registGoal(goal)) {
			return new ResponseEntity<Goal>(goal, HttpStatus.CREATED);
		}
		
		return new ResponseEntity<String>("목표 등록에 실패하였습니다.", HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping("/goal")
	@Operation(summary="사용자의 목표를 수정합니다.")
	public ResponseEntity<String> modifyGoal(@RequestBody Goal goal) {
		if(goalService.modifyGoal(goal)) {
			return new ResponseEntity<String>("목표를 성공적으로 수정하였습니다.", HttpStatus.OK);
		}
		
		return new ResponseEntity<String>("목표 수정에 실패하였습니다.", HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping("/goal/{email}")
	@Operation(summary="사용자의 목표를 삭제합니다.")
	public ResponseEntity<String> removeGoal(@PathVariable("email") String email) {		
		if(goalService.removeGoal(email)) {
			System.out.println(email);
			return new ResponseEntity<String>("사용자의 목표를 성공적으로 삭제하였습니다.", HttpStatus.OK);
		}
		
		return new ResponseEntity<String>("목표 삭제를 실패하였습니다.", HttpStatus.BAD_REQUEST);
	}
	
}
