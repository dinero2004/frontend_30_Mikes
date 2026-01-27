import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // secred which is being used to encrypt/decrypt JWT tokens and session data
  secret: process.env.AUTH_SECRET,

  // custom paages configruation - redirects login attemts to /signup-login instead of the usual api/auth/signin
  pages: { signIn: "/signup-login" },

  providers: [
    Credentials({
  id: "login",
  name: "login",

  credentials: {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" },
  },

  async authorize(credentials) {
    console.log("AUTHORIZE CALLED WITH:", credentials)

    if (!credentials?.username || !credentials?.password) {
      console.log("❌ Missing credentials")
      return null
    }

    const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
    })

    console.log("BACKEND STATUS:", response.status)

    const data = await response.json()
    console.log("RAW BACKEND DATA:", data)

    if (!response.ok) {
      console.log("❌ Backend rejected login")
      return null
    }

    console.log("✅ LOGIN SUCCESS — returning user")

    return {
      id: String(data.user.id),
      username: data.user.username,
      email: data.user.email,
      accessToken: data.token,
    }
  },
})

  ],
  // callbacks are the callbacks that are needed to give additional information to the auth.js session. callbacks function like this: response from backend -> jwt -> session
  // this is needed, so that we can append the information we get from the backend to the auth.js session
  callbacks: {
    // async JWT callback: runs whenever JWT is accessed (login, session check, etc.)
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        // on initial login, checks if a user object exists
        // here we transfer our custom properties from user to the JWT token which is in-built in auth.js
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.username = user.username;
      }
      // token persists between request, user only exist on initial login. here we return the token, so we can append it later to the session
      return token;
    },

    // async session callback: runs whenever session is accessed
    async session({ session, token }: { session: Session; token: JWT }) {
      // here we transfer our custom properties from the previously created JWT token to the in-built session object of auth.js, which will be stored in the browser localStorage (cookies)
      // this is what your app will receive when calling useSession() or auth()
      if (session.user) {
        session.user.id = token.id as string;
      }
      session.accessToken = token.accessToken;
      session.username = token.username;
      
      return session;
    },
  },
});