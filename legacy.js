(function () {
'use strict';

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }

      function _next(value) {
        step("next", value);
      }

      function _throw(err) {
        step("throw", err);
      }

      _next();
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return _get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
}

/**
 * DOMモジュール
 * @module Dom
 */
// @flow

/**
 * DOMクラス
 */
var Dom =
/*#__PURE__*/
function () {
  /*::
  _name: string;
  _dom: HTMLElement;
  _parent: ?Dom;
  _children: Array<Dom>;
  */

  /**
   * コンストラクタ
   */
  function Dom(name
  /*: string */
  ) {
    _classCallCheck(this, Dom);

    this._name = name;
    this._dom = document.createElement('div');

    this._dom.classList.add(name); // 親DOMを初期化します。


    this._parent = null; // 子DOM一覧を初期化します。

    this._children = [];
  }
  /**
   * DOM本体を取得します。
   */


  _createClass(Dom, [{
    key: "appendChild",

    /**
     * 子DOMを追加します。
     */
    value: function appendChild(child
    /*: Dom */
    ) {
      // DOM本体に子DOM本体を追加します。
      this._dom.appendChild(child.dom); // 子DOM一覧に登録します。


      this._children.push(child); // 子DOMに親を登録します。


      child.parent = this;
    }
    /**
     * 子DOMを削除します。
     */

  }, {
    key: "removeChild",
    value: function removeChild(child
    /*: Dom */
    ) {
      if (this.children.includes(child)) {
        // DOM本体から子DOM本体を削除します。
        this._dom.removeChild(child.dom); // 子DOM一覧から削除します。


        this._children = this._children.filter(function (target) {
          return target !== child;
        }); // 子DOMから親を削除します。

        child.parent = null;
      }
    }
    /**
     * 親DOMから自身を削除します。
     */

  }, {
    key: "remove",
    value: function remove() {
      if (this.parent != null) {
        this.parent.removeChild(this);
      }
    }
    /**
     * 算出スタイルのうち、
     * 指定したCSSプロパティのみを返します。
     */

  }, {
    key: "getStyle",
    value: function getStyle(property
    /*: string */
    ) {
      return window.getComputedStyle(this._dom, null)[property];
    }
    /**
     * CSSスタイルをセットします。
     */

  }, {
    key: "setStyle",
    value: function setStyle(property
    /*: string */
    , value
    /*: string */
    ) {
      this._dom.style
      /*: { [string]: string } */
      [property] = value;
    } // /**
    //  * 算出スタイルのうち、
    //  * 指定したCSSプロパティのみを配列にして返します。
    //  */
    // getStyles(...properties /*: Array<string> */) {
    //   const styles = window.getComputedStyle(this._dom, null);
    //   return properties.map(property => styles[property]);
    // }
    // /**
    //  * ポジション情報に限定してCSSプロパティの配列を返します。
    //  */
    // getPositionsArray() {
    //   return this.getStyles('top', 'bottom', 'left', 'right', 'height');
    // }
    // /**
    //  * 位置情報をオブジェクトで返します。
    //  */
    // getPositions() {
    //   const [top, bottom, left, right, height] =
    //   this.getPositionsArray().map(property => parseInt(property));
    //   return { top, bottom, left, right, height };
    // };
    // /**
    //  * 属性を追加します。
    //  */
    // setAttr(key, value) {
    //   this._dom.setAttribute(key, value);
    // }
    // /**
    //  * 指定した属性を取得します。
    //  */
    // getAttr(key) {
    //   return this._dom.getAttribute(key);
    // }

    /**
     * テキストをセットします。
     */

  }, {
    key: "addEventListener",

    /**
     * イベントを追加します。
     */
    value: function addEventListener(event
    /*: string */
    , func
    /*: (Event) => void */
    ) {
      return this._dom.addEventListener(event, func);
    }
    /**
     * 描画します。
     */

  }, {
    key: "render",
    value: function render() {// 何もしない。
    }
  }, {
    key: "dom",
    get: function get()
    /*: HTMLElement */
    {
      return this._dom;
    }
    /**
     * 親DOMを取得します。
     */

  }, {
    key: "parent",
    get: function get()
    /*: ?Dom */
    {
      return this._parent;
    }
    /**
     * 親DOMをセットします。
     */
    ,
    set: function set(parent
    /*: ?Dom */
    ) {
      this._parent = parent;
    }
    /**
     * 子DOMを取得します。
     */

  }, {
    key: "children",
    get: function get()
    /*: Array<Dom> */
    {
      return this._children;
    }
  }, {
    key: "text",
    set: function set(text
    /*: string */
    ) {
      this._dom.textContent = text;
    }
    /**
     * HTMLをセットします。
     */
    ,

    /**
     * テキストを取得します。
     */
    get: function get()
    /*: string */
    {
      return this._dom.textContent;
    }
  }, {
    key: "html",
    set: function set(text
    /*: string */
    ) {
      this._dom.innerHTML = text;
    }
  }]);

  return Dom;
}();

