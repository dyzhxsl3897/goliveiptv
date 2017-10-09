package com.zhongdan.lobby.bl.ai.wuziqi;

import java.util.ArrayList;
import java.util.List;

public class Chessboard implements IChessboard {

	List<Point> freePoints = new ArrayList<Point>();

	public Chessboard() {
		for (int i = 0; i < getMaxX(); i++) {
			for (int j = 0; j < getMaxY(); j++) {
				freePoints.add(new Point(i, j));
			}
		}
	}

	public Chessboard(List<Point> freePoints) {
		this.freePoints = freePoints;
	}

	public List<Point> getFreePoints() {
		return freePoints;
	}

	public int getMaxX() {
		return 15;
	}

	public int getMaxY() {
		return 15;
	}

}
