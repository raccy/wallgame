/**
 * DOMモジュール
 * @module Dom
 */
// @flow

/**
 * DOMクラス
 */
export default class Dom {
  /*::
  _name: string;
  _dom: HTMLElement;
  _parent: ?Dom;
  _children: Array<Dom>;
  */
  /**
   * コンストラクタ
   */
  constructor(name /*: string */ ) {
    this._name = name;
    this._dom = document.createElement('div');
    this._dom.classList.add(name);
    // 親DOMを初期化します。
    this._parent = null;
    // 子DOM一覧を初期化します。
    this._children = [];
  }

  /**
   * DOM本体を取得します。
   */
  get dom() /*: HTMLElement */ { return this._dom; }

  /**
   * 親DOMを取得します。
   */
  get parent() /*: ?Dom */ { return this._parent; }

  /**
   * 親DOMをセットします。
   */
  set parent(parent /*: ?Dom */ ) { this._parent = parent; }

  /**
   * 子DOMを取得します。
   */
  get children() /*: Array<Dom> */ { return this._children; }

  /**
   * 子DOMを追加します。
   */
  appendChild(child /*: Dom */ ) {
    // DOM本体に子DOM本体を追加します。
    this._dom.appendChild(child.dom);
    // 子DOM一覧に登録します。
    this._children.push(child);
    // 子DOMに親を登録します。
    child.parent = this;
  }

  /**
   * 子DOMを削除します。
   */
  removeChild(child /*: Dom */ ) {
    if (this.children.includes(child)) {
      // DOM本体から子DOM本体を削除します。
      this._dom.removeChild(child.dom);
      // 子DOM一覧から削除します。
      this._children = this._children.filter((target) => target !== child);
      // 子DOMから親を削除します。
      child.parent = null;
    }
  }

  /**
   * 親DOMから自身を削除します。
   */
  remove() {
    if (this.parent != null) {
      this.parent.removeChild(this);
    }
  }

  /**
   * 算出スタイルのうち、
   * 指定したCSSプロパティのみを返します。
   */
  getStyle(property /*: string */ ) {
    return window.getComputedStyle(this._dom, null)[property];
  }

  /**
   * CSSスタイルをセットします。
   */
  setStyle(property /*: string */ , value /*: string */ ) {
    (this._dom.style /*: { [string]: string } */ )[property] = value;
  }

  // /**
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
  set text(text /*: string */ ) {
    this._dom.textContent = text;
  }

  /**
   * HTMLをセットします。
   */
  set html(text /*: string */ ) {
    this._dom.innerHTML = text;
  }

  /**
   * テキストを取得します。
   */
  get text() /*: string */ {
    return this._dom.textContent;
  }

  /**
   * イベントを追加します。
   */
  addEventListener(event /*: string */ , func /*: (Event) => void */ ) {
    return this._dom.addEventListener(event, func);
  }

  /**
   * 描画します。
   */
  render() {
    // 何もしない。
  }
}
