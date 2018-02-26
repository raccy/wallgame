/**
 * フィールド
 * @module Field
 * 
 * フィールドのy軸は下になります。
 * <pre>
 *   0  w
 * 0 +--> x
 *   |
 * h v
 *   y
 * </pre>
 */
// @flow

import Dom from './dom.js';
import Block from './block.js';
import Player from './player.js';
import Wall from './wall.js';

/*::
type Position = {
  x: number,
  y: number,
}
*/

/**
 * フィールドDOMクラス
 */
export default class Field extends Dom {
  /**
   * コンストラクタ
   */
  constructor({ width, height, wallGap, block }) {
    // フィールドとして親クラスのコンストラクタを呼び出します。
    super('field');
    this._width = width;
    this._height = height;
    this._wallGap = wallGap;
    this._block = new Block(block);

    // プレイヤーの初期位置を左側の中央に設定します。
    const initPlayerPosition = {
      x: 0,
      y: Math.floor(height / 2),
    }
    // プレイヤーを作成します。
    this._player = new Player(initPlayerPosition, this);
    // プレイヤーを組み込んでおきます。
    this.appendChild(this._player);

    // 壁一覧を初期化します。
    this._walls = [];

    // 初期の壁の位置をプレイヤーから間隔分離れた位置に設定します。
    const initWallsPositionX = [
      ...Array(Math.floor(this._width / this._wallGap) - 1).keys()
    ].map(i => (i + 1) * this._wallGap);

    // 壁DOMを組み込んでみます。
    for (const x of initWallsPositionX) {
      this.appendWall(x);
    }
  }

  /**
   * 読み込みプロパティ
   */
  get player() { return this._player; }
  get walls() { return this._walls; }

  appendWall(x) {
    // 壁DOMを作成します。
    const wall = new Wall(x, this);
    // 子DOMとして登録します。
    this.appendChild(wall);
    // 壁一覧に登録します。
    this._walls.push(wall);
  }

  removeWall(wall) {
    this._walls = this._walls.filter(w => w !== wall);
  }

  /**
   * フィールド内か確認します。
   */
  within({ x, y }) {
    return x >= 0 && x < this._width && y >= 0 && y < this._height;
  }

  /**
   * ブロックあたりの長さを返します。
   */
  blockLength(number = 1) {
    return this._block.length(number);
  }

  /**
   * ブロックの角の半径を返します。
   */
  blockBoderRadius(borderWidth = 0) {
    return this._block.borderRadisu(borderWidth);
  }
}