/**
 * ブロックモジュール
 * @module Block
 */
// @flow

/*::
export type BlockSetting = {
  size: number,
  unit: string,
}
*/

/**
 * ブロッククラス
 * 一つのブロックを表示するときのスタイルに関する情報を持ちます。
 */
var Block =
/*#__PURE__*/
function () {
  /*::
  _size: number;
  _unit: string;
  _radius: number;
  */

  /**
   * コンストラクタ
   * @param {number} size 一つのブロックのサイズ
   * @param {string} unit 単位
   */
  function Block(_ref
  /*: BlockSetting */
  ) {
    var size = _ref.size,
        unit = _ref.unit;

    _classCallCheck(this, Block);

    this._size = size;
    this._unit = unit;
    this._radius = this._size / 5;
  }
  /**
   * ブロックの個数分の長さを取得します。
   * @param {number} number ブロックの個数
   * @return {string} 個数分の長さ
   */


  _createClass(Block, [{
    key: "length",
    value: function length()
    /*: string */
    {
      var number
      /*: number */
      = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return "".concat(number * this._size).concat(this._unit);
    }
    /**
     * ブロックの角の半径を取得します。
     * @param {number} borderWidth ボーダーの幅
     * @return {string} 角の半径
     */

  }, {
    key: "borderRadius",
    value: function borderRadius()
    /*: string */
    {
      var borderWidth
      /*: number */
      = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return "".concat(borderWidth + this._radius).concat(this._unit);
    }
  }]);

  return Block;
}();

/*::
import type Field, { Position } from './field.js';
import type Wall from './wall.js';
*/

