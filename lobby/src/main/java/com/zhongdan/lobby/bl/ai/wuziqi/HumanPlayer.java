package com.zhongdan.lobby.bl.ai.wuziqi;

import java.util.List;

public class HumanPlayer extends BasePlayer {

	public Point run(List<Point> enemyPoints, Point p) {
		getMyPoints().add(p);
		allFreePoints.remove(p);
		return p;
	}

}
