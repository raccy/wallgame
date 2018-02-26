/**
 * ユーティリティーモジュール
 * @module utility
 */
// @flow

export const sleepMsec = (msec /*: number */ ) /*: Promise<void> */ =>
  new Promise(resolve => setTimeout(resolve, msec));

export const sleep = (sec /*: number */ ) /*: Promise<void> */ =>
  sleepMsec(sec * 1000);
