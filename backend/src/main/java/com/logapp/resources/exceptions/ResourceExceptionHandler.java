package com.logapp.resources.exceptions;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

import com.logapp.services.exception.DataIntegrityException;
import com.logapp.services.exception.FileException;

@ControllerAdvice
public class ResourceExceptionHandler {
	
	// EXCEPTION HANDLERS
	
	@ExceptionHandler (FileException.class)
	public ResponseEntity<StandardError> handleFileException (FileException exception, HttpServletRequest request) {
		HttpStatus status = HttpStatus.BAD_REQUEST;
		StandardError error = new StandardError (System.currentTimeMillis (), status.value (), "File Error", exception.getMessage (), request.getRequestURI ());
		return ResponseEntity.status (status).body (error);
	}
	
	@ExceptionHandler (DataIntegrityException.class)
	public ResponseEntity<StandardError> handleDataIntegrityException (DataIntegrityException exception, HttpServletRequest request) {
		HttpStatus status = HttpStatus.BAD_REQUEST;
		StandardError error = new StandardError (System.currentTimeMillis (), status.value (), "Data Integrity", exception.getMessage (), request.getRequestURI ());
		return ResponseEntity.status (status).body (error);
	}
	
	@ExceptionHandler (MethodArgumentNotValidException.class)
	public ResponseEntity<ValidationError> handleMethodArgumentNotValidaException (MethodArgumentNotValidException exception, HttpServletRequest request) {
		HttpStatus status = HttpStatus.UNPROCESSABLE_ENTITY;
		ValidationError error = new ValidationError (System.currentTimeMillis (), status.value (), "Validation Error", exception.getMessage (), request.getRequestURI ());
		
		exception.getBindingResult ().getFieldErrors ().forEach (fieldError -> {
			error.addError (fieldError.getField (), fieldError.getDefaultMessage ());
		});
		
		return ResponseEntity.status (status).body (error);
	}
	
	@ExceptionHandler (MissingServletRequestPartException.class)
	public ResponseEntity<StandardError> handleMissingServletRequestPartException (MissingServletRequestPartException exception, HttpServletRequest request) {
		HttpStatus status = HttpStatus.BAD_REQUEST;
		StandardError error  = new StandardError (System.currentTimeMillis (), status.value (), "Missing Part", exception.getMessage (), request.getRequestURI ());
		return ResponseEntity.status (status).body (error);
	}
	
	@ExceptionHandler (IllegalArgumentException.class)
	public ResponseEntity<StandardError> handleIllegalArgumentException (IllegalArgumentException exception, HttpServletRequest request) {
		HttpStatus status = HttpStatus.BAD_REQUEST;
		StandardError error  = new StandardError (System.currentTimeMillis (), status.value (), "Illegal Argument", exception.getMessage (), request.getRequestURI ());
		return ResponseEntity.status (status).body (error);
	}
}
