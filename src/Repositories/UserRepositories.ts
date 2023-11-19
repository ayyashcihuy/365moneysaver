import { IUser } from "../Interface/IUser";
import { PrismaClient as UserClient } from "../../prisma/User/client";
import { DbUser, User } from "../Types/User";
import { ClientError } from "../Errors/ClientError";

export class UserRepositories implements IUser {
    private readonly userClient: UserClient;

    constructor(_userClient: UserClient) {
        this.userClient = _userClient;
    }

    async getUsers(): Promise<DbUser[]> {
        const userData = await this.userClient.user.findMany()

        return userData;
    }

    async getSingleUser(id: number): Promise<DbUser | null> {
        if (id == null) throw new ClientError("invalid user id");

        const user = await this.userClient.user.findFirst({
            where: {
                id: id
            }
        });

        return user;
    }

    async createUser(data: User): Promise<void> {
        await this.userClient.user.create({
            data: data
        });

        return;
    }

    async updateUser(id: number, data: User): Promise<void> {
        if (id == null) throw new ClientError("invalid user id");

        await this.userClient.user.update({
            where: {
                id: id
            },
            data: data
        })

        return;
    }

    async deleteUser(id: number): Promise<void> {
        if (id == null) throw new ClientError("invalid user id");

        await this.userClient.user.delete({
            where: {
                id: id
            }
        })

        return;
    }
}