var Player =
/*#__PURE__*/
function (_Dom) {
  _inherits(Player, _Dom);

  /*::
  _position: Position;
  _field: Field;
  */
  function Player(position
  /*: Position */
  , field
  /*: Field */
  ) {
    var _this;

    _classCallCheck(this, Player);

    _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, 'player'));
    _this._position = position;
    _this._field = field;

    _this.setStyle('left', _this._field.blockLength(_this._position.x));

    _this.setStyle('top', _this._field.blockLength(_this._position.y));

    return _this;
  }
  /**
   * プレイヤーの位置を取得します。
   */


  _createClass(Player, [{
    key: "overlapsWall",

    /**
     * プレイヤーDOMが壁DOMに重なるか調べます。
     */
    value: function overlapsWall(wall
    /*: Wall */
    ) {
      if (this.position.x === wall.position.x && (this.position.y <= wall.top.height || this.position.y >= this._field.height - wall.bottom.height)) {
        return true;
      }

      return false;
    }
  }, {
    key: "allowMove",

    /**
     * プレイヤーDOMを動かしていい場所か調べます。
     */
    value: function allowMove() {
      // フィールド内にあるかを調べます。
      if (!this._field.within(this._position)) {
        return false;
      } // 壁にぶつかっていないかを調べます。


      if (this.hitWall()) {
        return false;
      }

      return true;
    }
    /**
     * 壁DOMがプレイヤーDOMに衝突したか調べます。
     */

  }, {
    key: "hitWall",
    value: function hitWall() {
      var _this2 = this;

      return this._field.walls.some(function (wall) {
        return wall.within(_this2._position);
      });
    }
    /**
     * プレイヤーDOMを動かします。
     */

  }, {
    key: "move",
    value: function move(_ref
    /*: { x?: number, y?: number } */
    ) {
      var _ref$x = _ref.x,
          x = _ref$x === void 0 ? 0 : _ref$x,
          _ref$y = _ref.y,
          y = _ref$y === void 0 ? 0 : _ref$y;
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
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.move({
        x: 1
      });
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      this.move({
        x: -1
      });
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      this.move({
        y: 1
      });
    }
  }, {
    key: "moveUp",
    value: function moveUp() {
      this.move({
        y: -1
      });
    }
  }, {
    key: "position",
    get: function get()
    /*: Position */
    {
      return this._position;
    }
  }]);

  return Player;
}(Dom);

var randomIntRange = function randomIntRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateRandomPair = function generateRandomPair(min, max, minSum, maxSum) {
  var sum = randomIntRange(minSum, maxSum);
  var firstMin = Math.max(min, sum - max);
  var firstMax = Math.min(max, sum - min);
  var first = randomIntRange(firstMin, firstMax);
  return [first, sum - first];
};
/**
 * 壁DOMクラス
 */


var Wall =
/*#__PURE__*/
function (_Dom) {
  _inherits(Wall, _Dom);

  /*::
  _x: number;
  _field: Field;
  _top: WallPart;
  _bottom: WallPart;
  */

  /**
   * コンストラクタ
   */
  function Wall(x
  /*: number */
  , field
  /*: Field */
  ) {
    var _this;

    _classCallCheck(this, Wall);

    // 壁として親クラスのコンストラクタを呼び出します。
    _this = _possibleConstructorReturn(this, (Wall.__proto__ || Object.getPrototypeOf(Wall)).call(this, 'wall')); // フィールドをセットします。

    _this._field = field; // 位置をセットします。

    _this._x = x;

    _this.setStyle('left', _this._field.blockLength(_this._x)); // 壁の高さをランダムに取得しておきます。


    var heightPair = generateRandomPair(1, 10, 6, 12); // 壁(上)DOMを生成します。

    _this._top = new WallPart('wallTop', heightPair[0], _this._field); // 壁(下)DOMを生成します。

    _this._bottom = new WallPart('wallBottom', heightPair[1], _this._field); // 壁(枠)DOMに壁(上)DOMと壁(下)DOMを組み込みます。

    _this.appendChild(_this._top);

    _this.appendChild(_this._bottom);

    return _this;
  }

  _createClass(Wall, [{
    key: "within",

    /**
     * 壁と重なっているかを確認します。
     */
    value: function within(_ref
    /*: Position */
    ) {
      var x = _ref.x,
          y = _ref.y;

      if (x === this._x && (y <= this._top.height || y >= this._field.height - this._bottom.height)) {
        return true;
      }

      return false;
    }
    /**
     * 壁DOMを動かします。
     */

  }, {
    key: "move",
    value: function move() {
      this._x--;
      this.setStyle('left', this._field.blockLength(this._x));
    }
  }, {
    key: "position",
    get: function get()
    /*: Position */
    {
      return {
        x: this._x,
        y: 0
      };
    }
  }, {
    key: "top",
    get: function get()
    /*: WallPart */
    {
      return this._top;
    }
  }, {
    key: "bottom",
    get: function get()
    /*: WallPart */
    {
      return this._bottom;
    }
  }]);

  return Wall;
}(Dom);

