# 動作環境
動作は以下で行っている。
- WSL2(Ubuntu 22.04)
- Docker
- Google Chrome

動作確認や手順の中では以下のコマンドを用いるので事前に導入をする。
- git
- docker

# 起動手順

docker composeでアプリケーションを動かします。
まず、gitで必要なファイルを取得(クローン)します。

```
~$ git clone https://github.com/tech-sketch/wearable-sensing-data-container-format-for-iot.git
```


以下の手順で動作を確認
```
~$ cd wearable-sensing-data-container-format-for-iot/
~/wearable-sensing-data-container-format-for-iot$ docker compose up -d
```

実行結果の確認
```
~/wearable-sensing-data-container-format-for-iot$ docker compose ps -a
```
で `container-consumer` 以外が `Up` のステータスになっていればOKです。
<details>
<summary>出力結果の表示</summary>
<pre>
<code>
NAME                                     IMAGE                                                             COMMAND                  SERVICE              CREATED             STATUS               
             PORTS
wearable-sensing-data-container-format-for-iot-broker-1               confluentinc/cp-kafka:7.1.0                                       "/etc/confluent/dock…"   broker               11 seconds ago      Up 8 seconds         
             0.0.0.0:9092->9092/tcp, :::9092->9092/tcp, 0.0.0.0:9101->9101/tcp, :::9101->9101/tcp, 0.0.0.0:19092->19092/tcp, :::19092->19092/tcp
wearable-sensing-data-container-format-for-iot-connect-1              public.ecr.aws/l1b7e4q9/testlab_connect:0.9.9                     "/etc/confluent/dock…"   connect              11 seconds ago      Up 7 seconds (health: starting)   0.0.0.0:8083->8083/tcp, :::8083->8083/tcp, 9092/tcp
wearable-sensing-data-container-format-for-iot-container-consumer-1   public.ecr.aws/l1b7e4q9/iot_container_consumer:0.0.3              "/protoschema"           container-consumer   11 seconds ago      Restarting (0) 1 second ago
wearable-sensing-data-container-format-for-iot-grafana-1              grafana/grafana:8.5.3                                             "/run.sh"                grafana              11 seconds ago      Up 8 seconds         
             0.0.0.0:3000->3000/tcp, :::3000->3000/tcp
wearable-sensing-data-container-format-for-iot-iot-registry-1         public.ecr.aws/l1b7e4q9/iot_registory:0.0.1                       "docker-entrypoint.s…"   iot-registry         11 seconds ago      Up 8 seconds         
             0.0.0.0:30002->30002/tcp, :::30002->30002/tcp
wearable-sensing-data-container-format-for-iot-kafka-ui-1             provectuslabs/kafka-ui:3ee2f87255d2a4beacfb177c4a6bdd9f52fd6a09   "/bin/sh -c 'java $J…"   kafka-ui             10 seconds ago      Up 6 seconds         
             0.0.0.0:8080->8080/tcp, :::8080->8080/tcp
wearable-sensing-data-container-format-for-iot-ksqldb-cli-1           confluentinc/cp-ksqldb-cli:7.1.0                                  "/bin/sh"                ksqldb-cli           10 seconds ago      Up 5 seconds         

wearable-sensing-data-container-format-for-iot-ksqldb-server-1        confluentinc/cp-ksqldb-server:7.1.0                               "/etc/confluent/dock…"   ksqldb-server        10 seconds ago      Up 6 seconds         
             0.0.0.0:8088->8088/tcp, :::8088->8088/tcp
wearable-sensing-data-container-format-for-iot-postgres-1           postgres:11.13-alpine                                             "docker-entrypoint.s…"   postgres           11 seconds ago      Up 9 seconds         
             0.0.0.0:5432->5432/tcp, :::5432->5432/tcp
wearable-sensing-data-container-format-for-iot-rest-proxy-1           confluentinc/cp-kafka-rest:7.1.0                                  "/etc/confluent/dock…"   rest-proxy           11 seconds ago      Up 7 seconds         
             0.0.0.0:8082->8082/tcp, :::8082->8082/tcp
wearable-sensing-data-container-format-for-iot-schema-registry-1      confluentinc/cp-schema-registry:7.1.0                             "/etc/confluent/dock…"   schema-registry      11 seconds ago      Up 7 seconds         
             0.0.0.0:8081->8081/tcp, :::8081->8081/tcp
wearable-sensing-data-container-format-for-iot-testlab-edge-1         public.ecr.aws/l1b7e4q9/testlab-edge:0.0.5                        "python main.py"         testlab-edge         11 seconds ago      Up 9 seconds         

