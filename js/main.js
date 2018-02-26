/**
 * メイン
 * @module Main
 */
// @flow

/**
 * メイン処理
 */

import App from "./app.js";

// アプリケーションの設定
const setting = {
  field: {
    width: 25,
    height: 15,
    wallGap: 7,
    block: {
      size: 20,
      unit: 'px',
    },
  },
  defaultSpeed: 500, // ミリ秒
};

// アプリコンポーネントを生成します。
const app = new App(setting);

// アプリ開始します。
app.start(document.body);
