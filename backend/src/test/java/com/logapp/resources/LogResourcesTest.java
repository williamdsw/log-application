package com.logapp.resources;

import java.io.File;
import java.net.URI;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import com.logapp.domain.dto.LogNewDTO;

@ExtendWith (SpringExtension.class)
@SpringBootTest (webEnvironment = WebEnvironment.RANDOM_PORT)
@EnableAutoConfiguration
@ActiveProfiles (profiles = "test")
public class LogResourcesTest {
	
	// FIELDS
	
	@Autowired private TestRestTemplate restTemplate;
	@LocalServerPort private int port;
	
	private final String INSERT_URL = "/api/logs";
	private final String INSERT_BATCH_URL = "/api/logs/batch";
	private final String FIND_ALL_URL = "/api/logs";
	private final String FIND_ALL_BY_IP_URL = "/api/logs/ip";
	private final String FIND_ALL_BY_DATA_BETWEEN_URL = "/api/logs/data";
	private final String TEN_MOST_REQUESTS_BY_IP_URL = "/api/logs/ten-most-requests-by-ip";
	private final String TEN_MOST_REQUESTS_BY_USER_AGENT_URL = "/api/logs/ten-most-requests-by-user-agent";
	private final String TEN_MOST_REQUESTS_BY_DATA_URL = "/api/logs/ten-most-requests-by-data";
	private final String GET_NUMBER_OF_REQUESTS_BY_IP_URL = "/api/logs/number-of-requests-ip";
	private final String GET_NUMBER_OF_REQUESTS_BY_USER_AGENT_URL = "/api/logs/number-of-requests-user-agent";
	private final String GET_NUMBER_OF_REQUESTS_BY_DATA_BETWEEN_URL = "/api/logs/number-of-requests-data";
	
	// TESTS
	
	// --> INSERT_URL = "/api/logs"
	
	@Test
	public void createLogShouldReturnStatus201 () {
		LogNewDTO dto = new LogNewDTO ();
		dto.setId (null);
		dto.setData ("2019-01-01 00:00:11.763");
		dto.setIp ("192.168.234.82");
		dto.setRequest ("GET / HTTP/1.1");
		dto.setStatus (HttpStatus.OK.value ());
		dto.setUserAgent ("swcd (unknown version) CFNetwork/808.2.16 Darwin/15.6.0");
		
		HttpEntity<LogNewDTO> entity = new HttpEntity<>(dto);
		ResponseEntity<String> response = restTemplate.exchange (INSERT_URL, HttpMethod.POST, entity, String.class);
		Assertions.assertEquals (response.getStatusCodeValue (), HttpStatus.CREATED.value ());
		System.out.println(response.getHeaders().getLocation());
	}
	
	@Test
	public void createLogWithInvalidDataShouldReturnStatus422 () {
		LogNewDTO dto = new LogNewDTO ();
		dto.setId (null);
		dto.setData (null);
		dto.setIp (null);
		dto.setRequest (null);
		dto.setStatus (null);
		dto.setUserAgent (null);
		
		HttpEntity<LogNewDTO> entity = new HttpEntity<>(dto);
		ResponseEntity<String> response = restTemplate.exchange (INSERT_URL, HttpMethod.POST, entity, String.class);
		Assertions.assertEquals (response.getStatusCodeValue (), HttpStatus.UNPROCESSABLE_ENTITY.value ());
		System.out.println(response.getBody());
	}
	
	// --> INSERT_BATCH_URL = "/api/logs/batch"
	
	@Test
	public void createBatchLogShouldReturnStatus204 () {
		
		// Headers
		HttpHeaders headers = new HttpHeaders ();
		headers.clear ();
		headers.setContentType (MediaType.MULTIPART_FORM_DATA);
		
		// Multipart
		MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
		File file = new File ("files/access.log");
		body.add ("file", new FileSystemResource (file));
		
		HttpEntity<MultiValueMap<String, Object>> entity = new HttpEntity<> (body, headers);
		ResponseEntity<String> response = restTemplate.exchange (INSERT_BATCH_URL, HttpMethod.POST, entity, String.class);
		Assertions.assertEquals (response.getStatusCodeValue (), HttpStatus.NO_CONTENT.value ());
		System.out.println(response.getBody());
	}
	
