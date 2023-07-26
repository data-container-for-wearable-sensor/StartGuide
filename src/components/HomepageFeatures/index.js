import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '理解促進',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        コンテナフォーマット(IEC63430)の仕様が解決する課題と解決方法を示すことで、コンテナフォーマットの概念や仕組みの理解を深める。
      </>
    ),
  },
  {
    title: '普及啓発',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        コンテナフォーマットの仕様や特徴を簡潔に解説し、幅広いユーザーに普及させるためのドキュメントを提供します。
      </>
    ),
  },
  {
    title: '利活用促進',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        コンテナを利用するアプリの実例を提供することで、ユーザが有効にコンテナを利活用する一助とします。
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
