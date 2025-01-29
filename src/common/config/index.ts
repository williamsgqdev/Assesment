import { config } from "dotenv"

config()

export const Config = Object.freeze({
    PORT: process.env.PORT,
})