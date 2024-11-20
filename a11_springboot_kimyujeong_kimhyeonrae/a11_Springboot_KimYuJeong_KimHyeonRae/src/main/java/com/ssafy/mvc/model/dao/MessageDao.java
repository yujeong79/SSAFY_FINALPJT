package com.ssafy.mvc.model.dao;

import java.util.List;
import java.util.Map;

import com.ssafy.mvc.model.dto.Message;

public interface MessageDao {
	
	// 메시지 등록
	int insertMessage(Message message);
	
	// 전체 메시지 조회	
	List<Message> selectAllMessage(String receiver);
	
	// id로 메시지 조회	
	Message selectMessageByMessageId(int messageId);
	
	// day로 메시지 조회
	Message selectMessageByDay(Map<String, String> info);
	
	// 메시지 수정
	int updateMessage(Message message);
	
	// id로 메시지 삭제
	int deleteMessageByMessageId(int messageId);
	
	// 랜덤 메시지 가져오기
	Message searchRandomMessage(int randomNumber);
}
