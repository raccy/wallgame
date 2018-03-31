/**
 * ブロックモジュール
 * @module Block
 */
// @flow

/*::
export type BlockSetting = {
  size: number,
  unit: string,
  radius?: number,
}
*/

/**
 * ブロッククラス
 * 一つのブロックを表示するときのスタイルに関する情報を持ちます。
 */
export default class Block {
  /*::
  _size: number;
  _unit: string;
  _radius: number;
  */

  /**
   * コンストラクタ
   * @param {BlockSetting} blockSetting - ブロックの設定。
   * @param {number} blockSetting.size - ブロックのサイズ。
   * @param {string} blockSetting.unit - サイズの単位。
   * @param {number} [blockSetting.radius] - 角の曲がり半径。
   */
  constructor({ size, unit, radius } /*: BlockSetting */ ) {
    this._size = size;
    this._unit = unit;
    this._radius = radius != null ? radius : this._size / 5;
  }

  /**
   * ブロックの個数分の長さを取得します。
   * @param {number} number ブロックの個数
   * @return {string} 個数分の長さ
   */
  length(number /*: number */ = 1) /*: string */ {
    return `${number * this._size}${this._unit}`;
  }

  /**
   * ブロックの角の半径を取得します。
   * @param {number} borderWidth ボーダーの幅
   * @return {string} 角の半径
   */
  borderRadius(borderWidth /*: number */ = 0) /*: string */ {
    return `${borderWidth + this._radius}${this._unit}`;
  }
}
