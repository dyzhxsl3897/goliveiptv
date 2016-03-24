package com.zhongdan.games.chess.majiang.model;

import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;

public class ShaiziTest {

	@Before
	public void setUp() throws Exception {
	}

	@Test
	public void test() {
		int[] number = new int[6];
		Shaizi shaizi = new Shaizi();
		for (int i = 0; i < 200000; i++) {
			number[shaizi.getNumber() - 1]++;
			shaizi.resetRandomNumber();
		}
		assertTrue(true);
	}

}
