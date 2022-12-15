import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import API from "../../../lib/api";

const configuration = {
  cookie: {
    secure: process.env.NODE_ENV && process.env.NODE_ENV === "production",
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          let user = await API.post("/api_user/login", {
            email: credentials.email,
            password: credentials.password,
          });
          user = user.data;

          if (user !== null) {
            return user;
          } else {
            return null;
          }
        } catch (err) {
          //   console.log("Authorize error:", err);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user; // Setting token in session
      return session;
    },

    // debug: process.env.NODE_ENV === "development",
  },
};
export default (req, res) => NextAuth(req, res, configuration);
