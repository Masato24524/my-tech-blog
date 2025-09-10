"use clinet";

import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div>
      <div id="content" className="privacy-policy w-fit p-4">
        <header className="privacy-header text-center">
          <h1>プライバシーポリシー</h1>
          <p className="last-updated text-right">最終更新日：2025年9月10日</p>
        </header>

        <div className="privacy-content mt-4">
          <p className="intro">
            {`Masato's-tech-blog`}
            （以下「当サイト」）は、お客様の個人情報の保護を重要視し、個人情報保護法やその他関係法令を遵守するとともに、以下のプライバシーポリシーに従って適切な取り扱いと保護に努めます。
          </p>

          <section className="privacy-section">
            <h2>1. 収集する個人情報</h2>

            <div className="subsection">
              <h3>1.1 お問い合わせ時</h3>
              <ul>
                <li>お名前</li>
                <li>メールアドレス</li>
                <li>お問い合わせ内容</li>
              </ul>
            </div>

            <div className="subsection">
              <h3>1.2 アクセス解析</h3>
              <ul>
                <li>
                  アクセス情報（IPアドレス、ブラウザ情報、アクセス日時など）
                </li>
                <li>サイト内の閲覧ページ・滞在時間</li>
                <li>参照元サイト情報</li>
              </ul>
            </div>
          </section>

          <section className="privacy-section">
            <h2>2. 個人情報の利用目的</h2>
            <p>収集した個人情報は、以下の目的でのみ利用いたします。</p>
            <ul>
              <li>お問い合わせへの対応</li>
              <li>サイトの改善・最適化</li>
              <li>統計データの作成（個人を特定できない形式）</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>3. 第三者への提供</h2>
            <p>
              当サイトは、法令に基づく場合を除き、お客様の同意なしに第三者に個人情報を提供することはありません。
            </p>
          </section>

          <section className="privacy-section">
            <h2>4. 広告配信について</h2>

            <div className="subsection">
              <h3>4.1 Google AdSense</h3>
              <p>
                当サイトでは、Google AdSenseによる広告配信を行っております。
              </p>
              <ul>
                <li>
                  Googleは、当サイトや他のサイトへの過去のアクセス情報に基づいて広告を配信します
                </li>
                <li>Googleは広告配信のためにCookieを使用することがあります</li>
                <li>
                  Cookieを無効にする方法や、Google AdSenseに関する詳細は、
                  <a
                    href="https://support.google.com/adsense/answer/1348695?hl=ja"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google AdSenseポリシー
                  </a>
                  をご確認ください
                </li>
              </ul>
            </div>

            <div className="subsection">
              <h3>4.2 もしもアフィリエイト</h3>
              <p>
                当サイトでは、もしもアフィリエイトによる広告配信を行っております。
              </p>
              <ul>
                <li>商品紹介のためのアフィリエイトリンクを設置しています</li>
                <li>
                  アフィリエイトサービスでは、お客様の行動履歴情報を収集する場合があります
                </li>
                <li>
                  詳細は
                  <a
                    href="https://af.moshimo.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    もしもアフィリエイトプライバシーポリシー
                  </a>
                  をご確認ください
                </li>
              </ul>
            </div>
          </section>

          <section className="privacy-section">
            <h2>5. アクセス解析について</h2>

            <div className="subsection">
              <h3>5.1 Google Analytics</h3>
              <p>
                当サイトでは、Googleによるアクセス解析ツール「Google
                Analytics」を利用しています。
              </p>
              <ul>
                <li>
                  Google
                  Analyticsは、トラフィックデータの収集のためにCookieを使用しています
                </li>
                <li>
                  このトラフィックデータは匿名で収集されており、個人を特定するものではありません
                </li>
                <li>
                  Cookieを無効にすることで、これらの情報の収集を拒否することができます
                </li>
                <li>
                  Google Analyticsについて詳しくは
                  <a
                    href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    こちら
                  </a>
                  をご確認ください
                </li>
              </ul>
            </div>
          </section>

          <section className="privacy-section">
            <h2>6. Cookieについて</h2>
            <p>当サイトでは、サービス向上のためにCookieを使用しています。</p>

            <div className="subsection">
              <h3>6.1 Cookieとは</h3>
              <p>
                Cookieとは、ウェブサイトを利用したときに、ブラウザとサーバーとの間で送受信した利用履歴や入力内容などを、お客様のコンピュータにファイルとして保存しておく仕組みです。
              </p>
            </div>

            <div className="subsection">
              <h3>6.2 Cookieの設定</h3>
              <p>
                お客様はブラウザの設定により、Cookieの受け取りを拒否することができます。ただし、Cookieを拒否した場合、サイトの一部機能がご利用いただけない場合があります。
              </p>
            </div>
          </section>

          <section className="privacy-section">
            <h2>7. 個人情報の管理・保護</h2>
            <p>
              当サイトは、お客様の個人情報を適切に管理し、以下の通り保護に努めます。
            </p>
            <ul>
              <li>
                個人情報への不正アクセス、紛失、破損、改ざん、漏洩などを防止するため、適切なセキュリティ対策を実施
              </li>
              <li>
                個人情報の取り扱いを委託する場合は、委託先に対して適切な監督を実施
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>8. お問い合わせ</h2>
            <p>
              個人情報の取り扱いに関するお問い合わせは、以下よりご連絡ください。
            </p>
            <p>
              <a href="/contact" className="contact-link">
                お問い合わせページ
              </a>
            </p>
          </section>

          <section className="privacy-section">
            <h2>9. プライバシーポリシーの変更</h2>
            <p>
              当プライバシーポリシーは、法令の変更や当サイトの運営方針の変更に伴い、予告なく変更することがあります。変更後のプライバシーポリシーについては、当ページに掲載した時点で効力を生じるものとします。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
