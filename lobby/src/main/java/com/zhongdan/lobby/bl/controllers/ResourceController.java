package com.zhongdan.lobby.bl.controllers;

import java.io.File;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.zhongdan.lobby.bl.utils.DefaultProperties;

@Path("/resources")
@Controller
public class ResourceController {

	@Autowired
	private DefaultProperties defaultProperties;

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

}
