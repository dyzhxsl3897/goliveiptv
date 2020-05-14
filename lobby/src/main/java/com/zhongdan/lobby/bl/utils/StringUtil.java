package com.zhongdan.lobby.bl.utils;

public class StringUtil {

	private static final String EMPTY = "";

	private StringUtil() {
	}

	public static boolean isEmpty(String str) {
		return (null == str || "".equals(str) || "null".equalsIgnoreCase(str));
	}

	public static String defaultIfEmpty(String... strs) {
		for (String str : strs) {
			if (!isEmpty(str)) {
				return str;
			}
		}
		return EMPTY;
	}

}
