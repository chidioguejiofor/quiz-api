import { Auth } from "core/api/Auth";
import jwt_decode from "jwt-decode";
import { Credentials } from "core/api/types";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { pages } from "constants/pages";
import { signOut } from "next-auth/react";

export default NextAuth({
  pages: {
    error: pages.login,
  },
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (user && account) {
        return {
          ...token,
          data: user.data,
          accessToken: user.accessToken as string,
          refreshToken: user.refreshToken as string,
          accessTokenExpires: user.accessTokenExpires as number,
        };
      } else {
        if (token.accessTokenExpires <= +new Date()) {
          signOut();
        }

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
            accessTokenExpires: tokenData.exp * 1000,
          } as any;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
});
