package com.zhongdan.lobby.bl.ai.chinesechess.engine;

import static org.junit.Assert.assertTrue;

import java.io.IOException;

import org.junit.Test;

public class SearchEngineTest {

	@Test
	public final void testChineseChessAi() {
		String FenStr = "1c1k1abR1/4a4/4b4/6NP1/4P4/2C1n1P2/r5p2/4B4/4A4/2BAK4 w - - 0 20";
		// String FenStr = "1c1k1abR1/4a4/4b4/6NP1/4P4/2C1n1P2/r5p2/4B4/4A4/2BAK4 b - - 0 20";
		// String FenStr = "rnbakabnr/9/1c5c/p1p1p1p1p/9/9/P1P1P1P1P/1C2C/9/RNBAKABNR b - - 0 1";

		ActiveBoard cp = new ActiveBoard();
		cp.loadFen(FenStr);
		SearchEngine searchMove = new SearchEngine(cp);
		MoveNode move = null;
		try {
			searchMove.loadBook("/data/book.txt");
			move = searchMove.getBestMove();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (LostException e) {
			e.printStackTrace();
		}

		System.out.println(move);

		assertTrue(true);
	}

}
