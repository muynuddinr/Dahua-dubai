import { NextRequest, NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth';

// Use environment variables for credentials
const DEMO_ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@dahuva.com',
  password: process.env.ADMIN_PASSWORD || 'Admin@123',
  id: 'admin-001',
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Verify credentials
    if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
      const token = generateToken({ email: DEMO_ADMIN.email, id: DEMO_ADMIN.id });

      // Respond and set httpOnly cookie so client-side JS cannot tamper with it.
      const res = NextResponse.json(
        {
          success: true,
          message: 'Login successful',
          user: {
            email: DEMO_ADMIN.email,
            id: DEMO_ADMIN.id,
          },
        },
        { status: 200 }
      );

      const secure = process.env.NODE_ENV === 'production';
      res.cookies.set('admin_token', token, {
        httpOnly: true,
        secure,
        sameSite: 'lax',
        path: '/',
        maxAge: 24 * 60 * 60,
      });

      return res;
    }

    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
