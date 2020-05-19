package com.zhongdan.lobby.bl.controllers;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.zhongdan.lobby.bl.services.AdminService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Path("/admin")
@Controller
public class AdminController {

	private static final String STATUS = "status";
	private static final String STATUS_SUCCESS = "success";

	@Autowired
	private AdminService adminService;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getallgames")
	public Map<String, Object> getAllGames() {
		Map<String, Object> status = new HashMap<>();
		String returnStatus = STATUS_SUCCESS;

		List<String> allGames = adminService.getAllGames();
		status.put("allGames", allGames);

		status.put(STATUS, returnStatus);
		return status;
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getgameresources/{gamename}")
	public Map<String, Object> getAllGameResrouces(@PathParam("gamename") final String gameName) {
		Map<String, Object> status = new HashMap<>();
		String returnStatus = STATUS_SUCCESS;

		List<String> allGameResrouces = adminService.getAllGameResrouces(gameName);
		status.put("allResources", allGameResrouces);

		status.put(STATUS, returnStatus);
		return status;
	}

	@POST
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/uploadgame")
	public Map<String, Object> uploadGames(@FormDataParam("uploadGame") InputStream uploadedInputStream,
			@FormDataParam("uploadGame") FormDataContentDisposition fileDetail) {
		Map<String, Object> status = new HashMap<>();
		String returnStatus = STATUS_SUCCESS;

		try {
			adminService.uploadGames(uploadedInputStream, fileDetail);
		} catch (IOException e) {
			log.error("", e);
			returnStatus = "error";
		}

		status.put(STATUS, returnStatus);
		return status;
	}

}
