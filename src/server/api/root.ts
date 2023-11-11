import { createTRPCRouter } from "./trpc";
import { apiRouter } from "./routers/api";
import { prismaRouter } from "./routers/prisma";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  api: apiRouter,
  prismaRouter: prismaRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
