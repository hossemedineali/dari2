import { router } from "../trpc";
import { adduser } from "./user/adduser";
import { authRouter } from "./auth";
import { verifyEmail } from "./auth/verifyemail";
import {favorites} from "./posts.ts/favposts"
import { getUser } from "./user/getuser";
import { updateUser } from "./user/updateUser";
import { reset } from "./user/resetPassWord";

export const appRouter = router({
  auth: authRouter,
  adduser:adduser,
  verfy:verifyEmail,
  favorites:favorites,
  getuser:getUser,
  updateUser:updateUser,
  reset:reset
});

// export type definition of API
export type AppRouter = typeof appRouter;
