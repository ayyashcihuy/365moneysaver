import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class Controller {
  static async createUser(req: Request, res: Response) {
    const { email, password, motive } = req.body;
    const newUser = {
      email: String(email),
      password: String(password),
      motive: String(motive),
    };
    await prisma.user.create({
      data: newUser,
    });
    res.status(201).json({
      data: newUser,
      message: `Welcome ${email} !!!`,
    });
  }

  static async getUser(req: Request, res: Response) {
    const user = await prisma.user.findMany();
    res.status(200).json({ user });
  }

  static async updateUser(req: Request, res: Response) {
    const id = +req.params.id;
    const { email, password, motive } = req.body;
    const newData = {
      email: String(email),
      password: String(password),
      motive: String(motive),
    };
    await prisma.user.update({
      where: {
        id,
      },
      data: newData,
    });
    res.status(200).json({
      message: `${id} data updated!!`,
    });
  }

  static async deleteUser(req: Request, res: Response) {
    const id = +req.params.id;
    await prisma.user.delete({
      where: {
        id,
      },
    });
    res.status(200).json({
      message: `User with id: ${id} deleted!!`,
    });
  }
}

module.exports = Controller;
