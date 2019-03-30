package com.zhongdan.lobby.bl.utils;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DefaultProperties {

	@Autowired
	private Properties lobbyProps;

	private DefaultProperties() {
	}

	public String getProperties(String propertyName) {
		String env = System.getProperty("current.env");
		return lobbyProps.getProperty(propertyName + "." + env);
	}

}
