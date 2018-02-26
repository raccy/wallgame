/**
 * 壁モジュール
 * @module Wall
 */
// @flow

import Dom from './dom.js';

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
  /**
   * コンストラクタ
   */
  constructor(x, field) {
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

  get position() { return { x: this._x, y: 0 }; }

  /**
   * 壁と重なっているかを確認します。
   */
  within({ x, y }) {
    if (x === this._x && (
        y <= this._top.height ||
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
  constructor(name, height, field) {
    super(name);
    this._height = height;
    this._field = field;
    this.setStyle('height', this._field.blockLength(this._height));
  }

  get height() {
    return this._height;
  }
}
