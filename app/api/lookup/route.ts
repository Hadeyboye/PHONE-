import { NextRequest, NextResponse } from 'next/server';
import { lookupNumber } from '@/lib/api';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  // For demo, skip full auth or implement NextAuth properly
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { number, bulk } = await req.json();

  if (bulk && Array.isArray(number)) {
    const results = [];
    for (const num of number.slice(0, 10)) { // Limit for demo
      const res = await lookupNumber(num);
      results.push({ number: num, ...res });
      await new Promise(resolve => setTimeout(resolve, 1200)); // Rate limit
    }
    return NextResponse.json({ results });
  }

  const data = await lookupNumber(number);
  
  // Save to DB (demo)
  // await prisma.lookup.create({...});

  return NextResponse.json(data);
}