package com.logapp.domain.dto;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

public class LogNewDTO implements Serializable {

	// FIELDS

	private static final long serialVersionUID = 1L;
	private Integer id;

	@NotNull(message = "Data is required")
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS")
	private String data;

	@NotNull(message = "IP is required")
	private String ip;

	@NotNull(message = "Request is required")
	private String request;

	@NotNull(message = "Status is required")
	private Integer status;

	@NotNull(message = "User Agent is required")
	private String userAgent;

	// CONSTRUCTOR

	public LogNewDTO() {
	}

	// GETTERS / SETTERS

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
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

	public void setRequest(String request) {
		this.request = request;
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
