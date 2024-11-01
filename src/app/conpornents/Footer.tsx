'use client';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* サービス情報 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ChatResponse</h3>
            <p className="text-gray-300">
              効率的なメッセージ管理と分析を提供するサービス
            </p>
          </div>

          {/* リンク */}
          <div>
            <h3 className="text-lg font-semibold mb-4">リンク</h3>
            <ul className="space-y-2">
              <li>
                <a href="/users/dashboard" className="text-gray-300 hover:text-white">
                  ダッシュボード
                </a>
              </li>
              <li>
                <a href="/users/settings" className="text-gray-300 hover:text-white">
                  設定
                </a>
              </li>
            </ul>
          </div>

          {/* お問い合わせ */}
          <div>
            <h3 className="text-lg font-semibold mb-4">お問い合わせ</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                メール: support@chatresponse.com
              </li>
              <li className="text-gray-300">
                電話: 03-XXXX-XXXX
              </li>
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} ChatResponse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
