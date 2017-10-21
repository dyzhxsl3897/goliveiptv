package com.zhongdan.lobby.bl.services;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.zhongdan.lobby.bl.ai.chinesechess.engine.ActiveBoard;
import com.zhongdan.lobby.bl.ai.chinesechess.engine.LostException;
import com.zhongdan.lobby.bl.ai.chinesechess.engine.MoveNode;
import com.zhongdan.lobby.bl.ai.chinesechess.engine.SearchEngine;

@Service
public class AiChineseChessService {

	public String moveStep(Map<String, Object> requestBody) {
		String chessboard = (String) requestBody.get("chessboard");

		ActiveBoard cp = new ActiveBoard();
		cp.loadFen(chessboard);
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

		return move.toString();
	}
}
