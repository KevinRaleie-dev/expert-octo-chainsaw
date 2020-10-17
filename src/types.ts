import { EntityManager, } from "typeorm";

export type AppContext = {
    ctx: EntityManager
}