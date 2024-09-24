//import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { name, privacy } = await req.json();

        console.log(name);
        console.log(privacy);
        
        const gameroom = await prisma.gameroom.create({
            data: {
                name,
                privacy,
                createdat: new Date().toISOString(), // Add this line
            },
        });
        return NextResponse.json({ message: 'Data received', gameroom }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const id = req.nextUrl.searchParams.get('id');
        if (id) {
            const gameroom = await prisma.gameroom.findUnique({
                where: {
                    id: parseInt(id, 10),
                },
            });
            return NextResponse.json({ message: 'Data received', gameroom }, { status: 200 });
        } else if (req.nextUrl.searchParams.get('public') === 'true') {
            const gamerooms = await prisma.gameroom.findMany({
                where: {
                    privacy: false,
                },
            });
            return NextResponse.json({ message: 'Data received', gamerooms }, { status: 200 });
        } else {
            const gamerooms = await prisma.gameroom.findMany();
            return NextResponse.json({ message: 'Data received', gamerooms }, { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest, res: NextResponse) {
    try {
        const id = req.nextUrl.searchParams.get('id');
        if (id) {
            const gameroom = await prisma.gameroom.delete({
                where: {
                    id: parseInt(id, 10),
                },
            });
            return NextResponse.json({ message: 'Data deleted', gameroom }, { status: 200 });
        }
        return NextResponse.json({ error: 'No id provided' }, { status: 400 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
