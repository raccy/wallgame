/**
 * 壁モジュール
 * @module Wall
 */
// @flow

import Dom from './dom.js';

/*::
import type Field, { Position } from './field.js';
*/

const randomInt = (number) => {
  return Math.floor(Math.random() * number);
}

const randomIntRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateRandomPair = (min, max, minSum, maxSum) => {
  const sum = randomIntRange(minSum, maxSum);
  const firstMin = Math.max(min, sum - max);
  const firstMax = Math.min(max, sum - min);
  const first = randomIntRange(firstMin, firstMax);
  return [first, sum - first];
};

/**
 * 壁DOMクラス
 */
export default class Wall extends Dom {
  /*::
  _x: number;
  _field: Field;
  _top: WallPart;
  _bottom: WallPart;
  */

  /**
   * コンストラクタ
   */
  constructor(x /*: number */ , field /*: Field */ ) {
    // 壁として親クラスのコンストラクタを呼び出します。
    super('wall');

    // フィールドをセットします。
    this._field = field;

    // 位置をセットします。
    this._x = x;
    this.setStyle('left', this._field.blockLength(this._x));

    // 壁の高さをランダムに取得しておきます。
    const heightPair = generateRandomPair(1, 10, 6, 12)

    // 壁(上)DOMを生成します。
    this._top = new WallPart('wallTop', heightPair[0], this._field);

    // 壁(下)DOMを生成します。
    this._bottom = new WallPart('wallBottom', heightPair[1], this._field);

    // 壁(枠)DOMに壁(上)DOMと壁(下)DOMを組み込みます。
    this.appendChild(this._top);
    this.appendChild(this._bottom);
  }

  get position() /*: Position */ { return { x: this._x, y: 0 }; }
  get top() /*: WallPart */ { return this._top; }
  get bottom() /*: WallPart */ { return this._bottom; }

  /**
   * 壁と重なっているかを確認します。
   */
  within({ x, y } /*: Position */ ) {
    if (x === this._x && (
        y <= this._top.height - 1 ||
        y >= this._field.height - this._bottom.height)) {
      return true;
    }
    return false;
  }

  /**
   * 壁DOMを動かします。
   */
  move() {
    this._x--;
    this.setStyle('left', this._field.blockLength(this._x));
  };


}

/**
 * 壁部品DOMクラス
 */
class WallPart extends Dom {
  /*::
  _height: number;
  _field: Field;
  */
  constructor(name /*: string */ , height /*: number */ , field /*: Field */ ) {
    super(name);
    this._height = height;
    this._field = field;
    this.setStyle('height', this._field.blockLength(this._height));
  }

  get height() {
    return this._height;
  }
}