var WallPart =
/*#__PURE__*/
function (_Dom2) {
  _inherits(WallPart, _Dom2);

  /*::
  _height: number;
  _field: Field;
  */
  function WallPart(name
  /*: string */
  , height
  /*: number */
  , field
  /*: Field */
  ) {
    var _this2;

    _classCallCheck(this, WallPart);

    _this2 = _possibleConstructorReturn(this, (WallPart.__proto__ || Object.getPrototypeOf(WallPart)).call(this, name));
    _this2._height = height;
    _this2._field = field;

    _this2.setStyle('height', _this2._field.blockLength(_this2._height));

    return _this2;
  }

  _createClass(WallPart, [{
    key: "height",
    get: function get() {
      return this._height;
    }
  }]);

  return WallPart;
}(Dom);

/*::
import type { BlockSetting } from './block.js';
export type Position = {
  x: number,
  y: number,
};

export type FieldSetting = {
  width: number,
  height: number,
  wallGap: number,
  block: BlockSetting,
};
*/

/**
 * フィールドDOMクラス
 */

var Field =
/*#__PURE__*/
function (_Dom) {
  _inherits(Field, _Dom);

  /*::
  _width: number;
  _height: number;
  _wallGap: number;
  _block: Block;
  _player: Player;
  _walls: Array<Wall>;
  */

  /**
   * コンストラクタ
   */
  function Field(_ref
  /*: FieldSetting */
  ) {
    var _this;

    var width = _ref.width,
        height = _ref.height,
        wallGap = _ref.wallGap,
        block = _ref.block;

    _classCallCheck(this, Field);

    // フィールドとして親クラスのコンストラクタを呼び出します。
    _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this, 'field'));
    _this._width = width;
    _this._height = height;
    _this._wallGap = wallGap;
    _this._block = new Block(block); // プレイヤーの初期位置を左側の中央に設定します。

    var initPlayerPosition = {
      x: 0,
      y: Math.floor(height / 2) // プレイヤーを作成します。

    };
    _this._player = new Player(initPlayerPosition, _assertThisInitialized(_this)); // プレイヤーを組み込んでおきます。

    _this.appendChild(_this._player); // 壁一覧を初期化します。


    _this._walls = []; // 初期の壁の位置をプレイヤーから間隔分離れた位置に設定します。

    var initWallsPositionX = _toConsumableArray(Array(Math.floor(_this._width / _this._wallGap)).keys()).map(function (i) {
      return (i + 1) * _this._wallGap;
    }); // 壁DOMを組み込んでみます。


    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = initWallsPositionX[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _x = _step.value;

        _this.appendWall(_x);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return _this;
  }
  /**
   * 読み込みプロパティ
   */


  _createClass(Field, [{
    key: "appendWall",
    value: function appendWall(x
    /*: ?number */
    ) {
      if (x == null) {
        x = this._width - 1;
      } // 壁DOMを作成します。


      var wall = new Wall(x, this); // 子DOMとして登録します。

      this.appendChild(wall); // 壁一覧に登録します。

      this._walls.push(wall);
    }
  }, {
    key: "removeWall",
    value: function removeWall(wall
    /*: Wall */
    ) {
      this.removeChild(wall);
      this._walls = this._walls.filter(function (w) {
        return w !== wall;
      });
    }
    /**
     * フィールド内か確認します。
     */

  }, {
    key: "within",
    value: function within(_ref2
    /*: Position */
    ) {
      var x = _ref2.x,
          y = _ref2.y;
      return x >= 0 && x < this._width && y >= 0 && y < this._height;
    }
    /**
     * ブロックあたりの長さを返します。
     */

  }, {
    key: "blockLength",
    value: function blockLength() {
      var number
      /*: number */
      = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return this._block.length(number);
    }
    /**
     * ブロックの角の半径を返します。
     */

  }, {
    key: "blockBoderRadius",
    value: function blockBoderRadius() {
      var borderWidth
      /*: number */
      = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return this._block.borderRadius(borderWidth);
    }
  }, {
    key: "width",
    get: function get()
    /*: number */
    {
      return this._width;
    }
  }, {
    key: "height",
    get: function get()
    /*: number */
    {
      return this._height;
    }
  }, {
    key: "wallGap",
    get: function get()
    /*: number */
    {
      return this._wallGap;
    }
  }, {
    key: "player",
    get: function get()
    /*: Player */
    {
      return this._player;
    }
  }, {
    key: "walls",
    get: function get()
    /*: Array<Wall> */
    {
      return this._walls;
    }
  }]);

  return Field;
}(Dom);

