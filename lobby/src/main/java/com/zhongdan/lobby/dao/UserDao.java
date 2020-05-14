package com.zhongdan.lobby.dao;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class UserDao extends JdbcDaoSupport {

	@Autowired
	private Properties sqls;

	@Autowired
	public UserDao(JdbcTemplate jdbcTemplate) {
		super();
		setJdbcTemplate(jdbcTemplate);
	}

	public int getUserLoginTimes(String userId) {
		String sql = sqls.getProperty("user.login.times.get");

		int result = 0;
		try {
			result = getJdbcTemplate().queryForObject(sql, Integer.class, userId);
		} catch (EmptyResultDataAccessException e) {
			log.debug("No user found!");
		}

		return result;
	}

}
