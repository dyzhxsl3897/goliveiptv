package com.zhongdan.lobby.bl.controllers;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.zhongdan.lobby.bl.services.AiChineseChessService;
import com.zhongdan.lobby.bl.services.AiWuziqiService;

@Path("/ai")
@Controller
public class AiControllers {

	@Autowired
	AiWuziqiService aiWuziqiService;

	@Autowired
	AiChineseChessService aiChineseChessService;

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/wuziqi/nextstep")
	public Map<String, Object> cinCheckProductExportStatus(Map<String, Object> requestBody) throws Exception {
		Map<String, Object> status = new HashMap<String, Object>();
		String returnStatus = "success";

		Map<String, Object> nextPoint = aiWuziqiService.nextStep(requestBody);
		status.put("nextPoint", nextPoint);

		status.put("status", returnStatus);
		return status;
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/chinesechess/nextstep")
	public Map<String, Object> chineseChessNextStep(Map<String, Object> requestBody) throws Exception {
		Map<String, Object> status = new HashMap<String, Object>();
		String returnStatus = "success";

		String moveStep = aiChineseChessService.moveStep(requestBody);
		status.put("moveStep", moveStep);

		status.put("status", returnStatus);
		return status;
	}

}
