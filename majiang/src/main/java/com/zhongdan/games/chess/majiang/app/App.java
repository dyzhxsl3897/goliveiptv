package com.zhongdan.games.chess.majiang.app;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.List;

import com.zhongdan.games.chess.majiang.model.Majiang;
import com.zhongdan.games.chess.majiang.model.Player;
import com.zhongdan.games.chess.majiang.model.Zhuo;

public class App {

	private static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

	public static void main(String[] args) throws Exception {
		Zhuo zhuo = new Zhuo("Player1", "Player2", "Player3", "Player4");
		zhuo.xiPai();
		zhuo.faPai(zhuo.getPlayer(0));
		int i = 0;
		int round = 1;
		while (!zhuo.isHuangZhuang()) {
			Player player = zhuo.getPlayer(i);
			if (i == 0) {
				System.out.println("第" + round + "轮:");
				Majiang jiePai = zhuo.jiePai();
				player.jiePai(jiePai);
				System.out.println("Player " + i + ": " + jiePai.getName());
				kanpai(player.kanPai());
				if (player.isHuPai()) {
					System.out.println("你胡了!!!");
					break;
				}
				int number = Integer.parseInt(br.readLine());
				zhuo.chuPai(player.chuPai(--number));
				round++;
			} else {
				player.jiePai(zhuo.jiePai());
				if (player.isHuPai()) {
					System.out.println("Player" + i + " 胡了!!!");
				}
				Majiang lastChuPai = player.chuPai(0);
				zhuo.chuPai(lastChuPai);
				System.out.println("Player " + i + ": 刚打出: " + lastChuPai.getName());
				kanpai(player.kanPai());
			}
			i++;
			i %= 4;
		}
		System.out.println("黄庄!");
	}

	@SuppressWarnings("unused")
	private static boolean isPeng(Zhuo zhuo) throws Exception {
		boolean isPeng = false;
		Majiang lastDaChuPai = zhuo.getDaChuPai().get(zhuo.getDaChuPai().size() - 1);
		if (zhuo.getPlayer(0).isPeng(lastDaChuPai)) {
			int number = Integer.parseInt(br.readLine());
			if (number == 1) {
				zhuo.getPlayer(0).peng(lastDaChuPai);
				System.out.println("Player 0:");
				kanpai(zhuo.getPlayer(0).kanPai());
				return true;
			} else {
				return false;
			}
		}
		return isPeng;
	}

	private static void kanpai(List<Majiang> mjs) {
		int i = 1;
		for (Majiang mj : mjs) {
			System.out.print(mj.getName() + "(" + i + ") ");
			i++;
		}
		System.out.println();
	}

}
