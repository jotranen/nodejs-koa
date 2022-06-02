import "reflect-metadata"

import { DataSource, QueryRunner } from "typeorm";

import {Question} from "../entities/question"

import {Logger} from "typeorm";
import { logger } from "../server";

export class TsLogger implements Logger {
    logQuery(query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
        const requestUrl = queryRunner && queryRunner.data["request"] ? "(" + queryRunner.data["request"].url + ") " : "";
        logger.info(requestUrl + query);
    }
    logQueryError(error: string | Error, query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
        logger.error("QueryError: " + error + ":" + query);
    }
    logQuerySlow(time: number, query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
        logger.warn("QuerySlow: " + time + ":" + query);
    }
    logSchemaBuild(message: string, queryRunner?: QueryRunner | undefined) {
        logger.info("SchemaBuild:" + message);
    }
    logMigration(message: string, queryRunner?: QueryRunner | undefined) {
        logger.info("Migration: " + message);
    }
    log(level: "warn" | "info" | "log", message: any, queryRunner?: QueryRunner | undefined) {
        logger.error("What??? Level: " + level + " message: " + message);
    }
    // implement all methods from logger class 
}

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "party",
    password: "party",
    database: "party_db",
    synchronize: true,
    logger: new TsLogger(),
    logging: ["error"],
    maxQueryExecutionTime: 1000,
    entities: [Question],
    subscribers: [],
    migrations: [],
})