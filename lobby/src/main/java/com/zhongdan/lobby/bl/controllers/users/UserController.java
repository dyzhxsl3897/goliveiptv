package com.zhongdan.lobby.bl.controllers.users;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.zhongdan.lobby.bl.services.users.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Path("/user")
@Controller
public class UserController {

	@Autowired
	private UserService userService;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getuserlogintimes")
	public Response getUserLoginTimes(@QueryParam("userid") final String userId) {
		int loginTimes = userService.getUserLoginTimes(userId);

		JSONObject responseData = new JSONObject();
		try {
			responseData.put("loginTimes", loginTimes);
		} catch (JSONException e) {
			log.error("Error: build response data: userId: {} - login times: {}", userId, loginTimes);
		}

		return Response.ok(responseData.toString()).build();
	}

}
