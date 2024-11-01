'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen">
      <div className="p-4">
        <nav className="space-y-2">
          {session && (
            <>
              {/* ユーザー向けメニュー */}
              <div className="py-4">
                <h3 className="px-3 text-sm font-semibold text-gray-400 uppercase">ユーザーメニュー</h3>
                <div className="mt-2 space-y-1">
                  <Link href="/users/dashboard" className="block px-3 py-2 rounded-md hover:bg-gray-700">
                    ダッシュボード
                  </Link>
                  <Link href="/users/settings" className="block px-3 py-2 rounded-md hover:bg-gray-700">
                    設定
                  </Link>
                </div>
              </div>

              {/* 管理者向けメニュー */}
              {session.user?.role === 'ADMIN' && (
                <div className="py-4">
                  <h3 className="px-3 text-sm font-semibold text-gray-400 uppercase">管理者メニュー</h3>
                  <div className="mt-2 space-y-1">
                    <Link href="/admin/dashboard" className="block px-3 py-2 rounded-md hover:bg-gray-700">
                      管理者ダッシュボード
                    </Link>
                    <Link href="/admin/users" className="block px-3 py-2 rounded-md hover:bg-gray-700">
                      ユーザー管理
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
