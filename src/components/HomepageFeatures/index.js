import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'オンデマンド',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        テストラボはオンデマンドで動作するソフトウェア群で、コンテナフォーマットの利便性を活かし機能の組み換えやセンサデータの処理が柔軟に行えます。
        {/* テストラボは、オンデマンドに動作するソフトウェア群で構成されます。
        必要に応じてソフトウェアを組み換え、コンテナフォーマットの利便性を活かす機能を実現できます。
        センサデータをコンテナへパック/アンパックする機能、センサデータの構造を保つ仕組み、演算を加えたコンテナの積み替えなど、用途に応じて機能を選択できます。 */}
      </>
    ),
  },
  {
    title: 'ポータブル',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        テストラボのソフトウェアはポータブルであり、動作環境に制約がなく、ソースコードと動作手順が提供されています。
        {/*
        テストラボで提供されるソフトウェア群は、ポータブルな形式で提供されます。
        手元のPC、クラウド上の環境、イントラネットの環境など、様々な環境で動作させることができるよう、
        ソースコードや動作手順が整備開示されていて制限がありません。 */}
      </>
    ),
  },
  {
    title: 'インクリメンタル',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        テストラボは不定期に追加更新を行い、新しいコンテンツやソフトウェア機能を提供します。

        {/* テストラボで提供されるコンテンツやソフトウェアは、インクリメンタルに追加更新されていきます。
        コンテナフォーマットの仕様の新しい情報や、ソフトウェアへの新しい機能の追加などが行われます。 */}
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
