import { b as createServerRpc, e as createServerFn } from "./server.mjs";
import { eq, sql, desc, asc, or, gt } from "drizzle-orm";
import { v7 } from "uuid";
import z__default from "zod";
import { drizzle } from "drizzle-orm/libsql";
import { b as baseWrestlersSchema, w as wrestlersTable, v as votesTable, a as votersTable, c as wrestlerUpdateSchema } from "./server-FFq0J1Wz.mjs";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core";
import "node:async_hooks";
import "@tanstack/router-core/ssr/server";
import "../../index.mjs";
import "tiny-invariant";
import "seroval";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
import "drizzle-orm/sqlite-core";
import "drizzle-zod";
const db = drizzle({
  connection: {
    url: process.env.TURSO_CONNECTION_URL,
    authToken: process.env.TURSO_AUTH_TOKEN
  }
});
const getAllWrestlers_createServerFn_handler = createServerRpc("dc5575e1597bb3e4a610bdbdfee2f8fe77e08c2e899e3326e8635f6ba5fca976", (opts, signal) => {
  return getAllWrestlers.__executeServer(opts, signal);
});
const getAllWrestlers = createServerFn({
  method: "GET"
}).handler(getAllWrestlers_createServerFn_handler, async () => {
  const query = db.select().from(wrestlersTable);
  const wrestlers = await query.execute();
  return {
    data: wrestlers
  };
});
const getAllVotes_createServerFn_handler = createServerRpc("2325302c7035482b494b455b1e0f01db51897bf75cc174eebb4aeda75f640087", (opts, signal) => {
  return getAllVotes.__executeServer(opts, signal);
});
const getAllVotes = createServerFn({
  method: "GET"
}).handler(getAllVotes_createServerFn_handler, async () => {
  const query = db.select().from(votesTable);
  const votes = await query.execute();
  return {
    data: votes
  };
});
const getWrestlers_createServerFn_handler = createServerRpc("8b6e1261a0cb5fdf8fb26c5c338aecc3981b29a594676ccfcd89d8da1efbd79f", (opts, signal) => {
  return getWrestlers.__executeServer(opts, signal);
});
const getWrestlers = createServerFn({
  method: "GET"
}).inputValidator((data) => ({
  cursor: data.cursor,
  pageSize: data.pageSize ?? 20,
  search: data.search ?? ""
})).handler(getWrestlers_createServerFn_handler, async ({
  data
}) => {
  const {
    cursor,
    pageSize,
    search
  } = data;
  const query = db.select().from(wrestlersTable).orderBy(asc(wrestlersTable.id)).limit(pageSize);
  if (search) {
    query.where(or(sql`${wrestlersTable.name} LIKE ${"%" + search + "%"}`, sql`${wrestlersTable.school} LIKE ${"%" + search + "%"}`));
  }
  if (cursor) {
    query.where(gt(wrestlersTable.id, cursor));
  }
  const wrestlers = await query.execute();
  const lastCursor = wrestlers.length === pageSize ? wrestlers[wrestlers.length - 1]?.id : void 0;
  return {
    data: wrestlers,
    pagination: {
      lastCursor,
      pageSize
    },
    search
  };
});
const submitVote_createServerFn_handler = createServerRpc("2ffe74429b89e07aeba6eb9cca167a2293bd910474af4f1722aed2dbc5d76466", (opts, signal) => {
  return submitVote.__executeServer(opts, signal);
});
const submitVote = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(submitVote_createServerFn_handler, async ({
  data
}) => {
  const query = db.select().from(votersTable).where(eq(votersTable.fingerprint, data.fingerprint));
  const voter = await query.execute();
  if (voter.length > 0) {
    return {
      success: false,
      message: "Looks like you have already voted."
    };
  }
  const voterRes = await db.insert(votersTable).values({
    id: v7(),
    fingerprint: data.fingerprint,
    email: "None",
    votedOn: (/* @__PURE__ */ new Date()).toISOString()
  }).returning({
    voterId: votersTable.id
  });
  const {
    voterId
  } = voterRes[0];
  await db.insert(votesTable).values({
    id: v7(),
    wrestlerId: data.wrestlerId,
    voterId
  });
  return {
    success: true,
    message: "Thank you for Voting!"
  };
});
const updateWrestler_createServerFn_handler = createServerRpc("8d187bc956eef3c4b3810b8a2afbe71ec37ded6abc16e95a7758dd8d3ab9c123", (opts, signal) => {
  return updateWrestler.__executeServer(opts, signal);
});
const updateWrestler = createServerFn({
  method: "POST"
}).inputValidator((data) => {
  try {
    return wrestlerUpdateSchema.parse(data);
  } catch (error) {
    console.error(error);
    if (error instanceof z__default.ZodError) {
      throw new Error(z__default.prettifyError(error));
    }
    throw new Error("Failed to validate input");
  }
}).handler(updateWrestler_createServerFn_handler, async ({
  data
}) => {
  console.info({
    message: "Updating Wrestler",
    data
  });
  const updateValues = Object.fromEntries(Object.entries(data.newValues).filter(([_, v]) => v != null));
  const query = db.update(wrestlersTable).set(updateValues).where(eq(wrestlersTable.id, data.id)).returning({
    id: wrestlersTable.id,
    name: wrestlersTable.name
  });
  const wrestler = await query.execute();
  if (wrestler.length === 0) {
    return {
      message: "Wrestler no Found",
      success: false
    };
  }
  return {
    message: `Updated ${wrestler[0].name}`,
    success: true
  };
});
const addWrestlers_createServerFn_handler = createServerRpc("b33281046d8b6459bc2ff3a56176424faaf804b4e9f99af6f03f80e6931c1037", (opts, signal) => {
  return addWrestlers.__executeServer(opts, signal);
});
const addWrestlers = createServerFn({
  method: "POST"
}).inputValidator((data) => {
  try {
    return baseWrestlersSchema.parse(data);
  } catch (error) {
    console.error(error);
    if (error instanceof z__default.ZodError) {
      throw new Error(z__default.prettifyError(error));
    }
    throw new Error("failed validate input to add Wrestler");
  }
}).handler(addWrestlers_createServerFn_handler, async ({
  data
}) => {
  console.info({
    message: "Adding Wrestler",
    data
  });
  const wrestlers = await db.insert(wrestlersTable).values(data).onConflictDoNothing().returning({
    id: wrestlersTable.id,
    name: wrestlersTable.name,
    school: wrestlersTable.school
  });
  if (wrestlers.length === 0) {
    return {
      message: "Failed to add wrestler",
      success: false
    };
  }
  return {
    message: `Added Wrestler${wrestlers.length > 1 ? "s" : ""}`,
    success: true,
    data: wrestlers
  };
});
const deleteWrestler_createServerFn_handler = createServerRpc("7631bcc1835dd182bcc641df8673e57e90711ef6b1c79b32e2922586189c8140", (opts, signal) => {
  return deleteWrestler.__executeServer(opts, signal);
});
const deleteWrestler = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(deleteWrestler_createServerFn_handler, async ({
  data
}) => {
  console.info({
    message: "Deleting Wrestler",
    data
  });
  const deleted = await db.delete(wrestlersTable).where(eq(wrestlersTable.id, data)).returning({
    id: wrestlersTable.id,
    name: wrestlersTable.name,
    school: wrestlersTable.school
  });
  if (deleted.length === 0) {
    return {
      message: "Failed to delete wrestler",
      success: false
    };
  }
  return {
    message: `Deleted Wrestler${deleted.length > 1 ? "s" : ""}`,
    success: true,
    data: deleted
  };
});
const deleteAllWrestlers_createServerFn_handler = createServerRpc("990b5b9e6cfec53c759887d3d3d6bde1c1606a5404b65b91370dcb6e4137fcfd", (opts, signal) => {
  return deleteAllWrestlers.__executeServer(opts, signal);
});
const deleteAllWrestlers = createServerFn({
  method: "POST"
}).handler(deleteAllWrestlers_createServerFn_handler, async () => {
  console.info({
    message: "Deleting All Wrestler"
  });
  await db.delete(wrestlersTable);
  return {
    message: "All Wrestlers Deleted",
    success: true
  };
});
const getWrestlersWithVoteCounts_createServerFn_handler = createServerRpc("13d05cc4ba7f29789cb7471a391425062cdea104ed30ebc2027b653b14e13da8", (opts, signal) => {
  return getWrestlersWithVoteCounts.__executeServer(opts, signal);
});
const getWrestlersWithVoteCounts = createServerFn({
  method: "GET"
}).handler(getWrestlersWithVoteCounts_createServerFn_handler, async () => {
  console.info({
    message: "Getting Wrestlers with Vote Counts"
  });
  const result = await db.select({
    id: wrestlersTable.id,
    name: wrestlersTable.name,
    school: wrestlersTable.school,
    voteCount: sql`COALESCE(COUNT(${votesTable.id}), 0)`
  }).from(wrestlersTable).leftJoin(votesTable, eq(wrestlersTable.id, votesTable.wrestlerId)).groupBy(wrestlersTable.id, wrestlersTable.name, wrestlersTable.school).orderBy(desc(sql`COALESCE(COUNT(${votesTable.id}), 0)`)).execute();
  const totalVotes = result.reduce((sum, wrestler) => sum + wrestler.voteCount, 0);
  return {
    data: result,
    totalVotes
  };
});
export {
  addWrestlers_createServerFn_handler,
  deleteAllWrestlers_createServerFn_handler,
  deleteWrestler_createServerFn_handler,
  getAllVotes_createServerFn_handler,
  getAllWrestlers_createServerFn_handler,
  getWrestlersWithVoteCounts_createServerFn_handler,
  getWrestlers_createServerFn_handler,
  submitVote_createServerFn_handler,
  updateWrestler_createServerFn_handler
};
