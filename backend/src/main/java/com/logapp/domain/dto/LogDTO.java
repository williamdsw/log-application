package com.logapp.domain.dto;

import java.io.Serializable;
import java.sql.Timestamp;

import com.logapp.domain.Log;

public class LogDTO implements Serializable {

	// FIELDS

	private static final long serialVersionUID = 1L;
	private Integer id;
	private Timestamp data;
	private String ip;
	private String request;
	private Integer status;
	private String userAgent;

	// CONSTRUCTOR

	public LogDTO() {}
	public LogDTO(Log log) {
		super();
		this.id = log.getId();
		this.data = log.getData();
		this.ip = log.getIp();
		this.request = log.getRequest();
		this.status = log.getStatus();
		this.userAgent = log.getUserAgent();
	}

	// GETTERS / SETTERS

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Timestamp getData() {
		return data;
	}

	public void setData(Timestamp data) {
		this.data = data;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getRequest() {
		return request;
	}

	public void setRequest(String httpMethod) {
		this.request = httpMethod;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getUserAgent() {
		return userAgent;
	}

	public void setUserAgent(String userAgent) {
		this.userAgent = userAgent;
	}
}
