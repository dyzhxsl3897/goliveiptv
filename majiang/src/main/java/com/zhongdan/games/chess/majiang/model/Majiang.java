package com.zhongdan.games.chess.majiang.model;

public enum Majiang {

	YI_WAN(1, "一万"), ER_WAN(2, "二万"), SAN_WAN(3, "三万"), SI_WAN(4, "四万"), WU_WAN(5, "五万"), LIU_WAN(6, "六万"), QI_WAN(7, "七万"), BA_WAN(8, "八万"), JIU_WAN(
			9, "九万"), YI_TIAO(11, "一条"), ER_TIAO(12, "二条"), SAN_TIAO(13, "三条"), SI_TIAO(14, "四条"), WU_TIAO(15, "五条"), LIU_TIAO(16, "六条"), QI_TIAO(17,
			"七条"), BA_TIAO(18, "八条"), JIU_TIAO(19, "九条"), YI_BING(21, "一饼"), ER_BING(22, "二饼"), SAN_BING(23, "三饼"), SI_BING(24, "四饼"), WU_BING(25,
			"五饼"), LIU_BING(26, "六饼"), QI_BING(27, "七饼"), BA_BING(28, "八饼"), JIU_BING(29, "九饼"), DONG_FENG(31, "东风"), NAN_FENG(41, "南风"), XI_FENG(51,
			"西风"), BEI_FENG(61, "北风"), HONG_ZHONG(71, "红中"), BAI_BAN(81, "白板"), FA_CAI(91, "发财");

	private int id;
	private String name;

	Majiang(int id, String name) {
		this.id = id;
		this.name = name;
	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

}
