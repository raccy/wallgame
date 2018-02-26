import Dom from './dom.js';

export default class Player extends Dom {
  constructor(position, field) {
    super('player');
    this._position = position;
    this._field = field;
    this.setStyle('left', this._field.blockLength(this._position.x));
    this.setStyle('top', this._field.blockLength(this._position.y));
}

  /**
   * プレイヤーの位置を取得します。
   */
  get position() {
    return this._position;
  }

  /**
   * プレイヤーDOMが壁DOMに重なるか調べます。
   */
  overlapsWall(wall) {
    if (this.position.x === wall.x && (
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
  move({ x = 0, y = 0 }) {
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
