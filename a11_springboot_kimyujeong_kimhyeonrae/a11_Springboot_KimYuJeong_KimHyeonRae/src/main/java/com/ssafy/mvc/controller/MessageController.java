package com.ssafy.mvc.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.ssafy.mvc.model.dto.Message;
import com.ssafy.mvc.model.service.MessageService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api-message")
@Tag(name="MessageController")
@CrossOrigin("*")
public class MessageController {
	
	private final MessageService service;
	
	public MessageController(MessageService service) {
		this.service = service;
	}

	@GetMapping("/message/{receiver}")
	@Operation(summary="사용자(목표)에게 발신된 전체 메시지를 조회합니다.")
	public ResponseEntity<?> searchAllMessage(@PathVariable("receiver") String receiver) {
		List<Message> list = service.searchAllMessage(receiver);
		
		if(list != null && list.size() > 0) {
			return new ResponseEntity<List<Message>>(list, HttpStatus.OK);
		}
		
		return new ResponseEntity<String>("사용자에게 발신된 메시지가 없습니다.", HttpStatus.NO_CONTENT);
	}
	
	@GetMapping("/message/{receiver}/{messageId}")
	@Operation(summary="메시지를 조회합니다.")
	public ResponseEntity<?> searchMessageByMessageId(@PathVariable("messageId") int messageId) {
		Message message = service.searchMessageByMessageId(messageId);
		
		if(message != null) {
			return new ResponseEntity<Message>(message, HttpStatus.OK);
		}
		
		return new ResponseEntity<String>("해당 메시지는 존재하지 않습니다.", HttpStatus.NO_CONTENT);
	}
	
	@GetMapping("/open/{receiver}/{day}")
	@Operation(summary="해당 일차에 해당하는 메시지를 조회합니다.")
	public ResponseEntity<?> searchMessageByDay(@PathVariable("receiver") String receiver, @PathVariable("day") int day) {
		Map<String, String> info = new HashMap<>();
		
		info.put("receiver", receiver);
		info.put("day", day+""); // 문자열로 변환해서 보내기
		
		Message message = service.searchMessageByDay(info);
		
//		if(message == null) { // 해당 날짜에 메시지가 없으면 랜덤 메시지 가져오기
//			message = service.createRandomMessage(day);			
//		}
		
		if(message != null) {
			return new ResponseEntity<Message>(message, HttpStatus.OK);
		}
		
		return new ResponseEntity<String>("해당 날짜에 메시지가 존재하지 않습니다.", HttpStatus.NO_CONTENT);
	}
	
	@PostMapping("/message")
	@Operation(summary="메시지를 등록합니다.")
	public ResponseEntity<?> registMessage(@RequestBody Message message) {
		if(service.registMessage(message)) {
			return new ResponseEntity<Message>(message, HttpStatus.CREATED);
		}
		
		return new ResponseEntity<String>("메시지 등록에 실패하였습니다.", HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping("/message")
	@Operation(summary="메시지를 수정합니다.")
	public ResponseEntity<String> modifyMessage(@RequestBody Message message) {
		if(service.modifyMessage(message)) {
			return new ResponseEntity<String>("메시지를 성공적으로 수정하였습니다.", HttpStatus.OK);
		}
		
		return new ResponseEntity<String>("메시지 수정에 실패하였습니다.", HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping("/message/{messageId}")
	@Operation(summary="메시지를 삭제합니다.")
	public ResponseEntity<String> removeMessageByMessageId(@PathVariable("messageId") int messageId) {
		if(service.removeMessageByMessageId(messageId)) {
			return new ResponseEntity<String>("메시지를 성공적으로 삭제하였습니다.", HttpStatus.OK);
		}
		
		return new ResponseEntity<String>("메시지 삭제에 실패하였습니다.", HttpStatus.BAD_REQUEST);
	}
}
