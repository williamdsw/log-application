package com.logapp.resources;

import java.net.URI;
import java.sql.Timestamp;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.logapp.domain.Log;
import com.logapp.domain.dto.ILogFieldsDTO;
import com.logapp.domain.dto.LogDTO;
import com.logapp.domain.dto.LogNewDTO;
import com.logapp.services.LogService;
import com.logapp.utils.FileUtils;

@RestController
@RequestMapping (path = "/api/logs")
public class LogResource {
	
	// FIELDS
	
	@Autowired
	private LogService logService;
	
	// ENDPOINTS
	
	// --> POSTS
	
	@PostMapping ()
	public ResponseEntity<Void> insert (@Valid @RequestBody LogNewDTO dto) {
		Log log = logService.fromDto (dto);
		log = logService.insert (log);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest ().path ("/{id}").buildAndExpand (log.getId ()).toUri ();
		return ResponseEntity.created (location).build ();
	}
	
	@PostMapping (path = "/batch")
	public ResponseEntity<Void> insertBatch (@RequestParam (name = "file") MultipartFile[] files) {
		
		for (MultipartFile file : files) {
			StringBuilder content = FileUtils.readContentFromMultipart (file);
			List<Log> logs = logService.buildListFromFile(content.toString());
			logService.insertBatch(logs);
		}
		
		return ResponseEntity.noContent().build();
	}
	
	// --> FIND
	
	@GetMapping ()
	public ResponseEntity<Page<LogDTO>> findAll 
	(
		@RequestParam (value = "pageNumber", defaultValue = "0") Integer pageNumber,
		@RequestParam (value = "linesPerPage", defaultValue = "25") Integer linesPerPage
	) 
	{
		Page<Log> logs = logService.findAll (pageNumber, linesPerPage);
		Page<LogDTO> listDto = logs.map (log -> new LogDTO (log));
		return ResponseEntity.ok ().body (listDto);
	}
	
	@GetMapping (path = "/ip")
	public ResponseEntity<Page<LogDTO>> findAllByIp 
	(
		@RequestParam (value = "value", defaultValue = "") String ip,
		@RequestParam (value = "pageNumber", defaultValue = "0") Integer pageNumber,
		@RequestParam (value = "linesPerPage", defaultValue = "25") Integer linesPerPage
	) 
	{
		Page<Log> logs = logService.findAllByIp (ip, pageNumber, linesPerPage);
		Page<LogDTO> listDto = logs.map (log -> new LogDTO (log));
		return ResponseEntity.ok ().body (listDto);
	}
	
	@GetMapping (path = "/data")
	public ResponseEntity<Page<LogDTO>> findAllByDataBetween
	(
		@RequestParam (value = "start", defaultValue = "") String start,
		@RequestParam (value = "end", defaultValue = "") String end,
		@RequestParam (value = "pageNumber", defaultValue = "0") Integer pageNumber,
		@RequestParam (value = "linesPerPage", defaultValue = "25") Integer linesPerPage
	) 
	{
		Page<Log> logs = logService.findAllByDataBetween (Timestamp.valueOf (start), Timestamp.valueOf (end), pageNumber, linesPerPage);
		Page<LogDTO> pageDto = logs.map (log -> new LogDTO (log));
		return ResponseEntity.ok ().body (pageDto);
	}
	
	// --> AGGREGATION

	@GetMapping (path = "/ten-most-requests-by-ip")
	public ResponseEntity<List<ILogFieldsDTO>> getTenMostRequestsByIp () 
	{
		List<ILogFieldsDTO> listDto = logService.getTenMostAccessedIps ();
		return ResponseEntity.ok ().body (listDto);
	}

	@GetMapping (path = "/ten-most-requests-by-user-agent")
	public ResponseEntity<List<ILogFieldsDTO>> getTenMostRequestsByUserAgent () 
	{
		List<ILogFieldsDTO> listDto = logService.getTenMostRequestsByUserAgent ();
		return ResponseEntity.ok ().body (listDto);
	}

	@GetMapping (path = "/ten-most-requests-by-data")
	public ResponseEntity<List<ILogFieldsDTO>> getTenMostRequestByData () 
	{
		List<ILogFieldsDTO> listDto = logService.getTenMostRequestByData ();
		return ResponseEntity.ok ().body (listDto);
	}

	@GetMapping (path = "/number-of-requests-ip")
	public ResponseEntity<ILogFieldsDTO> getNumberOfRequestsByIp (@RequestParam (value = "value", defaultValue = "") String ip)
	{		
		ILogFieldsDTO dto = logService.getNumberOfRequestsByIp (ip);
		return ResponseEntity.ok ().body (dto);
	}

	@GetMapping (path = "/number-of-requests-user-agent")
	public ResponseEntity<ILogFieldsDTO> getNumberOfRequestsByUserAgent (@RequestParam (value = "value", defaultValue = "") String userAgent)
	{		
		ILogFieldsDTO dto = logService.getNumberOfRequestsByUserAgent (userAgent);
		return ResponseEntity.ok ().body (dto);
	}

	@GetMapping (path = "/number-of-requests-data")
	public ResponseEntity<ILogFieldsDTO> getNumberOfRequestsByDataBetween
	(
		@RequestParam (value = "start", defaultValue = "") String start,
		@RequestParam (value = "end", defaultValue = "") String end
	)
	{		
		ILogFieldsDTO dto = logService.getNumberOfRequestsByDataBetween (Timestamp.valueOf (start), Timestamp.valueOf (end));
		return ResponseEntity.ok ().body (dto);
	}
}
