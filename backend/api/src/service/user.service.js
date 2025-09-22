import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//READ - GET
export async function getUser() {
    const rows = await prisma.usuarios.findMany();
    return rows;
}