package com.zhongdan.games.chess.majiang.model;

public class Shaizi {

	private int number;

	public Shaizi() {
		super();
		this.resetRandomNumber();
	}

	public int getNumber() {
		return number;
	}

	public void resetRandomNumber() {
		this.number = (int) (Math.random() * 6) + 1;
	}

}
