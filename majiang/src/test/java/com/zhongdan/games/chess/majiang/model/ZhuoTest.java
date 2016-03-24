package com.zhongdan.games.chess.majiang.model;

import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;

public class ZhuoTest {

	private Zhuo zhuo;

	@Before
	public void setUp() throws Exception {
		zhuo = new Zhuo("Player1", "Player2", "Player3", "Player4");
	}

	@Test
	public void testGetShaiziNumber() {
		assertTrue(zhuo.getShaizis().get(0).getNumber() + zhuo.getShaizis().get(1).getNumber() == zhuo.getShaiziNumber());
	}

	@Test
	public void testGetDaChuPai() {
		assertTrue(zhuo.getDaChuPai().size() == 136);
	}

	@Test
	public void testXiPai() {
		zhuo.xiPai();
		assertTrue(zhuo.getWeiJiePai().size() == 136);
		assertTrue(zhuo.getDaChuPai().size() == 0);
	}

	@Test
	public void testJiePai() {
		zhuo.xiPai();
		zhuo.jiePai();
		assertTrue(zhuo.getWeiJiePai().size() == 135);
		assertTrue(zhuo.getDaChuPai().size() == 0);
	}

	@Test
	public void testFaPai() {
		zhuo.xiPai();
		zhuo.faPai(zhuo.getDealer());
		assertTrue(zhuo.getDealer().kanPai().size() == 14);
	}
}
