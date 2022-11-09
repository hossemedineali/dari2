import { type DefaultSession } from "next-auth";
import { TokenEndpointHandler } from "next-auth/providers";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
 export interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
}
