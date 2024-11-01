'use client';

import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* ロゴ */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold">
                ChatResponse
              </Link>
            </div>

            {/* メインナビゲーション */}
            {session && (
              <nav className="hidden md:ml-6 md:flex md:space-x-8">
                <Link href="/users/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:text-gray-700">
                  ダッシュボード
                </Link>
                <Link href="/users/settings" className="px-3 py-2 rounded-md text-sm font-medium hover:text-gray-700">
                  設定
                </Link>
                {session.user?.role === 'ADMIN' && (
                  <>
                    <Link href="/admin/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:text-gray-700">
                      管理者ダッシュボード
                    </Link>
                    <Link href="/admin/users" className="px-3 py-2 rounded-md text-sm font-medium hover:text-gray-700">
                      ユーザー管理
                    </Link>
                  </>
                )}
              </nav>
            )}
          </div>

          {/* 認証ボタン */}
          <div className="flex items-center">
            {session ? (
              <button
                onClick={() => signOut()}
                className="ml-4 px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                ログアウト
              </button>
            ) : (
              <div className="space-x-4">
                <button
                  onClick={() => signIn()}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  ログイン
                </button>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                >
                  新規登録
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
