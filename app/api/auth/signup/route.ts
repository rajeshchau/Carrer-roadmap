import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/server/prisma';
import { signAuthToken } from '@/lib/server/auth';
import { toApiError } from '@/lib/server/errors';

export async function POST(request: Request) {
  try {
    const prisma = getPrisma();
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: await bcrypt.hash(password, 10),
      },
    });

    const token = signAuthToken({ userId: user.id, role: user.role });

    return NextResponse.json(
      {
        message: 'User created successfully',
        token,
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error', error);
    const mapped = toApiError(error);
    return NextResponse.json({ error: mapped.error }, { status: mapped.status });
  }
}
