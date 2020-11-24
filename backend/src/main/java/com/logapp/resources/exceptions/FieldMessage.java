package com.logapp.resources.exceptions;

import java.io.Serializable;

public class FieldMessage implements Serializable {

	// FIELDS

	private static final long serialVersionUID = 1L;
	private String field;
	private String message;

	// CONSTRUCTORS

	public FieldMessage () {}
	public FieldMessage (String field, String message) {
		super ();
		this.field = field;
		this.message = message;
	}

	// GETTERS / SETTERS

	public String getField () {
		return field;
	}

	public void setField (String field) {
		this.field = field;
	}

	public String getMessage () {
		return message;
	}

	public void setMessage (String message) {
		this.message = message;
	}
}
