import Dom from './dom.js';

export class Gameover extends Dom {
  constructor() {
    super('gameover');
    /**
     * ゲームオーバーDOMを用意しておきます。
     */
    this.html = 'GAMEOVER<br><span>RETRY</span>';
    /**
     * ゲームオーバーDOMをクリックするとページリロードします。
     */
    this.addEventListener('click', () => location.reload());
  }
}


