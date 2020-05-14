package com.zhongdan.lobby.bl.utils;

import java.util.Base64;

public class EncryptUtil {

	private EncryptUtil() {
	}

	public static String encrypt(String originalText) {
		return Base64.getEncoder().encodeToString(originalText.getBytes());
	}

	public static String decrypt(String encryptText) {
		byte[] decodedBytes = Base64.getDecoder().decode(encryptText);
		return new String(decodedBytes);
	}

}
