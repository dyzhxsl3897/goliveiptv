package com.zhongdan.lobby.bl.services;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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

		if (files != null) {
			allGames = Arrays.stream(files).filter(file -> {
				if (file.getName().endsWith(".jar")) {
					String fileNameNoExt = file.getName().substring(0, file.getName().lastIndexOf("."));

					boolean isAnyMatched = Arrays.stream(files).anyMatch(f -> {
						if (f.getName().endsWith(".jad")) {
							String fNameNoExt = f.getName().substring(0, f.getName().lastIndexOf("."));
							if (fNameNoExt.equals(fileNameNoExt)) {
								return true;
							}
						}
						return false;
					});

					return isAnyMatched;
				}

				return false;
			}).map(file -> file.getName().substring(0, file.getName().lastIndexOf("."))).collect(Collectors.toList());
		}

		return allGames;
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
