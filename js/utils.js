/**
 * ユーティリティーモジュール
 * @module utility
 */
// @flow

export const sleepMsec = msec =>
  new Promise(resolve => setTimeout(resolve, msec));

export const sleep = sec => sleepMsec(sec * 1000);
