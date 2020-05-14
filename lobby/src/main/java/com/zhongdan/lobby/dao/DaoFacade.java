package com.zhongdan.lobby.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class DaoFacade {

	@Autowired
	private UserDao userDao;

	public int getUserLoginTimes(String userId) {
		return userDao.getUserLoginTimes(userId);
	}

}
