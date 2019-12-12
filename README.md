# プレゼンテーションカラオケ

## 概要

プレゼンテーションカラオケに利用するプレゼンテーションサービス
`images` 以下の画像をランダムで5枚表示する

## 機能

- 画像クリックでページ送り

## 技術

- [lit-html](https://lit-html.polymer-jp.org/)

## 準備

- Node.js
- [Plymer-cli](https://docs.polymer-jp.org/2.0/docs/tools/polymer-cli)

### ライブラリーなどのインストール

```bash
cd ./presentation-karaoke
npm install --global yarn polymer-cli
yarn install
```

### コードフォーマッター

```bash
npm install --global prettier eslint-plugin-prettier
```

src/ 以下の *.js ファイル全部にコーディングルールを適用する場合は次を実行します。

```
yarn format
```

エディターの prettier の設定をするとファイル保存時に自動で整形してくれるようになります

### ランダムで表示する画像の準備

まず presentation-karaoke/images/ に画像ファイルをたくさん(5枚以上)コピーしておきます。

次のコマンドで画像を取り込みます ( `src/images.js` を作成する)

```bash
yarn create:images
```

## 起動方法

```bash
polymer serve
```

http://127.0.0.1:8081 にブラウザでアクセス。

## スクリプト

### create:images.js

`images/` 以下にある画像ファイルを追加・削除して更新した場合 `./src/images.js` を作り直す必要があります

```bash
yarn create:images
```
