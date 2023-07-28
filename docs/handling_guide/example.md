# Handling Container:事例

## 概要
このページでは、コンテナを取り扱う具体例を示す。

基礎知識にあわせて、以下の構成で事例を示す。

- コンテナフォーマットによる出力
  - コンテナの作り方
- コンテナフォーマットによる入力
  - コンテナの読み取り方
  - スキーマリポジトリとの連携
  - スキーマの適用

## コンテナ出力の事例

具体的なコンテナの作成例は以下である。

|header field name|length| hex value|
|-|-|-|
|Container Type|0x02| `AA AA` |
|Container Length|0x02| `00 4E` |
|Data ID Type|0x01| `00` |
|Data ID Length|0x01| **`10`**|
|Data ID | **0x10** |`00 11 22 33 44 55 66 77 88 99 AA BB CC DD EE FF` |
|Payload|0x38|`00 00 01 83 AC 9B 68 82 C0 0C FE 19 BE 8D 35 A8 C0 10 8E 4F 9A 4F 34 D6 C0 16 A0 0D 7A E1 47 AE 40 1C C2 A8 77 EC 15 97 40 40 5A 19 88 95 BC 73 C0 3D D8 31 5C FF D6 1B`|

このコンテナをどう作るか、順を追って説明する。

1. Payload  
まずコンテナにしたいPayloadを持ってくる。  
コンテナに入れるときにPayloadがどのようなデータ構造であるかは問わない。  
ここではコンテナにいれたい `0x38` byteのセンサデータがあるものとする。  

1. Container Type  
仕様の中から事前に決めてよい。  
今回は[コンテナタイプの一覧](../handling_guide#container-type
)から「リアルタイム扱いなし、拡張ヘッダなし、コンテナのFragmentなし」の `0xAAAA` を選択する。  
このヘッダは実現したいアプリケーションサービスによって自由に選択するものであり、
特定のセンサ種類や装置のベンダー、作られるデータを根拠に選択するものではない。

1. Container Length  
今回は、コモンヘッダ＋Data IDの長さを16とする。  
コンテナの全体長は表に示したlengthの和になる。   
`0x02 + 0x02 + 0x01 + 0x01 + 0x10 + 0x38 = 0x4E` かつ、 Container Length は 2byte幅なので`0x004E`となる。

1. Data Id Type  
この例では、Data IdにUUIDを利用する。  
[コンテナタイプの一覧](../handling_guide#data-id-type)
を参照すると、UUIDをDataIDとして用いる場合は `0x00` とする。

1. Data ID Length  
Data IDの長さを設定する。  
長さ16バイトのUUIDを用いるので16を示す、`0x10` とする。

1. Data ID  
リポジトリ内で他と重複しないよう自由に決めてよい。
UUIDとしたので16バイトの値として、  
`00 11 22 33 44 55 66 77 88 99 AA BB CC DD EE FF` を設定する。

1. Build a Container Data  
ヘッダフィールド群をペイロードの前方に結合して、コンテナとして出力を行う。

## コンテナを入力に使う事例

先ほど作ったコンテナを入力に使う事例を示す。

### コンテナからコンテナフォーマットの仕様に従い値を取り出す

入力のデータ列に対しコンテナフォーマットの仕様（コンテナヘッダの並びや長さ）に従い、ヘッダ部分の値を取り出すと以下のようになる。

|header field name|offset|length| hex value(16進数)|
|-|-|-|-|
|Container Type|0|2| `AA AA` |
|Container Length|2|2| *`00 4E`* |
|Data Id Type|4|1| `00` |
|Data Id Length|5|1| **`10`** |
|Data Id| 6| **0x10**|`00 11 22 33 44 55 66 77 88 99 AA BB CC DD EE FF` |
|Payload| 6 + **0x10** | *0x004E* - (6 + **0x10**) | `00 00 01 83 AC 9B 68 82 C0 0C FE 19 BE 8D 35 A8 C0 10 8E 4F 9A 4F 34 D6 C0 16 A0 0D 7A E1 47 AE 40 1C C2 A8 77 EC 15 97 40 40 5A 19 88 95 BC 73 C0 3D D8 31 5C FF D6 1B` |

この時に参照するコンテナフォーマットの仕様とは、コンテナに対してoffsetやlengthを使ってデータを分割し名前を割り当てることである。  
仕様どおりに処理することで、コンテナ作成側の意図するコンテナヘッダやペイロードを入力側で復元する事ができる。

### リポジトリからスキーマファイルを取得する。

コンテナから得られた、Data ID TypeとData IDによって、スキーマリポジトリからスキーマファイルを取得する。  
スキーマリポジトリは上記の2つの情報に基づいてスキーマファイルを提供する。

この事例では、Data Id Type(`0x00`)とData Id(`0x00112233445566778899AABBCCDDEEFF`) で得られたスキーマファイルは以下のスキーマ情報をもつものとする。

|field name| type|offset|length|
|-|-|-:|-:|
|dt   | int  | 0|8|
|x    | float| 8|8| 
|y    | float|16|8|
|z    | float|24|8|
|alpha| float|32|8|
|beta | float|40|8|
|gamma| float|48|8|

スキーマファイルは、特定の表現形式(e.g. json/xml/etc...)と定められていないものの、上記のテーブルの列に上げられた情報を含んでいる

### スキーマの適用

上記のスキーマファイルに記述されたスキーマ情報を利用してペイロードを処理する。　

スキーマファイルに従いペイロードを処理する。  

ペイロードは以下の `56byte` のデータ列である。  
`00 00 01 83 AC 9B 68 82 C0 0C FE 19 BE 8D 35 A8 C0 10 8E 4F 9A 4F 34 D6 C0 16 A0 0D 7A E1 47 AE 40 1C C2 A8 77 EC 15 97 40 40 5A 19 88 95 BC 73 C0 3D D8 31 5C FF D6 1B`  

スキーマファイルに従ってペイロードを以下の３工程で分離する。

1. `position`と`length` でペイロードを分割  
2. `type`に従いデータ列から値を取り出す。
3. `name`に従って名前を付ける

上記の工程を実施するとこのようなイメージになります。

|field name|type|postion|length|(1.)hex value(raw)| (2.)value |
|-|-|-:|-:|:-|-:|
|dt   |int  |0 |8| `00 00 01 83 ac 9b 68 82` |       1665048209538 |
|x    |float|8 |8| `c0 0c fe 19 be 8d 35 a8` |  -3.624072540935874 |
|y    |float|16|8| `c0 10 8e 4f 9a 4f 34 d6` |  -4.138975535473227 |
|z    |float|24|8| `c0 16 a0 0d 7a e1 47 ae` | -5.6563014221191406 |
|alpha|float|32|8| `40 1c c2 a8 77 ec 15 97` |   7.190095781120724 |
|beta |float|40|8| `40 40 5a 19 88 95 bc 73` |   32.70390422164282 |
|gamma|float|48|8| `c0 3d d8 31 5c ff d6 1b` | -29.844503223857924 |

このようにスキーマファイルに従って処理した情報は、
意味のある情報として可視化や各種処理に利用することができる。

## まとめ

コンテナ仕様にしたがってコンテナの入出力及びスキーマリポジトリとスキーマ情報（スキーマファイル）について、具体的にどう作られて、どう利用するか、順を追って示した。
必須でない拡張ヘッダ等の例はこの事例には含まれていないが、コンテナフォーマットの扱い方の本質的な部分はこのページに記述されている。