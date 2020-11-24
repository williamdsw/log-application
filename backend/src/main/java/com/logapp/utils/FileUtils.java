package com.logapp.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.io.FilenameUtils;
import org.springframework.web.multipart.MultipartFile;

import com.logapp.services.exception.FileException;

public class FileUtils {
	
	// FIELDS
	
	private static final List<String> EXTENSIONS = Arrays.asList ("txt", "log");

	// HELPER FUNCTIONS
	
	private static void checkMultipartExtension (MultipartFile file) {
		String extension = FilenameUtils.getExtension (file.getOriginalFilename());
		extension = extension.toLowerCase ();
		if (!EXTENSIONS.contains (extension)) {
			throw new FileException (String.format ("Only %s files are allowed!", EXTENSIONS.toString ()));
		}
	}
	
	public static StringBuilder readContentFromMultipart (MultipartFile file) {
		
		checkMultipartExtension (file);
		
		StringBuilder content = new StringBuilder ();
		
		try {
			try (InputStreamReader inputReader = new InputStreamReader (file.getInputStream ())) {
				try (BufferedReader bufferedReader = new BufferedReader (inputReader)) {
					String currentLine = "";
					
					while ((currentLine = bufferedReader.readLine ()) != null) {
						content.append (currentLine);
						content.append ("\n");
					}
				}
			}
		} 
		catch (IOException e) {
			System.out.println(e.getMessage());
		}
		
		return content;
	}
}
