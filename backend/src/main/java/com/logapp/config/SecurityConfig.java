package com.logapp.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration

public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	// FIELDS
	
	private static final String[] PUBLIC_MATCHERS_GET = { "/api/logs/**" };
	private static final String[] PUBLIC_MATCHERS_POST = { "/api/logs/**" };
	
	// OVERRIDED FUNCTIONS
	
	@Override
	protected void configure (HttpSecurity http) throws Exception {
		http.cors ().and ().csrf ().disable ();
		http.authorizeRequests ()
			.antMatchers (HttpMethod.GET, PUBLIC_MATCHERS_GET).permitAll ()
			.antMatchers (HttpMethod.POST, PUBLIC_MATCHERS_POST).permitAll ();
		
		http.sessionManagement ().sessionCreationPolicy (SessionCreationPolicy.STATELESS);
	}
	
	// BEANS
	
	@Bean
	protected CorsConfigurationSource corsConfigurationSource () {
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource ();
		CorsConfiguration configuration = new CorsConfiguration ().applyPermitDefaultValues ();
		configuration.setAllowedMethods (Arrays.asList ("POST", "GET", "PUT", "DELETE", "OPTIONS"));
		configuration.setExposedHeaders (Arrays.asList ("Location"));
		source.registerCorsConfiguration ("/**", configuration);
		return source;
	}

}
