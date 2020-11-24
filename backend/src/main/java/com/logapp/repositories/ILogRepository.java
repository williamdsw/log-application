package com.logapp.repositories;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.logapp.domain.Log;
import com.logapp.domain.dto.ILogFieldsDTO;


@Repository
public interface ILogRepository extends JpaRepository<Log, Integer> {
	
	// --> FIND
	
	@Transactional (readOnly = true)
	public Page<Log> findAllByIpContaining (String ip, Pageable pageRequest);
	
	@Transactional (readOnly = true)
	public Page<Log> findAllByDataBetween (Timestamp start, Timestamp end, Pageable pageRequest);
	
	// --> AGGREGATION
	
	@Transactional (readOnly = true)
	@Query (value = " SELECT max(data) as hour, ip, max(user_agent) as userAgent, COUNT(*) as count FROM log GROUP BY ip ORDER BY COUNT(*) DESC LIMIT 10 ", nativeQuery = true)
	public List<ILogFieldsDTO> getTenMostRequestsByIp ();
	
	@Transactional (readOnly = true)
	@Query (value = " SELECT max(data) as hour, max(ip) as ip, user_agent as userAgent, COUNT(*) as count FROM log GROUP BY user_agent ORDER BY COUNT(*) DESC LIMIT 10 ", nativeQuery = true)
	public List<ILogFieldsDTO> getTenMostRequestsByUserAgent ();
	
	@Transactional (readOnly = true)
	@Query (value = " SELECT substring (cast (data as varchar), 12, 8) as hour, max(ip) as ip, max(user_agent) as userAgent, COUNT(*) as count FROM log GROUP BY hour ORDER BY COUNT(*) DESC LIMIT 10 ", nativeQuery = true)
	public List<ILogFieldsDTO> getTenMostRequestByData ();
	
	@Transactional (readOnly = true)
	@Query (value = " SELECT max (l.data) as hour, max(l.ip) as ip, max(l.user_agent) as userAgent, COUNT(*) as count FROM Log l WHERE l.ip = ?1 ", nativeQuery = true)
	public ILogFieldsDTO getNumberOfRequestsByIp (String ip);
	
	@Transactional (readOnly = true)
	@Query (value = " SELECT max (l.data) as hour, max(l.ip) as ip, max(l.user_agent) as userAgent, COUNT(*) as count FROM Log l WHERE l.user_agent like %?1% ", nativeQuery = true)
	public ILogFieldsDTO getNumberOfRequestsByUserAgent (String ip);
	
	@Transactional (readOnly = true)
	@Query (value = " SELECT max (l.data) as hour, max(l.ip) as ip, max(l.user_agent) as userAgent, COUNT(*) as count FROM Log l WHERE l.data BETWEEN ?1 AND ?2 ", nativeQuery = true)
	public ILogFieldsDTO getNumberOfRequestsByDataBetween (Timestamp start, Timestamp end);	
}
