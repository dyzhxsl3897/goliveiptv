package com.zhongdan.lobby.bl.services.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zhongdan.lobby.dao.DaoFacade;

@Service
public class UserService {

	@Autowired
	private DaoFacade daoFacade;

	public int getUserLoginTimes(String userId) {
		return daoFacade.getUserLoginTimes(userId);
	}

}
