import { Component } from './dom.js'

/**
 * スコアコンポーネントクラス
 */
export default class Score extends Component {
  /**
   * コンストラクタ
   */
  constructor() {
    // スコアとして親クラスのコンストラクタを呼び出します。
    super('score');

    // 初期のスコア値を与えます。
    this._score = 0;

    // スコア値を表示します。
    this.dispalyScore();
  }

  /**
   * 現在のスコアを取得します。
   */
  getCurrentScore() {
    this._score;
  }

  /**
   * スコアを増やします。
   */
  plusScore(plus) {
    this._score += plus;
    this.dispalyScore();
  }

  /**
   * スコア値をDOMに反映します。
   */
  displayScore() {
    this.setDomText(this._score);
  }
}
