import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'ドキュメント',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        コンテナフォーマット(IEC63430)が解決する課題、コンテナフォーマットの概念や仕組みの理解を深めるためのドキュメントを提供します。
      </>
    ),
  },
  {
    title: 'テストラボシステム',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        コンテナを利活用するシステムの例としてテストラボシステムを題材にその動作手順をチュートリアルとして提供します。
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--6')}>
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
