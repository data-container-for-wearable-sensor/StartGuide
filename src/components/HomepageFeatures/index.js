import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'オンデマンド',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        テストラボで提供されるソフトウェア群は、オンデマンドに動作させることができます。
      </>
    ),
  },
  {
    title: 'ポータブル',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        テストラボで提供されるソフトウェア群は、ポータブルな形式で提供されます。
      </>
    ),
  },
  {
    title: 'インクリメンタル',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        テストラボで提供されるコンテンツは、インクリメンタルに追加更新されていきます。
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
