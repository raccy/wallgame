/**
 * プレーヤーモジュール
 * @module Player
 */
// @flow

import Dom from './dom.js';
/*::
import type Field, { Position } from './field.js';
import type Wall from './wall.js';
*/

export default class Player extends Dom {
  /*::
  _position: Position;
  _field: Field;
  */
  constructor(position /*: Position */ , field /*: Field */ ) {
    super('player');
    this._position = position;
    this._field = field;
    this.setStyle('left', this._field.blockLength(this._position.x));
    this.setStyle('top', this._field.blockLength(this._position.y));
  }

  /**
   * プレイヤーの位置を取得します。
   */
  get position() /*: Position */ {
    return this._position;
  }

  /**
   * プレイヤーDOMが壁DOMに重なるか調べます。
   */
  overlapsWall(wall /*: Wall */ ) {
    if (this.position.x === wall.position.x && (
        this.position.y <= wall.top.height ||
        this.position.y >= this._field.height - wall.bottom.height)) {
      return true;
    }
    return false;
  };

  /**
   * プレイヤーDOMを動かしていい場所か調べます。
   */
  allowMove() {
    // フィールド内にあるかを調べます。
    if (!this._field.within(this._position)) {
      return false;
    }
    // 壁にぶつかっていないかを調べます。
    if (this.hitWall()) {
      return false;
    }
    return true
  }

  /**
   * 壁DOMがプレイヤーDOMに衝突したか調べます。
   */
  hitWall() {
    return this._field.walls.some(wall => wall.within(this._position));
  }

  /**
   * プレイヤーDOMを動かします。
   */
  move({ x = 0, y = 0 } /*: { x?: number, y?: number } */ ) {
    this._position.x += x;
    this._position.y += y;
    if (this.allowMove()) {
      this.setStyle('left', this._field.blockLength(this._position.x));
      this.setStyle('top', this._field.blockLength(this._position.y));
    } else {
      this._position.x -= x;
      this._position.y -= y;
    }
  }

  moveRight() { this.move({ x: 1 }); }
  moveLeft() { this.move({ x: -1 }); }
  moveDown() { this.move({ y: 1 }); }
  moveUp() { this.move({ y: -1 }); }

}
