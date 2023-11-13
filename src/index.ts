import express from 'express';
import { UserRouter } from './Routers/UserRouter';

const port = Number(process.env.PORT) || 3000;
const host = process.env.host || 'localhost';

(async () => {
    // Init Application 
    const app = express();

    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");

        res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT");

        res.setHeader("Access-Control-Allow-Headers", "content-type,accept,Authorization,set-cookie");
        res.setHeader("Access-Control-Allow-Credentials", "true");

        if (req.method.toUpperCase() === "OPTIONS") {
            res.statusCode = 204;
            res.setHeader("Content-Length", 0);
            res.end();
            return;
        }
        next();
    })

    app.use(express.json());

    app.use("/api/v1/user", UserRouter());

    app.listen(port, host, () => {
        console.log(`Application is running on: http://${host}:${port}`);
    });
})();