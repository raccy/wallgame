import Dom from './dom.js';

export default class Player extends Dom {
  constructor(filed, postion) {
    super('player');
    this._field = field;
    this._position = position;
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
    if (! this._field.within(this._position)){
      return false;
    }
    // 壁にぶつかっていないかを調べます。
    if (this._field.walls.any(wall => wall.within(this._position))) {
      return false;
    }
    return true
  }

  /**
   * 壁DOMがプレイヤーDOMに衝突したか調べます。
   */
  playerHitWal() {
    const {top, left} = getPlayerpositions();
    const newLeft = left + 20;
    return getDompositionsAllWalls().some(wallposition => {
      return playerOverlapsWall(top, newLeft, wallposition);
    });
  }

  /**
   * プレイヤーDOMを動かします。
   */
  move({x = 0, y = 0}) {
    this._x += x;
    this._y += y;
    if(this.allowMove()) {
      this.setStyle('left', this._field.blockLength(this._x));
      this.setStyle('top', this._field.blockLength(this._y));
    } else {
      this._x -= x;
      this._y -= y;
    }
  }

  moveRight() { this.movePlayer({x: 1}); }
  moveLeft() { this.movePlayer({x: -1}); }
  moveDown() { this.movePlayer({y: 1}); }
  moveUp() { this.movePlayer({y: -1}); }

}

