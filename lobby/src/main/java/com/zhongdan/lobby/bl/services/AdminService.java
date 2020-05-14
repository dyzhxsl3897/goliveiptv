package com.zhongdan.lobby.bl.services;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zhongdan.lobby.bl.utils.DefaultProperties;

@Service("com.zhongdan.lobby.bl.services.AdminService")
public class AdminService {

	private static final String GAME_PATH = "game.path";

	@Autowired
	private DefaultProperties defaultProperties;

	public List<String> getAllGames() {
		List<String> allGames = new ArrayList<>();

		String gamePath = defaultProperties.getProperty(GAME_PATH);
		File[] files = new File(gamePath).listFiles();

		if (files != null && files.length > 0) {
			for (File file : files) {
				if (file.isFile() && file.getName().endsWith(".jar")) {
					allGames.add(file.getName().substring(0, file.getName().length() - 4));
				}
			}
		}

		return allGames;
	}

	public List<String> getAllAvailableGames() {
		List<String> allGames = new ArrayList<>();

		String gamePath = defaultProperties.getProperty(GAME_PATH);
		File[] files = new File(gamePath).listFiles();

		for (File file : files) {
			if (file.isFile()) {
				String fileName = file.getName().substring(0, file.getName().length() - 4);
				String fileExtension = file.getName().substring(file.getName().length() - 3);
				if ("jar".equalsIgnoreCase(fileExtension) && findJadFile(files, fileName)) {
					allGames.add(file.getName().substring(0, file.getName().length() - 4));
				}
			}
		}

		return allGames;
	}

	private boolean findJadFile(File[] files, String fileName) {
		for (File file : files) {
			if (file.isFile()) {
				String fName = file.getName().substring(0, file.getName().length() - 4);
				String fExtension = file.getName().substring(file.getName().length() - 3);
				if ("jad".equalsIgnoreCase(fExtension) && fileName.equalsIgnoreCase(fName)) {
					return true;
				}
			}
		}
		return false;
	}

	public void uploadGames(InputStream uploadedInputStream, FormDataContentDisposition fileDetail) throws IOException {
		String gamePath = defaultProperties.getProperty(GAME_PATH);
		String fileName = fileDetail.getFileName();
		Files.deleteIfExists(Paths.get(gamePath + "/" + fileName));

		String uploadedFileLocation = gamePath + "/" + fileName;
		writeToFile(uploadedInputStream, uploadedFileLocation);
	}

	private void writeToFile(InputStream uploadedInputStream, String uploadedFileLocation) throws IOException {
		int read = 0;
		byte[] bytes = new byte[1024];

		try (OutputStream out = new FileOutputStream(new File(uploadedFileLocation))) {
			while ((read = uploadedInputStream.read(bytes)) != -1) {
				out.write(bytes, 0, read);
			}
			out.flush();
		}
	}

}
