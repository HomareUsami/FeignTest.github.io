# FeignTest.github.io

## はじめに
このFeignTestは、知人から依頼されたFeignをより良く遊ぶために用意したhtml,js,cssです。<br>
自分はjavascript,html,cssはまだ疎くほとんど独学のため（ネットの情報使用しまくり）、もっとこうすればいいや、コードが乱雑になってしまっているなどあるかもしれませんが。<br>
自分なりに調べ実装したものたちになります。<br>
気が向いたり要望あれば更新するかもしれませんが、基本最初に求められたものまで実装できれば更新はしない予定です。<br>
jQueryも使ってみたかったんだけどそこまで余裕がなく。<br>
まずはjavascriptとhtml,cssの理解がしたくて基本それだけでの実装で行いました。<br>

スマホには未対応です...。<br>
操作保証対象外です。<br>

## 対応ブラウザについて
自分の手元でのOpera,Chromeの動作は確認済みです。

## 使い方
※updateが入っていて画像が異なる場合があります。<br>
<img src="image/operation/main.png" width="500px">

【色】プレイヤーカラーを選択することができます<br>
<img src="image/operation/color_operation.png" width="500px">

【名前】プレイヤー名を入力することが出来ます<br>
　　　　一括user登録で一括で入力することも可能です<br>
　　　　例）<br>
　　　　1人目<br>
　　　　2人目<br>
　　　　3人目<br>
入力済みの名前をクリックすることで変更可能です。<br>
※同一の名前を複数登録はできません<br>
<img src="image/operation/user_operation.png" width="500px">
<img src="image/operation/user_operation_rename.png" width="500px">

【CO役職】プレイヤーがCOする役職を選択することができます<br>
未選択をクリックすることで入力をリセットすることが出来ます<br>
【確定役職】スライドや吊られたり死んだりした人の役職を入力することが出来ます<br>
未選択をクリックすることで入力をリセットすることが出来ます<br>
<img src="image/operation/post_operation.png" width="500px">

【1日目】役職行動を行ったプレイヤーのカラーを選択することが出来ます<br>
<img src="image/operation/action_operation.png" width="500px">

【結果】役職行動からその結果を入力することが出来ます<br>
<img src="image/operation/result_operation.png" width="500px">

【翌日】クリックすると1日プラスされます<br>
【reset】入力したものの全てがリセットされます<br>
【日数リセット】1日以降の日にちがリセットされます<br>
<img src="image/operation/utility_button_operation.png" width="500px">

行をクリック長押しで任意の行と入れ替えることが出来ます（スマホは対応しておりません）<br>
<img src="image/operation/sort_operation.png" width="500px">

## 連絡先
[プログラマーTwitter](https://twitter.com/usami_homare)

[知人Twitter](https://twitter.com/x_H_N_R_x)

## 現状発覚してるバグについて
- OperaGXの特定環境だとUserの並べ替えをすると罫線が太くなる。
  - 自分の手元で再現できず

## アプデ予定のやつ
- 説明文追加

## 余裕があればアプデ予定のやつ
- 罫線が太くなるバグ修正。
- 真ん中揃えが出来てない箇所が多いので真ん中揃えを出来れば...。
  - やり方はある程度確立してるが別バグを生む可能性が高く手を出してない。
- 選択のウィンドウが下にずれてしまう。
  - 原因は発覚してるが修正方法が不明瞭で色々と模索中。
