package com.zhongdan.games.chess.majiang.model;

import static org.junit.Assert.assertTrue;

import org.junit.Test;

public class MajiangTest {

	@Test
	public void test() {
		Majiang mj = Majiang.YI_WAN;
		assertTrue("一万".equals(mj.getName()));
	}

	public void testAll() {
		for (Majiang mj : Majiang.values()) {
			System.out.println(mj.getId() + ": " + mj.getName());
		}
	}

	@Test
	public void testEqual() {
		Majiang mj1 = Majiang.YI_WAN;
		Majiang mj2 = Majiang.YI_WAN;
		assertTrue(mj1.equals(mj2));
	}
}
