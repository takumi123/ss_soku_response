import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 入力値のバリデーション
    if (!email || !password) {
      return NextResponse.json(
        { error: 'メールアドレスとパスワードを入力してください。' },
        { status: 400 }
      );
    }

    // 既存ユーザーの確認
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'このメールアドレスは既に登録されています。' },
        { status: 409 }
      );
    }

    // デモ会社の作成または取得
    let demoCompany = await prisma.company.findFirst({
      where: { name: 'デモ会社' }
    });

    if (!demoCompany) {
      demoCompany = await prisma.company.create({
        data: {
          name: 'デモ会社',
          businessHoursStart: new Date('2000-01-01T09:00:00'),
          businessHoursEnd: new Date('2000-01-01T17:30:00'),
        }
      });
    }

    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // ユーザーの作成
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: email.split('@')[0], // メールアドレスの@前をユーザー名として使用
        role: 'USER',
        companyId: demoCompany.id,
        chatworkId: `demo-${Date.now()}`,
      },
    });

    // パスワードを除外してレスポンス
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

    return NextResponse.json(
      {
        message: 'ユーザー登録が成功しました。',
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('ユーザー登録エラー:', error);
    return NextResponse.json(
      { error: 'ユーザー登録中にエラーが発生しました。' },
      { status: 500 }
    );
  }
}