	@Test
	public void createBatchWithInvalidFileLogShouldReturnStatus400 () {
		
		// Headers
		HttpHeaders headers = new HttpHeaders ();
		headers.clear ();
		headers.setContentType (MediaType.MULTIPART_FORM_DATA);
		
		// Multipart
		MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
		File file = new File ("files/access.png");
		body.add ("file", new FileSystemResource (file));
		
		HttpEntity<MultiValueMap<String, Object>> entity = new HttpEntity<> (body, headers);
		ResponseEntity<String> response = restTemplate.exchange (INSERT_BATCH_URL, HttpMethod.POST, entity, String.class);
		Assertions.assertEquals (response.getStatusCodeValue (), HttpStatus.BAD_REQUEST.value ());
		System.out.println(response.getBody());
	}
	
	@Test
	public void createBatchWithEmptyFileLogShouldReturnStatus400 () {
		
		// Headers
		HttpHeaders headers = new HttpHeaders ();
		headers.clear ();
		headers.setContentType (MediaType.MULTIPART_FORM_DATA);
		
		// Multipart
		MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
		File file = new File ("files/access-empty.log");
		body.add ("file", new FileSystemResource (file));
		
		HttpEntity<MultiValueMap<String, Object>> entity = new HttpEntity<> (body, headers);
		ResponseEntity<String> response = restTemplate.exchange (INSERT_BATCH_URL, HttpMethod.POST, entity, String.class);
		Assertions.assertEquals (response.getStatusCodeValue (), HttpStatus.BAD_REQUEST.value ());
		System.out.println(response.getBody());
	}
	
	@Test
	public void createBatchWithInvalidDataLogShouldReturnStatus400 () {
		
		// Headers
		HttpHeaders headers = new HttpHeaders ();
		headers.clear ();
		headers.setContentType (MediaType.MULTIPART_FORM_DATA);
		
		// Multipart
		MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
		File file = new File ("files/access-invalid.log");
		body.add ("file", new FileSystemResource (file));
		
		HttpEntity<MultiValueMap<String, Object>> entity = new HttpEntity<> (body, headers);
		ResponseEntity<String> response = restTemplate.exchange (INSERT_BATCH_URL, HttpMethod.POST, entity, String.class);
		Assertions.assertEquals (response.getStatusCodeValue (), HttpStatus.BAD_REQUEST.value ());
		System.out.println(response.getBody());
	}
	
	// --> FIND_ALL_URL = "/api/logs"
	
	@Test
	public void findAllLogsShouldReturnStatus200 () {
		
		// Paramaters
		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString (FIND_ALL_URL);
		builder.queryParam ("pageNumber", "0");
		builder.queryParam ("linesPerPage", "10");
		URI location = builder.build().toUri();
		
		ResponseEntity<String> response = restTemplate.exchange (location, HttpMethod.GET, null, String.class);
		Assertions.assertEquals (response.getStatusCodeValue (), HttpStatus.OK.value ());
		System.out.println(response.getBody());
	}
	
	// --> FIND_ALL_URL = "/api/logs"
	
	@Test
	public void findAllLogsByIpShouldReturnStatus200 () {
		
		// Paramaters
		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString (FIND_ALL_BY_IP_URL);
		builder.queryParam ("value", "192.168.235.173");
		builder.queryParam ("pageNumber", "0");
		builder.queryParam ("linesPerPage", "10");
		URI location = builder.build().toUri();
		
		ResponseEntity<String> response = restTemplate.exchange (location, HttpMethod.GET, null, String.class);
		Assertions.assertEquals (response.getStatusCodeValue (), HttpStatus.OK.value ());
		System.out.println(response.getBody());
	}

	// --> FIND_ALL_BY_DATA_BETWEEN_URL = "/api/logs/data"
	
	@Test
	public void findAllLogsByDataBetweenShouldReturnStatus200 () {
		
		// Paramaters
		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString (FIND_ALL_BY_DATA_BETWEEN_URL);
		builder.queryParam ("start", "2020-01-01 00:00:00");
		builder.queryParam ("end", "2020-06-01 00:00:00");
		builder.queryParam ("pageNumber", "0");
		builder.queryParam ("linesPerPage", "10");
		URI location = builder.build().toUri();
		
		ResponseEntity<String> response = restTemplate.exchange (location, HttpMethod.GET, null, String.class);
		Assertions.assertEquals (response.getStatusCodeValue (), HttpStatus.OK.value ());
		System.out.println(response.getBody());
	}
	
	@Test
	public void findAllLogsByDataBetweenWhenInvalidDataShouldReturnStatus500 () {
		
		// Paramaters
		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString (FIND_ALL_BY_DATA_BETWEEN_URL);
		builder.queryParam ("start", "2020-01-01");
		builder.queryParam ("end", "2020-06-01");
		builder.queryParam ("pageNumber", "0");
		builder.queryParam ("linesPerPage", "10");
		URI location = builder.build().toUri();
		
		ResponseEntity<String> response = restTemplate.exchange (location, HttpMethod.GET, null, String.class);
		Assertions.assertEquals (response.getStatusCodeValue (), HttpStatus.BAD_REQUEST.value ());
		System.out.println(response.getBody());
	}
	
