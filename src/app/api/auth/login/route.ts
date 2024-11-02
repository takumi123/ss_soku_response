// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // 入力値のバリデーション
    if (!email || !password) {
      return NextResponse.json(
        { error: 'メールアドレスとパスワードを入力してください。' },
        { status: 400 }
      );
    }

    // ユーザー認証
    const user = await authenticateUser(email, password);

    if (user) {
      // 認証成功
      return NextResponse.json({
        message: 'ログインに成功しました。',
        user: user
      });
    } else {
      // 認証失敗
      return NextResponse.json(
        { error: 'メールアドレスまたはパスワードが正しくありません。' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('認証エラー:', error);
    return NextResponse.json(
      { error: '認証中にエラーが発生しました。' },
      { status: 500 }
    );
  }
}

// ユーザー認証のための関数
async function authenticateUser(email: string, password: string) {
  try {
    // データベースからユーザーを検索
    const user = await prisma.user.findUnique({
      where: { 
        email,
        deletedAt: null // 削除されていないユーザーのみを検索
      },
    });

    if (!user) {
      return null;
    }

    // パスワードの照合
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return null;
    }

    // パスワードを除外してユーザー情報を返す
    const userWithoutPassword = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      companyId: user.companyId,
      departmentId: user.departmentId,
      chatworkId: user.chatworkId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt
    };

    return userWithoutPassword;
  } catch (error) {
    console.error('ユーザー認証エラー:', error);
    throw error;
  }
}
