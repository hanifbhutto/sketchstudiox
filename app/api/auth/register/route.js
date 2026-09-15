import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Collector account already exists with this email.' }, { status: 400 });
    }

    // Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        name: name || 'Valued Patron',
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Account created successfully.', 
      user: { id: user.id, name: user.name, email: user.email } 
    }, { status: 201 });

  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}