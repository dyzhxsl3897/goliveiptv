package com.zhongdan.lobby.bl.utils;

import org.junit.Assert;
import org.junit.Test;

public class EncryptUtilTest {

	@Test
	public void testEncrypt() {
		Assert.assertEquals("VGhpcyBpcyB0aGUgb3JpZ2lhbCB0ZXh0", EncryptUtil.encrypt("This is the origial text"));
	}

	@Test
	public void testDecrypt() {
		Assert.assertEquals("This is the origial text", EncryptUtil.decrypt("VGhpcyBpcyB0aGUgb3JpZ2lhbCB0ZXh0"));
	}

}