/**
 * スコアコンポーネントクラス
 */

var Score =
/*#__PURE__*/
function (_Dom) {
  _inherits(Score, _Dom);

  /*::
  _point: number;
  */

  /**
   * コンストラクタ
   */
  function Score() {
    var _this;

    _classCallCheck(this, Score);

    // スコアとして親クラスのコンストラクタを呼び出します。
    _this = _possibleConstructorReturn(this, (Score.__proto__ || Object.getPrototypeOf(Score)).call(this, 'score')); // 初期のスコア値を与えます。

    _this._point = 0; // スコア値を表示します。

    _this.render();

    return _this;
  }
  /**
   * 現在のスコアを取得します。
   */


  _createClass(Score, [{
    key: "plus",

    /**
     * スコアを増やします。
     */
    value: function plus(point
    /*: number */
    ) {
      this._point += point;
      this.render();
    }
    /**
     * 描画します。
     * @override
     */

  }, {
    key: "render",
    value: function render() {
      _get(Score.prototype.__proto__ || Object.getPrototypeOf(Score.prototype), "render", this).call(this);

      this.text = this._point.toString();
    }
  }, {
    key: "point",
    get: function get$$1()
    /*: number */
    {
      return this._point;
    }
  }]);

  return Score;
}(Dom);

var Gameover =
/*#__PURE__*/
function (_Dom) {
  _inherits(Gameover, _Dom);

  function Gameover() {
    var _this;

    _classCallCheck(this, Gameover);

    _this = _possibleConstructorReturn(this, (Gameover.__proto__ || Object.getPrototypeOf(Gameover)).call(this, 'gameover'));
    /**
     * ゲームオーバーDOMを用意しておきます。
     */

    _this.html = 'GAMEOVER<br><span>RETRY</span>';
    /**
     * ゲームオーバーDOMをクリックするとページリロードします。
     */

    _this.addEventListener('click', function () {
      return location.reload();
    });

    return _this;
  }

  return Gameover;
}(Dom);

/**
 * ユーティリティーモジュール
 * @module utility
 */
// @flow
var sleepMsec = function sleepMsec(msec
/*: number */
) {
  return (
    /*: Promise<void> */
    new Promise(function (resolve) {
      return setTimeout(resolve, msec);
    })
  );
};

/*::
import type { FieldSetting } from './field.js';
type AppSetting = {
  field: FieldSetting,
  defaultSpeed: number,
};
*/

/**
 * アプリ クラス
 */

