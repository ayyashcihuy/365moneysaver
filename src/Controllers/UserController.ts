import { Request, Response } from "express";
import { z } from "zod";
import { IUser } from "../Interface/IUser";
import { ServerError } from "../Errors/ServerError";
import { ClientError } from "../Errors/ClientError";

export class UserController {
    private readonly userRepositories: IUser;

    constructor(user: IUser) {
        this.userRepositories = user;
    }

    public async CreateUser(req: Request, res: Response): Promise<void> {
        try {
            const requestRule = z.object({
                email: z.string().trim().email({ message: "please input valid email!"}),
                password: z.string().trim()
                .min(8, { message: "please input password with more than or equal to 8 characters!"})
                .max(16, { message: "please input a valid password!"}),
                name: z.string().trim(),
                year: z.number(),
                job: z.string(),
                monthlyIncome: z.number()
            })

            const parsedRequest = requestRule.parse(req.body);

            await this.userRepositories.createUser(parsedRequest);

            res.status(201).json({
                status: "User created successfully"
            });
        } catch (err) {
            console.log(err);
        }
    }

    public async GetAllUser(_req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userRepositories.getUsers();

            if (user.length === 0) {
                throw new ServerError("No users available on our database.")
            }

            res.status(200).json({
                status: "Success",
                data: user
            })
        } catch (err) {
            console.log(err);
        }
    }

    public async getSingleUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.query;

            if (id == null || id === "") throw new ClientError("id cannot be empty");

            const user = await this.userRepositories.getSingleUser(Number(id));

            if(user == null) throw new ClientError("User not found!");

            res.status(200).json({
                status: "Found",
                data: user
            })
        } catch (err) {
            //TODO handle error with next() - also for all above
            console.log(err)
        }
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.query;

            if (id == null || id === "") throw new ClientError("id cannot be empty");

            const requestRule = z.object({
                email: z.string().trim().email({ message: "please input valid email!"}),
                password: z.string().trim()
                .min(8, { message: "please input password with more than or equal to 8 characters!"})
                .max(16, { message: "please input a valid password!"}),
                name: z.string().trim(),
                year: z.number(),
                job: z.string(),
                monthlyIncome: z.number()
            })

            const parsedRequest = requestRule.parse(req.body);

            await this.userRepositories.updateUser(Number(id), parsedRequest);

            res.status(200).json({
                status: `user id: ${id} updated successfully`
            });
        } catch (err) {
            //TODO handle error with next() - also for all above
            console.log(err)
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.query;

            if (id == null || id === "") throw new ClientError("id cannot be empty")

            await this.userRepositories.deleteUser(Number(id));

            res.status(200).json({
                status: `user with id: ${id} deleted successfully`
            });
            
        } catch(err) {
            //TODO handle error with next() - also for all above
            console.log(err)
        };
    }
}