package com.zhongdan.lobby.bl.controllers;

import java.io.File;
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
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.zhongdan.lobby.bl.services.ResourceService;
import com.zhongdan.lobby.bl.utils.DefaultProperties;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Path("/resources")
@Controller
public class ResourceController {

	@Autowired
	private ResourceService resourceService;

	@Autowired
	private DefaultProperties defaultProperties;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getallgames")
	public Response getAllGames() {
		Map<String, Object> status = new HashMap<>();

		List<String> allGames = resourceService.getAllGames();
		status.put("allGames", allGames);

		return Response.ok(allGames).build();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getgameresources/{gamename}")
	public Response getAllGameResrouces(@PathParam("gamename") final String gameName) {
		Map<String, Object> status = new HashMap<>();

		List<String> allGameResrouces = resourceService.getAllGameResrouces(gameName);
		status.put("allResources", allGameResrouces);

		return Response.ok(allGameResrouces).build();
	}

	@GET
	@Path("/jad/{gamename}")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response getJad(@PathParam("gamename") final String jadName) {
		String gamePath = defaultProperties.getProperty("game.path");
		File fileDownload = new File(gamePath + File.separator + jadName);
		ResponseBuilder response = Response.ok((Object) fileDownload);
		response.header("Content-Disposition", "attachment;filename=" + jadName);
		return response.build();
	}

	@GET
	@Path("/jar/{gamename}")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response getJar(@PathParam("gamename") final String jarName) {
		String gamePath = defaultProperties.getProperty("game.path");
		File fileDownload = new File(gamePath + File.separator + jarName);
		ResponseBuilder response = Response.ok((Object) fileDownload);
		response.header("Content-Disposition", "attachment;filename=" + jarName);
		return response.build();
	}

	@GET
	@Path("/image")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response getImage(@QueryParam("gamename") final String gameName, @QueryParam("imagename") final String imageName) {
		String imagePath = defaultProperties.getProperty("image.path");
		File fileDownload = new File(imagePath + File.separator + gameName + File.separator + imageName);
		ResponseBuilder response = Response.ok((Object) fileDownload);
		response.header("Content-Disposition", "attachment;filename=" + imageName);
		return response.build();
	}

	@GET
	@Path("/audio")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response getAudio(@QueryParam("gamename") final String gameName, @QueryParam("audioname") final String audioName) {
		String audioPath = defaultProperties.getProperty("audio.path");
		File fileDownload = new File(audioPath + File.separator + gameName + File.separator + audioName);
		ResponseBuilder response = Response.ok((Object) fileDownload);
		response.header("Content-Disposition", "attachment;filename=" + audioName);
		return response.build();
	}

	@POST
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Path("/uploadgame")
	public Response uploadGames(@FormDataParam("uploadGame") InputStream uploadedInputStream,
			@FormDataParam("uploadGame") FormDataContentDisposition fileDetail) {
		try {
			resourceService.uploadGames(uploadedInputStream, fileDetail);
		} catch (IOException e) {
			log.error("", e);
			return Response.serverError().build();
		}

		return Response.ok().build();
	}

	@POST
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Path("/uploadresource/{gameName}")
	public Response uploadResource(@PathParam("gameName") String gameName, @FormDataParam("uploadResource") InputStream uploadedInputStream,
			@FormDataParam("uploadResource") FormDataContentDisposition fileDetail) {
		try {
			resourceService.uploadResource(gameName, uploadedInputStream, fileDetail);
		} catch (IOException e) {
			log.error("", e);
			return Response.serverError().build();
		}

		return Response.ok().build();
	}

}
