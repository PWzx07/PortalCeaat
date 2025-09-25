import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "seu_segredo_super_secreto";

// READ - GET
export async function getUser() {
  return await prisma.usuarios.findMany();
}

// FILTER - GET
export async function filterUser(id) {
  return await prisma.usuarios.findUnique({ where: { id } });
}

// CREATE - POST
export async function createUser(db) {
  const hashedPassword = await bcrypt.hash(db.senha, 10);

  return await prisma.usuarios.create({
    data: {
      nome: db.nome,
      email: db.email,
      senha: hashedPassword,
      tipo: db.tipo,
    },
  });
}

// UPDATE - PUT
export async function updateUser(id, db) {
  let updateData = {
    nome: db.nome,
    email: db.email,
    tipo: db.tipo,
  };

  if (db.senha) {
    const updateHashedPassword = await bcrypt.hash(db.senha, 10);
    updateData.senha = updateHashedPassword;
  }

  return await prisma.usuarios.update({
    where: { id },
    data: updateData,
  });
}

// DELETE - DELETE
export async function deleteUser(id) {
  const exist = await prisma.usuarios.findUnique({ where: { id } });
  if (!exist) return null;

  return await prisma.usuarios.delete({ where: { id } });
}

// LOGIN - POST
export async function loginUser(email, senha) {
  const user = await prisma.usuarios.findUnique({ where: { email } });
  if (!user) return null;

  const valid = await bcrypt.compare(senha, user.senha);
  if (!valid) return null;

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token, user };
}
