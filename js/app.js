import Field from './field.js';
import Score from './score.js';
import Dom from './dom.js';
import Gameover from './gameover.js';

/**
 * アプリDOMクラス
 */
export default class App extends Dom {
  /**
   * コンストラクタ
   */
  constructor({
    filed,
    defaultSpeed
  }) {
    // アプリとして親クラスのコンストラクタを呼び出します。
    super('app');
    this._defaultSpeed = defaultSpeed;
    this._state = 'wait';

    // フィールドDOMを組み込みます。
    this._field = new Field(field);
    this.appendChild(this._field);

    // スコアDOMを組み込みます。
    this._score = new Scroe;
    this.appendChild(this._score);

    this._gameover = new Gameover;
  }

  /**
   * アプリをDOMに組み込んで開始します。
   */
  start(dom) {
    // アプリDOMを組み込みます。
    dom.appendChild(app.dom);


    /**
     * キーダウンでプレイヤーを動かします。
     */
    document.addEventListener('keydown', event => {
      if (this.isGameover()) {
        return;
      }

      this._field.score.plusScore(15);

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

      if (playerHitWall()) {
        setGameover();
      }
    });

    //
    step(this._defaultSpeed);
  }


  /**
   * タイマーを始動させます。
   */
  step(speed) {
    const timer = setTimeout(() => {
      if (isGameover()) {
        return;
      }

      plusScore(10);

      findDomAll('.wall').forEach($wall => {
        moveWall($wall);
        removeWallIfProtruded($wall)
      });

      if (getDomPositions(findDom('.wall:last-child')).right === 140) {
        $field.appendChild(createWall(0));
      }

      if (playerHitWall()) {
        setGameover();
      }

      const currentScore = getCurrentScore();
      const division = Math.floor(currentScore / 10);
      const newSpeed = this._defaultSpeed - division;
      step(newSpeed);
    }, speed);
  }

  /**
   * ゲームオーバーにします。
   */
  setGameover() {
    this._state = 'gameover';
    this.appendChild(this._gamevore);
  };

  /**
   * ゲームオーバーか調べます。
   */
  isGameover() {
    return this._state === 'gameover';
  }
}

