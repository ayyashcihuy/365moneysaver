export class ClientError extends Error {
    constructor(message: string) {
        if (message === "") {
            throw new TypeError("Message cannot be empty");
        }

        super(message);
    }
}