var App =
/*#__PURE__*/
function (_Dom) {
  _inherits(App, _Dom);

  /*::
  _defaultSpeed: number;
  _state: string;
  _field: Field;
  _score: Score;
  _gameover: Gameover;
  */

  /**
   * コンストラクタ
   */
  function App(_ref
  /*: AppSetting */
  ) {
    var _this;

    var field = _ref.field,
        defaultSpeed = _ref.defaultSpeed;

    _classCallCheck(this, App);

    // アプリとして親クラスのコンストラクタを呼び出します。
    _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, 'app')); // アプリのインスタンス変数をセットします。

    _this._defaultSpeed = defaultSpeed;
    _this._state = 'wait'; // フィールドを作成します。

    _this._field = new Field(field); // スコアを作成します。

    _this._score = new Score(); // ゲームオーバーを作成します。

    _this._gameover = new Gameover(); // フィールドを組み込みます。

    _this.appendChild(_this._field); // スコアを組み込みます。


    _this.appendChild(_this._score);

    return _this;
  }
  /**
   * アプリをDOMに組み込んで開始します。
   */


  _createClass(App, [{
    key: "start",
    value: function start(dom
    /*: Node */
    ) {
      var _this2 = this;

      // アプリをDOMに組み込みます。
      dom.appendChild(this._dom); // 移動したときに入るスコアを設定します。

      var plusScoreByMove = 15; // キーダウンでプレイヤーを動かします。

      document.addEventListener('keydown', function (event
      /*: KeyboardEvent */
      ) {
        if (_this2.isGameover()) {
          return;
        }

        _this2._score.plus(plusScoreByMove);

        switch (event.key) {
          case 'ArrowUp':
            _this2._field.player.moveUp();

            break;

          case 'ArrowDown':
            _this2._field.player.moveDown();

            break;

          case 'ArrowLeft':
            _this2._field.player.moveLeft();

            break;

          case 'ArrowRight':
            _this2._field.player.moveRight();

            break;
        }

        if (_this2._field.player.hitWall()) {
          _this2.setGameover();
        }
      }); // タイマーを動作させます。

      this.step(this._defaultSpeed);
    }
    /**
     * タイマーを始動させます。
     */

  }, {
    key: "step",
    value: function () {
      var _step = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(speed
      /*: number */
      ) {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step2, _wall, scorePoint, division, newSpeed;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return sleepMsec(speed);

              case 2:
                if (!this.isGameover()) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return");

              case 4:
                this._score.plus(10); // 各壁について移動を行い、枠外にある場合は削除します。


                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 8;

                for (_iterator = this._field.walls[Symbol.iterator](); !(_iteratorNormalCompletion = (_step2 = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  _wall = _step2.value;

                  _wall.move();

                  if (!this._field.within(_wall.position)) {
                    this._field.removeWall(_wall);
                  }
                } // 最後の壁がwallGap以上に離れていれば、新たな壁を生成します。


                _context.next = 16;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](8);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 16:
                _context.prev = 16;
                _context.prev = 17;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 19:
                _context.prev = 19;

                if (!_didIteratorError) {
                  _context.next = 22;
                  break;
                }

                throw _iteratorError;

              case 22:
                return _context.finish(19);

              case 23:
                return _context.finish(16);

              case 24:
                if (this._field.walls[this._field.walls.length - 1].position.x <= this._field.width - this._field.wallGap) {
                  this._field.appendWall();
                }

                if (this._field.player.hitWall()) {
                  this.setGameover();
                }

                scorePoint = this._score.point;
                division = Math.floor(scorePoint / 10);
                newSpeed = this._defaultSpeed - division;
                this.step(newSpeed);

              case 30:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[8, 12, 16, 24], [17,, 19, 23]]);
      }));

      return function step(_x) {
        return _step.apply(this, arguments);
      };
    }()
    /**
     * ゲームオーバーにします。
     */

  }, {
    key: "setGameover",
    value: function setGameover() {
      this._state = 'gameover';
      this.appendChild(this._gameover);
    }
  }, {
    key: "isGameover",

    /**
     * ゲームオーバーか調べます。
     */
    value: function isGameover() {
      return this._state === 'gameover';
    }
  }]);

  return App;
}(Dom);

/**
 * メイン
 * @module Main
 */

var setting = {
  field: {
    width: 25,
    height: 15,
    wallGap: 7,
    block: {
      size: 20,
      unit: 'px'
    }
  },
  defaultSpeed: 500 // ミリ秒

}; // アプリコンポーネントを生成します。

var app = new App(setting); // アプリ開始します。

if (document.body != null) {
  app.start(document.body);
}

}());
