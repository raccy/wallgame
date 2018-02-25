/**
 * アプリモジュール
 */

import Field from './field.js';
import Score from './score.js';
import Dom from './dom.js';
import Gameover from './gameover.js';
import { sleepMsec } from './utils.js';

/**
 * アプリ クラス
 */
export default class App extends Dom {
  /**
   * コンストラクタ
   */
  constructor({ field, defaultSpeed }) {
    // アプリとして親クラスのコンストラクタを呼び出します。
    super('app');

    // アプリのインスタンス変数をセットします。
    this._defaultSpeed = defaultSpeed;
    this._state = 'wait';
    // フィールドを作成します。
    this._field = new Field(field);
    // スコアを作成します。
    this._score = new Score;
    // ゲームオーバーを作成します。
    this._gameover = new Gameover;

    // フィールドを組み込みます。
    this.appendChild(this._field);
    // スコアを組み込みます。
    this.appendChild(this._score);
  }

  /**
   * アプリをDOMに組み込んで開始します。
   */
  start(dom) {
    // アプリをDOMに組み込みます。
    dom.appendChild(this._dom);

    // 移動したときに入るスコアを設定します。
    const plusScoreByMove = 15;

    // キーダウンでプレイヤーを動かします。
    document.addEventListener('keydown', event => {
      if (this.isGameover()) {
        return;
      }

      this._score.plus(plusScoreByMove);

      switch (event.key) {
        case 'ArrowUp':
          this._field.player.moveUp();
          break;
        case 'ArrowDown':
          this._field.player.moveDown();
          break;
        case 'ArrowLeft':
          this._field.player.moveLeft();
          break;
        case 'ArrowRight':
          this._field.player.moveRight();
          break;
      }

      if (this._field.player.hitWall()) {
        this.setGameover();
      }
    });

    // タイマーを動作させます。
    this.step(this._defaultSpeed);
  }

  /**
   * タイマーを始動させます。
   */
  async step(speed) {
    // 速度分待ちます。
    await sleepMsec(speed);

    if (this.isGameover()) {
      return;
    }

    this._score.plus(10);

    // 各壁について移動を行い、枠外にある場合は削除します。
    for (const wall of this._field.walls) {
      wall.move()
      if (!this._field.within(wall.position)) {
        this._field.removeWall(wall);
      }
    }

    // 最後の壁がwallGap以上に離れていれば、新たな壁を生成します。
    if (this._field.walls[this._field.walls.length - 1].position.x ===
      this._field.wallGap) {
      this._field.appendWall();
    }

    if (this._field.player.hitWall()) {
      this.setGameover();
    }

    const scorePoint = this._score.point;
    const division = Math.floor(scorePoint / 10);
    const newSpeed = this._defaultSpeed - division;
    this.step(newSpeed);
  }

  /**
   * ゲームオーバーにします。
   */
  setGameover() {
    this._state = 'gameover';
    this.appendChild(this._gameover);
  };

  /**
   * ゲームオーバーか調べます。
   */
  isGameover() {
    return this._state === 'gameover';
  }
}
