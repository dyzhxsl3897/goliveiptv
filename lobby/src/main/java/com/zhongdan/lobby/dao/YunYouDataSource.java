package com.zhongdan.lobby.dao;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import com.zhongdan.lobby.bl.utils.DefaultProperties;
import com.zhongdan.lobby.bl.utils.EncryptUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class YunYouDataSource extends DriverManagerDataSource {

	@Autowired
	private DefaultProperties defaultProperties;

	public YunYouDataSource() {
		super();
	}

	@PostConstruct
	protected void Initalize() {
		this.setDriverClassName(defaultProperties.getProperty("mysql.jdbc.driverClassName"));
		this.setUrl(defaultProperties.getProperty("mysql.url"));
		this.setUsername(defaultProperties.getProperty("mysql.username"));
		this.setPassword(EncryptUtil.decrypt(defaultProperties.getProperty("mysql.password")));
		log.info("mysql.url: " + defaultProperties.getProperty("mysql.url"));
	}

}
