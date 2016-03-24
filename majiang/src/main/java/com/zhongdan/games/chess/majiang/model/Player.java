package com.zhongdan.games.chess.majiang.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Player {

	private String playerName;
	private List<Majiang> shouPai;

	public Player(String playerName) {
		super();
		this.playerName = playerName;
		shouPai = new ArrayList<Majiang>();
	}

	public void jiePai(Majiang mj) {
		shouPai.add(mj);
	}

	public Majiang chuPai(int mjPos) {
		return shouPai.remove(mjPos);
	}

	public boolean isPeng(Majiang mj) {
		int equals = 0;
		for (Majiang searchMj : shouPai) {
			if (searchMj.equals(mj)) {
				equals++;
				if (equals == 2) {
					return true;
				}
			}
		}
		return false;
	}

	public void peng(Majiang mj) {
		int equals = 0;
		for (Majiang searchMj : shouPai) {
			if (searchMj.equals(mj)) {
				if (equals < 2) {
					shouPai.remove(searchMj);
				} else {
					return;
				}
				equals++;
			}
		}
	}

	public boolean isHuPai() {
		boolean isHuPai = false;

		sortShouPai();
		Set<Majiang> failedDuizi = new HashSet<Majiang>();
		for (int duiziPos1 = 0; duiziPos1 < shouPai.size() - 1;) {
			int duiziPos2 = duiziPos1 + 1;
			if (!failedDuizi.contains(shouPai.get(duiziPos1)) && shouPai.get(duiziPos1).equals(shouPai.get(duiziPos2))) {
				List<Majiang> testShouPai = new ArrayList<Majiang>(shouPai);
				Majiang mjDuizi1 = testShouPai.get(duiziPos1);
				Majiang mjDuizi2 = testShouPai.get(duiziPos2);
				testShouPai.remove(mjDuizi1);
				testShouPai.remove(mjDuizi2);
				for (int lianpaiPos1 = 0; lianpaiPos1 < testShouPai.size() - 2;) {
					int lianpaiPos2 = lianpaiPos1 + 1;
					while (lianpaiPos2 < testShouPai.size() && testShouPai.get(lianpaiPos1).getId() == testShouPai.get(lianpaiPos2).getId())
						lianpaiPos2++;
					if (lianpaiPos2 >= testShouPai.size() || testShouPai.get(lianpaiPos1).getId() + 1 < testShouPai.get(lianpaiPos2).getId()) {
						lianpaiPos1++;
						continue;
					}
					int lianpaiPos3 = lianpaiPos2 + 1;
					while (lianpaiPos3 < testShouPai.size() && testShouPai.get(lianpaiPos2).getId() == testShouPai.get(lianpaiPos3).getId())
						lianpaiPos3++;
					if (lianpaiPos3 >= testShouPai.size() || testShouPai.get(lianpaiPos2).getId() + 1 < testShouPai.get(lianpaiPos3).getId()) {
						lianpaiPos1++;
						continue;
					}
					if (testShouPai.get(lianpaiPos1).getId() + 1 == testShouPai.get(lianpaiPos2).getId()
							&& testShouPai.get(lianpaiPos1).getId() + 2 == testShouPai.get(lianpaiPos3).getId()) {
						Majiang mjLianpai1 = testShouPai.get(lianpaiPos1);
						Majiang mjLianpai2 = testShouPai.get(lianpaiPos2);
						Majiang mjLianpai3 = testShouPai.get(lianpaiPos3);
						testShouPai.remove(mjLianpai1);
						testShouPai.remove(mjLianpai2);
						testShouPai.remove(mjLianpai3);
					} else {
						lianpaiPos1++;
					}
				}
				if (testShouPai.size() == 0) {
					return true;
				}
				for (int sanzhangPos1 = 0; sanzhangPos1 < testShouPai.size() - 2; sanzhangPos1++) {
					int sanzhangPos2 = sanzhangPos1 + 1;
					int sanzhangPos3 = sanzhangPos1 + 2;
					if (testShouPai.get(sanzhangPos1).equals(testShouPai.get(sanzhangPos2))
							&& testShouPai.get(sanzhangPos1).equals(testShouPai.get(sanzhangPos3))) {
						Majiang mjSanzhang1 = testShouPai.get(sanzhangPos1);
						Majiang mjSanzhang2 = testShouPai.get(sanzhangPos2);
						Majiang mjSanzhang3 = testShouPai.get(sanzhangPos3);
						testShouPai.remove(mjSanzhang1);
						testShouPai.remove(mjSanzhang2);
						testShouPai.remove(mjSanzhang3);
					}
				}
				if (testShouPai.size() == 0) {
					return true;
				} else {
					failedDuizi.add(mjDuizi1);
					duiziPos1 = 0;
				}
			} else {
				duiziPos1++;
			}
		}

		return isHuPai;
	}

	public void sortShouPai() {
		for (int i = 0; i < this.shouPai.size() - 1; i++) {
			for (int j = i + 1; j < this.shouPai.size(); j++) {
				if (this.shouPai.get(i).getId() > this.shouPai.get(j).getId()) {
					Majiang tempMj = this.shouPai.get(i);
					this.shouPai.set(i, this.shouPai.get(j));
					this.shouPai.set(j, tempMj);
				}
			}
		}
	}

	public List<Majiang> kanPai() {
		sortShouPai();
		return shouPai;
	}

	public String getPlayerName() {
		return playerName;
	}

	public void setPlayerName(String playerName) {
		this.playerName = playerName;
	}

}
