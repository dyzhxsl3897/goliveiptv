package com.zhongdan.lobby.dao;

import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.support.DefaultTransactionStatus;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class YunYouDataSourceTransactionManager extends DataSourceTransactionManager {

	private static final long serialVersionUID = -880838681670093988L;

	@Override
	protected void doBegin(Object transaction, TransactionDefinition definition) {
		super.doBegin(transaction, definition);
		log.debug("Transaction Manager doBegin()...");
	}

	@Override
	protected void doCommit(DefaultTransactionStatus status) {
		super.doCommit(status);
		log.debug("Transaction Manager doCommit()...");
	}

	@Override
	protected void doRollback(DefaultTransactionStatus status) {
		super.doRollback(status);
		log.debug("Transaction Manager doRollback()...");
	}

}
