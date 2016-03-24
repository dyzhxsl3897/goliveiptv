package com.zhongdan.games.chess.majiang.model;

import java.util.ArrayList;
import java.util.List;

public class Zhuo {

	private Player dealer;// 庄家
	private List<Player> players;// 4个玩家
	private List<Shaizi> shaizis;// 2个骰子
	private List<Majiang> daChuPai;// 锅底打出的牌
	private List<Majiang> weiJiePai;// 还没有接的牌

	public Zhuo(String player1Name, String player2Name, String player3Name, String player4Name) {
		super();
		shaizis = new ArrayList<Shaizi>();
		players = new ArrayList<Player>();
		daChuPai = new ArrayList<Majiang>();
		weiJiePai = new ArrayList<Majiang>();
		shaizis.add(new Shaizi());
		shaizis.add(new Shaizi());
		players.add(new Player(player1Name));
		players.add(new Player(player2Name));
		players.add(new Player(player3Name));
		players.add(new Player(player4Name));
		setDealer(0);
		initDaChuPai();
	}

	private void initDaChuPai() {
		daChuPai.clear();
		for (Majiang mj : Majiang.values()) {
			daChuPai.add(mj);
			daChuPai.add(mj);
			daChuPai.add(mj);
			daChuPai.add(mj);
		}
	}

	public void setDealer(int playerId) {
		this.dealer = this.players.get(playerId);
	}

	public void xiPai() {
		for (int i = 0; i < 10000; i++) {
			int x = (int) (Math.random() * 136);
			Majiang tempMj = (Majiang) this.daChuPai.get(x);
			daChuPai.remove(x);
			daChuPai.add(tempMj);
		}
		for (int i = 0; i < 136; i++) {
			weiJiePai.add(daChuPai.get(i));
		}
		daChuPai.clear();
	}

	public void faPai(Player dealer) {
		for (int i = 0; i < 4; i++) {
			Player player = this.players.get(i);
			for (int j = 0; j < 13; j++) {
				player.jiePai(getNextWeiJiePai());
			}
		}
	}

	public void chuPai(Majiang mj) {
		this.daChuPai.add(mj);
	}

	public Majiang jiePai() {
		return weiJiePai.remove(0);
	}

	public boolean isHuangZhuang() {
		boolean isHuangZhuang = false;
		if (this.weiJiePai.size() < 52) {
			isHuangZhuang = true;
		}
		return isHuangZhuang;
	}

	public Player getPlayer(int playerNumber) {
		return this.players.get(playerNumber);
	}

	public void resetBothShaizi() {
		this.shaizis.get(0).resetRandomNumber();
		this.shaizis.get(1).resetRandomNumber();
	}

	public List<Majiang> getDaChuPai() {
		return daChuPai;
	}

	public List<Majiang> getWeiJiePai() {
		return weiJiePai;
	}

	public List<Shaizi> getShaizis() {
		return shaizis;
	}

	public int getShaiziNumber() {
		return shaizis.get(0).getNumber() + shaizis.get(1).getNumber();
	}

	public Majiang getNextWeiJiePai() {
		return weiJiePai.remove(0);
	}

	public Player getDealer() {
		return dealer;
	}

}
