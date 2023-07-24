# テストラボシステムとは

## 概要

「テストラボ・システム」は、コンテナフォーマットを学び活用するためのシンプルでわかりやすい情報システムです。

コンテナフォーマット


## 利用上の注意
テストラボシステムと呼称するソフトウェア群は以下の注意事項があります。

:::caution
[Handling Containerで示された仕様](./)と差異がある。  
国際標準化の過程で内容が更新されたためである。

差異の一覧

|項目|仕様|テストラボシステム実装|
|-|-|-|
|名称変更|Data Id Type|Data Index|
|仕様変更|コンテナヘッダ内のData Idの長さはData Id Length で示す| Data Idの長さはData Indexの値に対応した値|
|仕様変更|Data Id Lengthをヘッダに持つ| Data Id Lengthがヘッダにない|
|仕様違反|Container Type として決められた値群がある|Container Typeに認められてない値(`0x0000`)を入れている|
:::