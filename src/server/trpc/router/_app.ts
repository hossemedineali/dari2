import { router } from "../trpc";
import { adduser } from "./user/adduser";
import { authRouter } from "./auth";
import { verifyEmail } from "./auth/verifyemail";
import {favorites} from "./posts/favposts"
import { getUser } from "./user/getuser";
import { updateUser } from "./user/updateUser";
import { reset } from "./user/resetPassWord";
import { addPost } from "./posts/addpost";
import { deletePost } from "./posts/deletePosts";
import { querryPosts } from "./posts/querryPosts";
import { modify } from "./posts/modify";

export const appRouter = router({
  auth: authRouter,
  adduser:adduser,
  verfy:verifyEmail,
  favorites:favorites,
  getuser:getUser,
  updateUser:updateUser,
  reset:reset,
  addPost:addPost,
  deletePost:deletePost,
  querryPosts:querryPosts,
  modify:modify
});

// export type definition of API
export type AppRouter = typeof appRouter;
