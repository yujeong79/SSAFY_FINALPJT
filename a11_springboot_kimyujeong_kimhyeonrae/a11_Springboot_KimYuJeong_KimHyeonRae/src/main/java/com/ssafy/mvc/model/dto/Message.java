package com.ssafy.mvc.model.dto;

public class Message {
	int messageId;
	int goalId;
	String receiver;
	String sender;
	String senderNickname;
	String content;
	int day;
	int stickerId;
	
	public Message() {
		// TODO Auto-generated constructor stub
	}

	public Message(int messageId, String receiver, String sender, String senderNickname, int goalId, String content, int day, int stickerId) {
		this.messageId = messageId;
		this.receiver = receiver;
		this.sender = sender;
		this.senderNickname = senderNickname;
		this.goalId = goalId;
		this.content = content;
		this.day = day;
		this.stickerId = stickerId;
	}

	public int getMessageId() {
		return messageId;
	}

	public void setMessageId(int messageId) {
		this.messageId = messageId;
	}

	public String getReceiver() {
		return receiver;
	}

	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}
	
	public String getSenderNickname() {
		return senderNickname;
	}

	public void setSenderNickname(String senderNickname) {
		this.senderNickname = senderNickname;
	}

	public int getGoalId() {
		return goalId;
	}

	public void setGoalId(int goalId) {
		this.goalId = goalId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getDay() {
		return day;
	}

	public void setDay(int day) {
		this.day = day;
	}

	public int getStickerId() {
		return stickerId;
	}

	public void setStickerId(int stickerId) {
		this.stickerId = stickerId;
	}

	@Override
	public String toString() {
		return "Message [messageId=" + messageId + ", goalId=" + goalId + ", receiver=" + receiver + ", sender="
				+ sender + ", senderNickname=" + senderNickname + ", content=" + content + ", day=" + day
				+ ", stickerId=" + stickerId + "]";
	}
	
}
