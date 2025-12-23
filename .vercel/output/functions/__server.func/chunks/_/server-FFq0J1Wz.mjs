import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { v7 } from "uuid";
import { H as HEADERS, S as StartServer, c as createStartHandler, d as defaultStreamHandler, g as getRequestHeaders, a as getResponse, r as requestHandler, s as setCookie } from "./server.mjs";
import "@tanstack/router-core/ssr/server";
const votersTable = sqliteTable("voters", {
  id: text("id").primaryKey(),
  fingerprint: text("fingerprint").notNull(),
  email: text("email"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  votedOn: text("voted_on")
});
createSelectSchema(votersTable);
createInsertSchema(votersTable);
const wrestlersTable = sqliteTable("wrestlers", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  school: text("school").notNull()
});
createSelectSchema(wrestlersTable);
createInsertSchema(wrestlersTable);
const baseWrestlersSchema = z.array(
  z.object({
    id: z.string().transform(() => v7()),
    name: z.string(),
    school: z.string()
  })
);
const wrestlerUpdateSchema = z.object({
  id: z.uuid({ version: "v7" }),
  newValues: z.object({
    name: z.string().nullish(),
    school: z.string().nullish()
  }).refine((val) => val.name !== void 0 || val.school !== void 0, {
    error: "Must Update Name or School"
  })
});
const votesTable = sqliteTable("votes", {
  id: text("id").primaryKey(),
  voterId: text("voter_id").references(() => votersTable.id, {
    onDelete: "cascade"
  }),
  wrestlerId: text("wrestler_id").references(() => wrestlersTable.id, {
    onDelete: "cascade"
  }),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`).notNull()
});
createSelectSchema(votesTable);
createInsertSchema(votesTable);
const serverFFq0J1Wz = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  HEADERS,
  StartServer,
  attachRouterServerSsrUtils,
  createStartHandler,
  defaultStreamHandler,
  getRequestHeaders,
  getResponse,
  requestHandler,
  setCookie
});
export {
  votersTable as a,
  baseWrestlersSchema as b,
  wrestlerUpdateSchema as c,
  serverFFq0J1Wz as s,
  votesTable as v,
  wrestlersTable as w
};
