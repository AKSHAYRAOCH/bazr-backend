import { betterAuth } from "better-auth";
import {drizzleAdapter} from "better-auth/adapters/drizzle";
import db from "../db/db";
import { schema } from "../db/schema";

export const auth = betterAuth({
    database: drizzleAdapter(db,
        {
            schema: {
                ...schema
            },
        provider: "pg"
    })
    ,socialProviders:{
        google:{
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
        }
    }
})