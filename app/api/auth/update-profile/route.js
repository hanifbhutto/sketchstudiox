import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req) {
  try {
    const body = await req.json();
    const { email, name, phone, address, city, country } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required for updating profile.' }, { status: 400 });
    }

    // Clean data object without any dangling syntax symbols
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;
    if (city !== undefined) updateData.city = city;
    if (country !== undefined) updateData.country = country;

    const updatedUser = await prisma.user.update({
      where: { email },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        country: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Patron profile updated successfully.',
      user: updatedUser,
    }, { status: 200 });

  } catch (error) {
    console.error('Update Profile Error:', error);
    return NextResponse.json({ error: 'Internal server error while updating profile.' }, { status: 500 });
  }
}