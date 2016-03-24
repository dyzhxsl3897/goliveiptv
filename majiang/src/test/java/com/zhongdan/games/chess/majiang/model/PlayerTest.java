package com.zhongdan.games.chess.majiang.model;

import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;

public class PlayerTest {

	private Player player;

	@Before
	public void setUp() throws Exception {
		player = new Player("Player");
	}

	@Test
	public void testIsHuPai() {
		player.jiePai(Majiang.WU_WAN);
		player.jiePai(Majiang.LIU_WAN);
		player.jiePai(Majiang.LIU_WAN);
		player.jiePai(Majiang.QI_WAN);
		player.jiePai(Majiang.QI_WAN);
		player.jiePai(Majiang.QI_WAN);
		player.jiePai(Majiang.BA_WAN);
		player.jiePai(Majiang.BA_WAN);
		player.jiePai(Majiang.JIU_WAN);
		player.jiePai(Majiang.SAN_BING);
		player.jiePai(Majiang.SAN_BING);
		player.jiePai(Majiang.QI_BING);
		player.jiePai(Majiang.BA_BING);
		player.jiePai(Majiang.JIU_BING);
		assertTrue(player.isHuPai());
	}

}
