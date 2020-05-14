package com.zhongdan.lobby.bl.utils;

import java.util.Properties;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DefaultProperties {

	@Autowired
	private Properties lobbyProps;

	@Autowired
	private Properties databaseProps;

	private Properties allProps;

	private DefaultProperties() {
	}

	@PostConstruct
	private void initializeProperties() {
		allProps = new Properties();
		allProps.putAll(databaseProps);
		allProps.putAll(lobbyProps);
	}

	public String getProperty(String propertyName) {
		String env = StringUtil.defaultIfEmpty(System.getProperty("current.env"), "LOCAL");
		return allProps.getProperty(propertyName + "." + env);
	}

}
