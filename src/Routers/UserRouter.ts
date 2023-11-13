import { Router } from "express";

export function UserRouter(): Router {
    const router = Router();

    router.get("/user", (_req, res) => res.status(200).json("User ID *** GET"))
    router.post("/create", (_req, res) => res.status(200).json("Created"))

    return router;
}