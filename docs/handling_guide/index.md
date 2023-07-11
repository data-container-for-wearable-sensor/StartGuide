# Handling Container

## コンテナフォーマット対応の定義

コンテナフォーマット対応とは以下の３つへの対応をすることである。

- コンテナフォーマット
- スキーマ
- スキーマリポジトリ

見方を変えると、コンテナフォーマットを入力に使うか、出力に使うかで以下のように整理できる。

- コンテナフォーマットによる出力
  - コンテナデータの作り方
- コンテナフォーマットによる入力
  - コンテナデータの読み取り方
  - スキーマリポジトリとの連携
  - スキーマの適用

それぞれについての要件を以下に示す。

### コンテナデータ出力

コンテナフォーマットを出力に用いるとは以下の機能を実現することである。

> コンテナフォーマットに従ってペイロードにヘッダを付与すること

運びたいデータ(Payload)をコンテナ化するためにはヘッダを付与することが必要である。  
ヘッダはコンテナフォーマットに従って定義され、コモンパートと呼ばれる必須ヘッダと、拡張パートと呼ばれる任意ヘッダに分かれる。
ヘッダの詳細は以下である。

:::note コモンパート

![コモンパート](common_part.drawio.png)

|header field name|length| description|
|-|-:|-|
|Container Type| 2 byte | 詳細は後述|
|Container Length| 2 byte| コンテナのヘッダからペイロードすべてを含めた長さ|
|Data Id Type| 1byte| Data IDの種類を指定 |
|Data Id Length| 1byte| Data IDの長さを設定 |
|Data Id| {{Data Id length}} byte| ペイロードのデータ型に対応する識別子| 
:::

#### Data ID Type

Data ID TypeはData IDの内容を示すデータである。

:::note 
<details>
<summary>
コモンパート Data Id Type 一覧
</summary>
<div>

|Field Value| Type of DataID |
|-|-|
|0x00|UUID|
|0x01|GTIN-8|
|0x02|GTIN-12|
|0x03|GTIN-13|
|0x04|GTIN-14|
|0x05|Bluetooth|
|0x06|Proprietary|
|0x07-0xFF|Reserved|

</div>
</details>
:::

#### Container Type
Container Typeは以下の８パターンのいずれかである。  
それぞれ、リアルタイム処理、拡張ヘッダの有無、フラグメント有無を示している。

:::note コモンパート コンテナタイプ一覧
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
コンテナタイプのうち、Extended Attributesが `YES` の場合は、
コモンパートの後に拡張パートが続く。

拡張パートは以下のような構成である。  

:::note 拡張パート
![拡張パート](extend_part.drawio.png)

|header field name|length| description|
|-|-:|-|
|Extended Header Length| 1 byte | 拡張ヘッダ全体のバイト長 |
|Attribute Type| 1 byte | 属性の種類|
|Attribute Length| 1 byte | 属性の長さ |
|Attribute Value| Nbyte | 属性データ。{Attribute Length}の長さ。|
:::

拡張ヘッダは図に示したように、
Extended Header Length の後、Attribute Type, Attribute Length, Attribute Value の3つ組の繰り返しで構成される。

#### まとめ
ここまでで示したヘッダを構成し、ペイロードと結合することでコンテナデータになる。

### コンテナデータ入力

コンテナフォーマットを入力に用いるとは以下の機能を実現することである。

> コンテナデータからコンテナフォーマットの仕様に従い値を取り出す  
> 取り出した値に従いリポジトリからスキーマファイルを取得する  
> スキーマファイルに従いコンテナデータを解析する  

上記の３機能を実現できればコンテナフォーマットを入力対応したソフトウェアシステムである。

#### コンテナデータからコンテナフォーマットの仕様に従い値を取り出す  
コンテナデータから値を取り出すためには、ヘッダ出力の逆で情報を取り出す。  
位置と長さは得られるので、それを元に値を取り出す。  
各ヘッダのデータ列と、ペイロードのデータ列が取得できる。

こちらは、次の[事例ページ](./handling_guide/example)が理解の助けになる
 
### スキーマリポジトリ連携

コンテナデータを入力として用いる際には、スキーマリポジトリからスキーマを取得する必要がある。
この時には、処理したいコンテナデータのヘッダから取得したData ID TypeとData IDを用いてスキーマファイルを取得する。

スキーマリポジトリのインターフェイスは、仕様上決められた形はないのでスキーマリポジトリの実装に合わせて、DataID TypeとData IDを元にスキーマリポジトリからスキーマを取得する。

### スキーマの適用

スキーマはペイロードの持つデータ構造を示したものである。  
ファイルとして提供されるが、仕様上決められた情報を持つが、ファイルフォーマットについては定義されていない。  

コンテナデータを入力として使うためには、
対応するスキーマファイルをペイロードへの適用することが必要になる。

適用によって、名前とプリミティブな型を持つデータが取得できる。
次の[事例ページ](./handling_guide/example)が理解の助けになる。
