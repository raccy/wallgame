# wallgame

I wanna use ES2018 more!

## ビルドなどの仕方

まずは準備します。

1. [Node.js](https://nodejs.org/)をインストールします。
2. [Yarn](https://yarnpkg.com/)をインストールします。
    Yarnはオプションですが、インストールしない場合は、各コマンドをnpmに読み替えてください。
3. 下記のコマンドでパッケージ類をインストールします。
    ```
    yarn install
    ```

それぞれ次のコマンドを実行してください。

* レガシー環境用JavaScript(legacy.js)の作成
    ```
    yarn run build
    ```
* Flowによる型チェック
    ```
    yarn run check
    ```
* テスト用にHTTPサーバーを起動
    ```
    yarn run server
    ````