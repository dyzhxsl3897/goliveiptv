package com.zhongdan.lobby.bl.utils;

import org.junit.Assert;
import org.junit.Test;

public class StringUtilTest {

	@Test
	public void testIsEmpty() {
		Assert.assertTrue(StringUtil.isEmpty(null));
		Assert.assertTrue(StringUtil.isEmpty(""));
		Assert.assertTrue(StringUtil.isEmpty("null"));
		Assert.assertTrue(StringUtil.isEmpty("Null"));
		Assert.assertTrue(StringUtil.isEmpty("NULL"));
	}

	@Test
	public void testDefaultIfEmpty() {
		Assert.assertEquals("test", StringUtil.defaultIfEmpty("", "null", "test"));
	}

}
