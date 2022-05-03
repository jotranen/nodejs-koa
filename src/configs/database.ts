import "reflect-metadata"

import { DataSource } from "typeorm";

import {Question} from "../entities/question"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "party",
    password: "party",
    database: "party_db",
    synchronize: true,
    logging: true,
    entities: [Question],
    subscribers: [],
    migrations: [],
})