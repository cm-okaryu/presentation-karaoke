# プレゼンテーションカラオケ

## 概要

プレゼンテーションカラオケに利用するプレゼンテーションサービス
`images` 以下の画像をランダムで5枚表示する

## 機能

- 画像クリックでページ送り

## 技術

- [lit-html](https://lit-html.polymer-jp.org/)

## 準備

- Node.jsとnpm
- [Plymer-cli](https://docs.polymer-jp.org/2.0/docs/tools/polymer-cli)
- 画像を5枚以上
  - `project_root/images` 以下に配置してください

## 起動方法

```
$ cd path/to/project/dir
$ npm install
$ npm run create:images
$ polymer serve
```

ブラウザでアクセス

## スクリプト

### create:images.js

`./images/` 以下に格納した画像のファイル名リストを `./src/images.js` として作成する

