/**
 * スコアモジュール
 * @module Score
 */
// @flow

import Dom from './dom.js'

/**
 * スコアコンポーネントクラス
 */
export default class Score extends Dom {
  /*::
  _point: number;
  */

  /**
   * コンストラクタ
   */
  constructor() {
    // スコアとして親クラスのコンストラクタを呼び出します。
    super('score');

    // 初期のスコア値を与えます。
    this._point = 0;

    // スコア値を表示します。
    this.render();
  }

  /**
   * 現在のスコアを取得します。
   */
  get point() /*: number */ { return this._point; }

  /**
   * スコアを増やします。
   */
  plus(point /*: number */ ) {
    this._point += point;
    this.render();
  }

  /**
   * 描画します。
   * @override
   */
  render() {
    super.render();
    this.text = this._point.toString();
  }
}
