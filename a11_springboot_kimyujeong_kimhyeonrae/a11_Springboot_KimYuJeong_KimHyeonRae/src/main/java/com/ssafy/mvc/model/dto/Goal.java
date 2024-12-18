package com.ssafy.mvc.model.dto;

public class Goal {
	int goalId;
	String email;
	String name;
	String startDate;
	int startDayOfWeek;
	String endDate;
	int day;
	int goalCode;
	String goalName;
	String goalDescription;
	String text;
	String pledge;
	
	public Goal() {
		// TODO Auto-generated constructor stub
	}

	public Goal(int goalId, String email, String name, String startDate, int startDayOfWeek,String endDate, int day, int goalCode, String goalName,
			String goalDescription, String text, String pledge) {
		this.goalId = goalId;
		this.email = email;
		this.name = name;
		this.startDate = startDate;
		this.startDayOfWeek = startDayOfWeek;
		this.endDate = endDate;
		this.day = day;
		this.goalCode = goalCode;
		this.goalName = goalName;
		this.goalDescription = goalDescription;
		this.text = text;
		this.pledge = pledge;
	}

	public int getGoalId() {
		return goalId;
	}

	public void setGoalId(int goalId) {
		this.goalId = goalId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public int getStartDayOfWeek() {
		return startDayOfWeek;
	}

	public void setStartDayOfWeek(int startDayOfWeek) {
		this.startDayOfWeek = startDayOfWeek;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public int getDay() {
		return day;
	}

	public void setDay(int day) {
		this.day = day;
	}

	public int getGoalCode() {
		return goalCode;
	}

	public void setGoalCode(int goalCode) {
		this.goalCode = goalCode;
	}

	public String getGoalName() {
		return goalName;
	}

	public void setGoalName(String goalName) {
		this.goalName = goalName;
	}

	public String getGoalDescription() {
		return goalDescription;
	}

	public void setGoalDescription(String goalDescription) {
		this.goalDescription = goalDescription;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getPledge() {
		return pledge;
	}

	public void setPledge(String pledge) {
		this.pledge = pledge;
	}

	@Override
	public String toString() {
		return "Goal [goalId=" + goalId + ", email=" + email + ", name=" + name + ", startDate=" + startDate
				+ ", startDayOfWeek=" + startDayOfWeek + ", endDate=" + endDate + ", day=" + day + ", goalCode="
				+ goalCode + ", goalName=" + goalName + ", goalDescription=" + goalDescription + ", text=" + text
				+ ", pledge=" + pledge + "]";
	}
	
}
