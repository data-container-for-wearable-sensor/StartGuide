# 基礎知識

## コンテナフォーマット規格の３要素

コンテナフォーマット規格は以下の３要素で構成されていて、以下の役割を有しています。

- コンテナフォーマット
  - 標準化された共通のデータ構造（コンテナのデータ構造）の定義
- スキーマリポジトリ
  - コンテナに対応するスキーマ情報を提供
- スキーマ情報
  - コンテナから情報を取り出すためのメタ情報

![](container_three_element.drawio.png)

それぞれの要素をもう少し詳しく見ていきましょう。

## コンテナフォーマット

コンテナフォーマットは、ヘッダとペイロードの２つで構成されるデータ構造です。
このフォーマットに従って作ったデータをコンテナデータと呼びます。

1. ヘッダ
2. ペイロード

![コンテナフォーマットのイメージ](container.drawio.png)

_図 1. コンテナフォーマットのイメージ_

### ヘッダのフォーマット

続いてヘッダの中身について説明します。
ヘッダは 1 つもしくは 2 つのパートで構成され、コモンパート(Common Part)と呼ばれる必須部分と、拡張パート(Extended Part)と呼ばれる任意部分があります。

![コンテナフォーマット](container_format.drawio.png)  
_図 2 コンテナフォーマットの構成_

コンテナは、仕様に従ったヘッダと自由なペイロードから構成されます。
コンテナを作るためには運びたいデータに対してヘッダを付与することが必要です。

ヘッダの仕様の詳細は以下です。
コモンパートと呼ばれる必須部分から示します。

:::note _コモンパート_

![コモンパート](common_part.drawio.png)

| header field name |                  length | description                                      |
| ----------------- | ----------------------: | ------------------------------------------------ |
| Container Type    |                  2 byte | 詳細は後述                                       |
| Container Length  |                  2 byte | コンテナのヘッダからペイロードすべてを含めた長さ |
| Data Id Type      |                   1byte | Data ID の種類を指定                             |
| Data Id Length    |                   1byte | Data ID の長さを設定                             |
| Data Id           | {{Data Id length}} byte | ペイロードのデータ型に対応する識別子             |

:::

#### Data ID Type

Data ID Type は Data ID の種類を示すデータです。

:::note

<details>
<summary>
コモンパート Data Id Type 一覧
</summary>
<div>

| Field Value | Type of DataID |
| ----------- | -------------- |
| 0x00        | UUID           |
| 0x01        | GTIN-8         |
| 0x02        | GTIN-12        |
| 0x03        | GTIN-13        |
| 0x04        | GTIN-14        |
| 0x05        | Bluetooth      |
| 0x06        | Proprietary    |
| 0x07-0xFF   | Reserved       |

</div>
</details>
:::

#### Container Type

Container Type は以下の８パターンのいずれかです。  
それぞれ、リアルタイム処理、拡張パートの有無、フラグメント有無を示している。

:::note _コモンパート コンテナタイプ一覧_
|Container Type Value| Realtime / Non Realtime Process | Extended Attributes | Fragmentation |
|-|-|-|-|
|0x5555|Real time|None|Unfragmented|
|0x3333|Real time|None|Fragmented|
|0x6666|Real time|Yes|Unfragmented|
|0x0F0F|Real time|Yes|Fragmented|
|0xAAAA|Non real time|None|Unfragmented|
|0xCCCC|Non real time|None|Fragmented|
|0x9999|Non real time|Yes|Unfragmented|
|0xF0F0|Non real time|Yes|Fragmented|
:::

#### Extended Header

コモンパートの[コンテナタイプ](#container-type)で、Extended Attributes が `YES` の場合は、
コモンパートの後に拡張パートが続きます。  
`No` の場合は、拡張パートは省略されます。

:::note 拡張パート
![拡張パート](extend_part.drawio.png)

拡張パートは、Extended Header Length の後、(Attribute Type, Attribute Length, Attribute Value) の 3 つ組の繰り返しで構成される。

| header field name      | length | description                          |
| ---------------------- | -----: | ------------------------------------ |
| Extended Header Length | 1 byte | 拡張パート全体のバイト長             |
| Attribute Type         | 1 byte | 属性の種類                           |
| Attribute Length       | 1 byte | 属性の長さ                           |
| Attribute Value        |  Nbyte | 属性データ。{Attribute Length}の長さ |

:::

### ペイロード

ペイロードについては、コンテナフォーマットの仕様上決められた型や構造はありません。
あえて言うなら、バイト列として表現されるものと言えます。

ペイロードには通常何らかの情報を抽出できるバイト列が格納されています。
ペイロードが決まった構造を持たないという特徴は、
**データに対して仕様に沿ったヘッダをつけること** でどのようなデータもコンテナフォーマットに対応できることを意味します。

## スキーマリポジトリ

スキーマリポジトリは、スキーマ情報を管理し提供することでコンテナを扱うための情報を提供します。

コンテナヘッダを元に対応するスキーマ情報を提供し、
コンテナから情報を取り出す手助けをします。

![スキーマとスキーマリポジトリ](repository.drawio.png)

スキーマ情報をスキーマリポジトリから参照することで、
異なる複数のベンダのセンサであっても共通処理で利用できるようになります。
これによって、複数ベンダのセンサを組み合わせて、フレキシブルにサービスを実現できます。

## スキーマ情報

スキーマ情報はコンテナのペイロードから、情報を取り出すためのメタ情報です。

ペイロードは決まった構造を持ちません。  
しかし、コンテナが運ぶペイロードは何らかの構造を持ち情報を持ちます。

ペイロードの構造はデバイスの実装によって異なります。
コンテナを介さない場合は、ペイロードの構造や型をプログラマがドキュメント等から把握し、ペイロードを解析する必要がありました。

一方、コンテナを用いる場合は、ペイロードの構造やデータ型をスキーマ情報として外部に定義し、これを利用します。

コンテナとスキーマ情報を組み合わせ、決まった処理を行うことで、コンテナのペイロードから情報を取り出すことができます。

![スキーマとペイロード](scheme.drawio.png)  
_図 3. スキーマ情報を利用してペイロードから情報を取り出すイメージ_
