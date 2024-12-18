package com.ssafy.mvc.model.service;

import java.util.List;
import java.util.Map;

import com.ssafy.mvc.model.dto.Message;

public interface MessageService {

	// 메시지 등록
	boolean registMessage(Message message);
	
	// 전체 메시지 조회
	List<Message> searchAllMessage(String receiver);
	
	// id로 메시지 조회
	Message searchMessageByMessageId(int messageId);
	
	// day로 메시지 조회
	Message searchMessageByDay(Map<String, String> info);
	
	// 메시지 수정
	boolean modifyMessage(Message message);
	
	// id로 메시지 삭제
	boolean removeMessageByMessageId(int messageId);

	// 랜덤 메시지 생성
	Message createRandomMessage(int randomNumber);
}
