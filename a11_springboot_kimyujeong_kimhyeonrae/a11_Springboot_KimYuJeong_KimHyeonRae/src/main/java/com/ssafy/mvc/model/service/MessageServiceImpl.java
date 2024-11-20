package com.ssafy.mvc.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.ssafy.mvc.model.dao.MessageDao;
import com.ssafy.mvc.model.dto.Message;

@Service
public class MessageServiceImpl implements MessageService {
	
	private final MessageDao dao;

	public MessageServiceImpl(MessageDao dao) {
		this.dao = dao;
	}

	@Override
	public boolean registMessage(Message message) {
		return dao.insertMessage(message) > 0;
	}

	@Override
	public List<Message> searchAllMessage(String receiver) {
		return dao.selectAllMessage(receiver);
	}

	@Override
	public Message searchMessageByMessageId(int messageId) {
		return dao.selectMessageByMessageId(messageId);
	}

	@Override
	public Message searchMessageByDay(Map<String, String> info) {
		return dao.selectMessageByDay(info);
	}
	
	@Override
	public boolean modifyMessage(Message message) {
		return dao.updateMessage(message) > 0;
	}

	@Override
	public boolean removeMessageByMessageId(int messageId) {
		return dao.deleteMessageByMessageId(messageId) > 0;
	}

	@Override
	public Message createRandomMessage(int randomNumber) {
		return dao.searchRandomMessage(randomNumber);
	}

}
