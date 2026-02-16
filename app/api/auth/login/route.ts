import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/server/prisma';
import { signAuthToken } from '@/lib/server/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signAuthToken({ userId: user.id, role: user.role });

    return NextResponse.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    console.error('Login error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