wearable-sensing-data-container-format-for-iot-websensor-1            public.ecr.aws/l1b7e4q9/websensor:0.0.1                           "docker-entrypoint.s…"   websensor            11 seconds ago      Up 9 seconds         
             0.0.0.0:1080->80/tcp, :::1080->80/tcp
wearable-sensing-data-container-format-for-iot-zookeeper-1            confluentinc/cp-zookeeper:7.1.0                                   "/etc/confluent/dock…"   zookeeper            11 seconds ago      Up 8 seconds         
             2888/tcp, 0.0.0.0:2181->2181/tcp, :::2181->2181/tcp, 3888/tcp
~/wearable-sensing-data-container-format-for-iot$
</code>
</pre>
container-consumer が `Restarting` になっているのはこの後の手順で是正するのでこの時点ではOKです。
この後のトピック作成手順の完了後Statusが `Up` になります。

</details>

# 起動後の確認
いくつかの画面が開いています。正しく動作していると以下のURLから起動画面が確認できます。
Google Chrome で以下のページを開いてみてください。
- [http://localhost:8080/](http://localhost:8080/)
![ApacheKafkaUI](ui4apachekafka.png)  
- [http://localhost:3000/](http://localhost:3000/)
![Grafana](grafana.png)  
- [http://localhost:30002/](http://localhost:30002/)
![IotRegisitory](iot-registory.png)  
- [http://localhost:1188/](http://localhost:1188/)
![TestlabSensor](testlab-sensor.png)  

# 初期設定手順
サンプルアプリのデータを可視化するまでの手順を示します。

## Kafkaでトピックを確認
KafkaUIを用いてトピックの状況を確認します。
### トピックの確認（変更前）
Kafkaの設定をします。
Kafkaではトピックに対し、データを提供するProducerとデータを利用するConsumerが存在します。

以下のKafkaUIの画面より、現在存在するトピックを確認します。
ページを開いた後、 `Show Internal Topics` を無効化すると4つのトピックが表示されています。
- [http://localhost:8080/ui/clusters/local/topics](http://localhost:8080/ui/clusters/local/topics)
![kafkaui1](kafka_ui1.png)  

### トピックの追加(データの送信)
このKafkaの環境は、未知のトピックを投入された場合、自動的に新たなトピックを追加する設定をしてあります。
そこで、サンプルアプリからデータを送ることでトピックを追加します。

1. データ送信のページを開く  
  [http://localhost:1188/  ](http://localhost:1188/  )
2.  `値の更新` を押下  
  加速度、傾きなどに適当な値が入る
1. `単発送信` を押下  
  サンプルアプリからKafkaに１つデータを送信

![サンプルアプリ](send_example_data.png)  

### トピックの作成確認
KafkaUIを開き画面を更新します。  
`json_mb_ctopic` と `mb_ctopic` の二つのトピックが増えていれば期待通りです。
１分程度時間がかかる可能性があります。

![kafkaui2](kafka_ui2.png)  

```
$ docker compose ps container-consumer
wearable-sensing-data-container-format-for-iot-container-consumer-1   public.ecr.aws/l1b7e4q9/iot_container_consumer:0.0.3   "/protoschema"      container-consumer   40 minutes ago      Up 40 minutes
```

## 可視化画面へのデータを送る
kafkaに届いたデータをAvroというKafkaでよく用いられるデータに変換し、可視化画面用のDBにSinkする設定を行う。

### データ変換の登録
コンテナデータをjsonに変換した `json_mb_topic` から`avro` フォーマットに変換し可視化を行う `Grafana`で用いるデータベースに蓄積をする。

- 以下のページを開く  
[http://localhost:8080/ui/clusters/local/ksqldb/query](http://localhost:8080/ui/clusters/local/ksqldb/query)

- 画像のようなページが表示される
![](ksql_query_page.png)

- Streamを作成する（１つ目）  
以下のksqlクエリをコピーペーストし、`Execute` を押下
```
CREATE STREAM stream_mb_topic
  (
    dt BIGINT,
    x DOUBLE,
    y DOUBLE,
    z DOUBLE,
    alpha DOUBLE,
    beta DOUBLE,
    gamma DOUBLE
  )
  WITH (
    KAFKA_TOPIC = 'json_mb_ctopic',
    VALUE_FORMAT = 'JSON'
  );
```
- 実行結果の確認（１つ目）
  
画像の下のように `SUCCESS Stream created` と表示される。
![](ksql_execute.png)  

- Streamを作成する（２つ目）
同様にもう一つクエリを実行する。
```
CREATE STREAM stream_mb_topic_avro
WITH (KAFKA_TOPIC = 'avro_mb_jtopic', VALUE_FORMAT='AVRO')
AS SELECT 
     ROWTIME as ts, 
     s.dt as dt, 
     s.x as x, 
     s.y as y, 
     s.z as z, 
     s.alpha as alpha, 
     s.beta as beta, 
     s.gamma as gamma 
FROM stream_mb_topic as s;
```
- 作成したstreamを確認する
同様に以下のクエリを実行する。
```
show streams;
```
![picture 23](show_streams.png)  
画像の下部のように`STREAM_MB_CTOPIC` と`AVRO_MB_CTOPIC` が表示されれば成功。

### データのGrafanaへの転送
KafkaのConnectorを設定。
- Connectorの設定ページを開く  
[http://localhost:8080/ui/clusters/local/connectors/create-new](http://localhost:8080/ui/clusters/local/connectors/create-new)
- Connectorの設定を入力する  
Name: `avro_mb_jtopic`  
Config * 
```
{
  "connector.class": "io.confluent.connect.jdbc.JdbcSinkConnector",
  "tasks.max": "1",
  "key.converter": "io.confluent.connect.avro.AvroConverter",
  "value.converter": "io.confluent.connect.avro.AvroConverter",
  "topics": "avro_mb_jtopic",
  "connection.url": "jdbc:postgresql://postgres:5432/postgres",
  "connection.user": "postgres",
  "connection.password": "postgres",
  "dialect.name": "PostgreSqlDatabaseDialect",
  "table.name.format": "${topic}",
  "pk.mode": "none",
  "pk.fields": "",
  "auto.create": "true",
  "auto.evolve": "true",
  "value.converter.schema.registry.url": "http://schema-registry:8081",
  "key.converter.schema.registry.url": "http://schema-registry:8081"
}
```
- Connectorの設定を登録する  
`Submit` を押して登録するが **正常登録時に画面が何も変わらない**

- Connectorの設定登録を確認する  
以下のページを開く。  
[http://localhost:8080/ui/clusters/local/connectors](http://localhost:8080/ui/clusters/local/connectors)

`avro_mb_jtopic` というConnectorが存在すればOK

## Grafanaの設定
ためたデータを可視化する画面へアクセスする。
改めて設定する項目はないが、アプリケーションの動作確認として以下を実施する。

1. Grafanaへアクセス  
   以下の情報でGrafanaへアクセスしログインする  
    [http://localhost:3000/](http://localhost:3000/)
    ```
    ID: admin
    Password: admin
    ```

1. DashBoardの確認  
  左端のメニューSearchから `ExampleDashboard` を開く

1. テストデータ送信の確認  
   1. データ送信のページを開く  
    [http://localhost:1188/  ](http://localhost:1188/  )
   1.  `値の更新` を押下  
    加速度、傾きなどに適当な値が入る
   1. `単発送信` を押下  
    サンプルアプリからKafkaに１つデータを送信

1. データの疎通の確認  
  Grafana上で画面が可視化される。  
  画面は5秒に1回の更新がされるのでデータ送信後5秒以内に表示される。  
  (画面右上から1sに変更可)
  ![picture 24](grafana.png.png)  



## スキーマリポジトリ

スキーマリポジトリは、
テスト用途でデフォルトでいくつかのデータが入っているため、改めて設定する項目はない。  
しかし、アプリケーションの動作確認として以下を実施する。

1. サンプルデータの取得  
サンプルアプリから送信されるデータのスキーマ情報をまず定義します。
以下のバイナリデータはコンテナ化されたタイムスタンプ付きの６軸のデータです。  
[Download(ExampleContainer)](mobile_acce.bin)  
このファイルをサンプルコンテナと今後呼びます。


1. スキーマリポジトリの動作確認  
スキーマリポジトリの確認を行います。  
[http://localhost:30002/](http://localhost:30002/) にアクセス

1. スキーマリポジトリのスキーマ確認
テストラボで準備しているスキーマリポジトリには以下の機能があります。

   1. コンテナデータからのスキーマ定義
   2. コンテナデータへスキーマを適用したデータのプレビュー

1. コンテナデータの読み込み  
初期起動時には画面の左下ボタンよりダウンロードしたファイルを読み込みます。  
ボタンが見つけられない場合、ブラウザのズームを100%未満にすると見えます。
![LoadFileButton](iot-registry-loaddata.png.png)  
前述のサンプルコンテナを読み込むと、以下のようにプレビューされます。
![サンプルコンテナ](iot-registry-preview.png)  
サンプルコンテナに対応するスキーマファイルは、リポジトリに内蔵されており、上記のように
`dt, x, y, z, alpha, beta, gamma` の７つのフィールドが定義され、サンプルコンテナに適用された結果が `Data` や `Raw` で確認できます。

スキーマリポジトリの確認は以上です。
