import { Auth } from "core/api/Auth";
import jwt_decode from "jwt-decode";
import { Credentials } from "core/api/types";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { pages } from "constants/pages";

export default NextAuth({
  pages: {
    error: pages.login,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        return {
          ...token,
          data: user.data,
          accessToken: user.accessToken as string,
          refreshToken: user.refreshToken as string,
          accessTokenExpires: user.accessTokenExpires as number,
        };
      } else {
        // refreshToken here
        console.log(token);
        return token;
      }
    },
    async session({ session, token }) {
      return {
        ...session,
        user: token,
      };
    },
  },

  providers: [
    CredentialsProvider({
      name: "email & password",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const json = await Auth.login(credentials as Credentials);

          const tokenData = jwt_decode<any>(json.accessToken as string);

          return {
            accessToken: json.accessToken,
            refreshToken: json.refreshToken,
            data: json.data,
            accessTokenExpires: Date.now() + tokenData.exp,
          } as any;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
});
