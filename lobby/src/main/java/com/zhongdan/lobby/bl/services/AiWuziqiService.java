package com.zhongdan.lobby.bl.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.zhongdan.lobby.bl.ai.wuziqi.BaseComputerAi;
import com.zhongdan.lobby.bl.ai.wuziqi.Chessboard;
import com.zhongdan.lobby.bl.ai.wuziqi.HumanPlayer;
import com.zhongdan.lobby.bl.ai.wuziqi.IChessboard;
import com.zhongdan.lobby.bl.ai.wuziqi.IPlayer;
import com.zhongdan.lobby.bl.ai.wuziqi.Point;

@Service
public class AiWuziqiService {

	public Map<String, Object> nextStep(Map<String, Object> requestBody) {
		Map<String, Object> nextPointMap = new HashMap<String, Object>();

		List<Point> freePoints = new ArrayList<Point>();
		List<Point> humanPoints = new ArrayList<Point>();
		List<Point> aiPoints = new ArrayList<Point>();

		// Get aiPoints from requestBody
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> aiPointsList = (List<Map<String, Object>>) requestBody.get("aiPoints");
		for (int i = 0; i < aiPointsList.size(); i++) {
			Map<String, Object> pointMap = aiPointsList.get(i);
			int x = Integer.valueOf(String.valueOf(pointMap.get("x")));
			int y = Integer.valueOf(String.valueOf(pointMap.get("y")));
			Point point = new Point(x, y);
			aiPoints.add(point);
		}

		// Get humanPoints from requestBody
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> humanPointsList = (List<Map<String, Object>>) requestBody.get("humanPoints");
		for (int i = 0; i < humanPointsList.size(); i++) {
			Map<String, Object> pointMap = humanPointsList.get(i);
			int x = Integer.valueOf(String.valueOf(pointMap.get("x")));
			int y = Integer.valueOf(String.valueOf(pointMap.get("y")));
			Point point = new Point(x, y);
			humanPoints.add(point);
		}

		// Add free points from above
		for (int i = 0; i < 15; i++) {
			for (int j = 0; j < 15; j++) {
				Point point = new Point(i, j);
				if (!aiPoints.contains(point) && !humanPoints.contains(point)) {
					freePoints.add(new Point(i, j));
				}
			}
		}

		IChessboard chessboard = new Chessboard(freePoints);
		IPlayer humanPlayer = new HumanPlayer();
		IPlayer aiPlayer = new BaseComputerAi();
		humanPlayer.setChessboard(chessboard, humanPoints);
		aiPlayer.setChessboard(chessboard, aiPoints);

		Point nextPoint = aiPlayer.run(humanPlayer.getMyPoints(), null);
		nextPointMap.put("x", nextPoint.getX());
		nextPointMap.put("y", nextPoint.getY());
		// nextPointMap.put("x", 5);
		// nextPointMap.put("y", 5);
		return nextPointMap;
	}

}
