import { router } from "../trpc";
import { adduser } from "./adduser";
import { authRouter } from "./auth";

export const appRouter = router({
  auth: authRouter,
  adduser:adduser
});

// export type definition of API
export type AppRouter = typeof appRouter;
