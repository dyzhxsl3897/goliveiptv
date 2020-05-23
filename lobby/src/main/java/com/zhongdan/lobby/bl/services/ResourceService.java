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

import org.apache.commons.io.FileUtils;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zhongdan.lobby.bl.utils.DefaultProperties;

@Service("com.zhongdan.lobby.bl.services.ResourceService")
public class ResourceService {

	private static final String GAME_PATH = "game.path";
	private static final String IMAGE_PATH = "image.path";
	private static final String AUDIO_PATH = "audio.path";

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

	public List<String> getAllGameResrouces(String gameName) {
		List<String> allGameResrouces = new ArrayList<>();

		String imagePath = defaultProperties.getProperty(IMAGE_PATH);
		File[] imageFiles = new File(imagePath + File.separator + gameName).listFiles();
		String audioPath = defaultProperties.getProperty(AUDIO_PATH);
		File[] audioFiles = new File(audioPath + File.separator + gameName).listFiles();

		if (imageFiles != null) {
			for (File imageFile : imageFiles) {
				allGameResrouces.add(imageFile.getName());
			}
		}
		if (audioFiles != null) {
			for (File audioFile : audioFiles) {
				allGameResrouces.add(audioFile.getName());
			}
		}

		return allGameResrouces;
	}

	public void uploadGames(InputStream uploadedInputStream, FormDataContentDisposition fileDetail) throws IOException {
		String gamePath = defaultProperties.getProperty(GAME_PATH);
		String fileName = fileDetail.getFileName();
		Files.deleteIfExists(Paths.get(gamePath + "/" + fileName));

		String uploadedFileLocation = gamePath + "/" + fileName;
		writeToFile(uploadedInputStream, uploadedFileLocation);
	}

	public void deleteGame(String gameName) throws IOException {
		String gamePath = defaultProperties.getProperty(GAME_PATH);
		Files.deleteIfExists(Paths.get(gamePath + "/" + gameName + ".jad"));
		Files.deleteIfExists(Paths.get(gamePath + "/" + gameName + ".jar"));

		String imagePath = defaultProperties.getProperty(IMAGE_PATH);
		File[] imageFiles = new File(imagePath + File.separator + gameName).listFiles();
		String audioPath = defaultProperties.getProperty(AUDIO_PATH);
		File[] audioFiles = new File(audioPath + File.separator + gameName).listFiles();

		if (imageFiles != null) {
			for (File imageFile : imageFiles) {
				Files.deleteIfExists(imageFile.toPath());
			}
			Files.deleteIfExists(Paths.get(imagePath + File.separator + gameName));
		}
		if (audioFiles != null) {
			for (File audioFile : audioFiles) {
				Files.deleteIfExists(audioFile.toPath());
			}
			Files.deleteIfExists(Paths.get(audioPath + File.separator + gameName));
		}
	}

	public void uploadResource(String gameName, InputStream uploadedInputStream, FormDataContentDisposition fileDetail) throws IOException {
		String fileName = fileDetail.getFileName();
		if (fileName.endsWith(".wav")) {
			uploadAudioFile(gameName, uploadedInputStream, fileDetail);
		} else if (fileName.endsWith(".jpg") || fileName.endsWith(".png")) {
			uploadImageFile(gameName, uploadedInputStream, fileDetail);
		}
	}

	private void uploadImageFile(String gameName, InputStream uploadedInputStream, FormDataContentDisposition fileDetail) throws IOException {
		String fileName = fileDetail.getFileName();
		String imagePath = defaultProperties.getProperty(IMAGE_PATH) + "/" + gameName;
		Files.deleteIfExists(Paths.get(imagePath + "/" + fileName));

		String uploadedFileLocation = imagePath + "/" + fileName;
		writeToFile(uploadedInputStream, uploadedFileLocation);
	}

	private void uploadAudioFile(String gameName, InputStream uploadedInputStream, FormDataContentDisposition fileDetail) throws IOException {
		String fileName = fileDetail.getFileName();
		String audioPath = defaultProperties.getProperty(AUDIO_PATH) + "/" + gameName;
		Files.deleteIfExists(Paths.get(audioPath + "/" + fileName));

		String uploadedFileLocation = audioPath + "/" + fileName;
		writeToFile(uploadedInputStream, uploadedFileLocation);
	}

	public void deleteResource(String gameName, String[] resources) throws IOException {
		String imagePath = defaultProperties.getProperty(IMAGE_PATH) + "/" + gameName;
		String audioPath = defaultProperties.getProperty(AUDIO_PATH) + "/" + gameName;
		for (String res : resources) {
			if (res.endsWith(".jpg") || res.endsWith("png")) {
				Files.deleteIfExists(Paths.get(imagePath + "/" + res));
			} else if (res.endsWith(".wav")) {
				Files.deleteIfExists(Paths.get(audioPath + "/" + res));
			}
		}
	}

	private void writeToFile(InputStream uploadedInputStream, String uploadedFileLocation) throws IOException {
		FileUtils.forceMkdirParent(new File(uploadedFileLocation));
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