	// --> TEN_MOST_REQUESTS_BY_IP_URL = "/api/logs/ten-most-requests-by-ip"
	
	@Test
	public void getTenMostRequestsByIpShouldReturnStatus200 () {
		ResponseEntity<String> response = restTemplate.exchange (TEN_MOST_REQUESTS_BY_IP_URL, HttpMethod.GET, null, String.class);
		Assertions.assertEquals (response.getStatusCodeValue (), HttpStatus.OK.value ());
		System.out.println(response.getBody());
	}
	
	// --> TEN_MOST_REQUESTS_BY_USER_AGENT_URL = "/api/logs/ten-most-requests-by-user-agent"
	
	@Test
	public void getTenMostRequestsByUserAgentShouldReturnStatus200 () {
		ResponseEntity<String> response = restTemplate.exchange (TEN_MOST_REQUESTS_BY_USER_AGENT_URL, HttpMethod.GET, null, String.class);
		Assertions.assertEquals (response.getStatusCodeValue (), HttpStatus.OK.value ());
		System.out.println(response.getBody());
	}
	
	// --> TEN_MOST_REQUESTS_BY_DATA_URL = "/api/logs/ten-most-requests-by-data"
	
	@Test
	public void getTenMostRequestsByDataShouldReturnStatus200 () {
		ResponseEntity<String> response = restTemplate.exchange (TEN_MOST_REQUESTS_BY_DATA_URL, HttpMethod.GET, null, String.class);
		Assertions.assertEquals (response.getStatusCodeValue (), HttpStatus.OK.value ());
		System.out.println(response.getBody());
	}
	
	// --> GET_NUMBER_OF_REQUESTS_BY_IP_URL = "/api/logs/number-of-requests-ip"
	
	@Test
	public void getNumberOfRequestsByIpShouldReturnStatus200 () {
		
		// Paramaters
		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString (GET_NUMBER_OF_REQUESTS_BY_IP_URL);
		builder.queryParam ("value", "192.168.235.173");
		URI location = builder.build().toUri();
		
		ResponseEntity<String> response = restTemplate.exchange (location, HttpMethod.GET, null, String.class);
		Assertions.assertEquals (response.getStatusCodeValue (), HttpStatus.OK.value ());
		System.out.println(response.getBody());
	}
	
	// --> GET_NUMBER_OF_REQUESTS_BY_USER_AGENT_URL = "/api/logs/number-of-requests-user-agent"
	
	@Test
	public void getNumberOfRequestsByUserAgentShouldReturnStatus200 () {
		
		// Paramaters
		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString (GET_NUMBER_OF_REQUESTS_BY_USER_AGENT_URL);
		builder.queryParam ("value", "Android");
		URI location = builder.build().toUri();
		
		ResponseEntity<String> response = restTemplate.exchange (location, HttpMethod.GET, null, String.class);
		Assertions.assertEquals (response.getStatusCodeValue (), HttpStatus.OK.value ());
		System.out.println(response.getBody());
	}
	
	// --> GET_NUMBER_OF_REQUESTS_BY_DATA_BETWEEN_URL = "/api/logs/number-of-requests-data"
	
	@Test
	public void getNumberOfRequestsByDataBetweenShouldReturnStatus200 () {
		
		// Paramaters
		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString (GET_NUMBER_OF_REQUESTS_BY_DATA_BETWEEN_URL);
		builder.queryParam ("start", "2020-01-01 00:00:00");
		builder.queryParam ("end", "2020-06-01 00:00:00");
		URI location = builder.build().toUri();
		
		ResponseEntity<String> response = restTemplate.exchange (location, HttpMethod.GET, null, String.class);
		Assertions.assertEquals (response.getStatusCodeValue (), HttpStatus.OK.value ());
		System.out.println(response.getBody());
	}
	
	@Test
	public void getNumberOfRequestsByDataBetweenWhenInvalidDataShouldReturnStatus400 () {
		
		// Paramaters
		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString (GET_NUMBER_OF_REQUESTS_BY_DATA_BETWEEN_URL);
		builder.queryParam ("start", "2020-01-01");
		builder.queryParam ("end", "2020-06-01");
		URI location = builder.build().toUri();
		
		ResponseEntity<String> response = restTemplate.exchange (location, HttpMethod.GET, null, String.class);
		Assertions.assertEquals (response.getStatusCodeValue (), HttpStatus.BAD_REQUEST.value ());
		System.out.println(response.getBody());
	}
}
