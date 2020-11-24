package com.logapp.services;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.logapp.domain.Log;
import com.logapp.domain.dto.ILogFieldsDTO;
import com.logapp.domain.dto.LogNewDTO;
import com.logapp.repositories.ILogRepository;
import com.logapp.services.exception.FileException;

@Service
public class LogService {

	// FIELDS

	@Autowired
	private ILogRepository repository;

	// HELPER FUNCTIONS

	public Log insert (Log log) {
		log = repository.save (log);
		return log;
	}
	
	public void insertBatch (List<Log> logs) {
		 repository.saveAll (logs);
	}
	
	public Page<Log> findAll (Integer pageNumber, Integer linesPerPage) {
		PageRequest pageRequest = PageRequest.of (pageNumber, linesPerPage);
		return repository.findAll (pageRequest);
	}
	
	public Page<Log> findAllByIp (String ip, Integer pageNumber, Integer linesPerPage) {
		PageRequest pageRequest = PageRequest.of (pageNumber, linesPerPage);
		return repository.findAllByIpContaining (ip, pageRequest);
	}
	
	public Page<Log> findAllByDataBetween (Timestamp start, Timestamp end, Integer pageNumber, Integer linesPerPage) {
		PageRequest pageRequest = PageRequest.of (pageNumber, linesPerPage);
		return repository.findAllByDataBetween (start, end, pageRequest);
	}
	
	public List<ILogFieldsDTO> getTenMostAccessedIps () {
		return repository.getTenMostRequestsByIp ();
	}
	
	public List<ILogFieldsDTO> getTenMostRequestsByUserAgent () {
		return repository.getTenMostRequestsByUserAgent ();
	}
	
	public List<ILogFieldsDTO> getTenMostRequestByData () {
		return repository.getTenMostRequestByData ();
	}
	
	public ILogFieldsDTO getNumberOfRequestsByIp (String ip) {
		return repository.getNumberOfRequestsByIp (ip);
	}

	public ILogFieldsDTO getNumberOfRequestsByUserAgent (String userAgent) {
		return repository.getNumberOfRequestsByUserAgent (userAgent);
	}
	
	public ILogFieldsDTO getNumberOfRequestsByDataBetween (Timestamp start, Timestamp end) {
		return repository.getNumberOfRequestsByDataBetween (start, end);
	}
	
	public void checkFileContent (String fileContent) {
		if (fileContent.isEmpty ()) {
			throw new FileException ("File is empty!");
		}

		if (!fileContent.contains ("|")) {
			throw new FileException ("Invalid file!");
		}
	}
	
	public List<Log> buildListFromFile (String fileContent) {
		
		checkFileContent (fileContent);
		
		List<Log> logs = new ArrayList<> ();
		
		if (!fileContent.isEmpty () && fileContent.contains ("|")) {
			String[] lines = fileContent.split ("\n");
			for (String line : lines) {
				String[] columns = line.split ("\\|");
				
				if (columns.length != 5) {
					throw new FileException ("Invalid data format!");
				}
				
				if (columns.length == 5) {
					Log log = new Log ();
					
					log.setId (null);
					log.setData (Timestamp.valueOf(columns[0]));
					log.setIp (columns[1]);
					log.setRequest (columns[2]);
					log.setStatus (Integer.parseInt(columns[3]));
					log.setUserAgent (columns[4]);
					
					logs.add (log);
				}				
			}
		}
		
		return logs;
	}

	public Log fromDto (LogNewDTO dto) {
		Log log = new Log ();

		log.setId (null);
		log.setData (Timestamp.valueOf (dto.getData ()));
		log.setIp (dto.getIp ());
		log.setRequest (dto.getRequest ());
		log.setStatus (dto.getStatus ());
		log.setUserAgent (dto.getUserAgent ());

		return log;
	}

}
