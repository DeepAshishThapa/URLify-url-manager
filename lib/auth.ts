import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/user.model"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],

  session: {
    strategy: "jwt"
  },

  callbacks: {
    async jwt({ token, account, profile }) {
      // 🔥 Runs when user logs in (OAuth)
      if (account && profile) {
        await dbConnect()

        //  Safety check (VERY IMPORTANT)
        if (!profile.email) {
          throw new Error("No email provided by Google")
        }

        //  Find existing user
        let user = await UserModel.findOne({
          email: profile.email
        })

        //  Create new user if not exists
        if (!user) {
          user = await UserModel.create({
            email: profile.email,
            username: profile.name || "user",
            isVerified: true, // OAuth = trusted
            provider: "google"
          })
        }

        //  Attach data to token
        token._id = user._id.toString()
        token.username = user.username
        token.email = user.email
      }

      return token
    },

    async session({ session, token }) {
      //  Attach custom fields to session
      if (session.user) {
        session.user._id = token._id as string
        session.user.username = token.username as string
        session.user.email = token.email as string
      }

      return session
    }
  },

  pages: {
    signIn: "/login"
  },

  secret: process.env.AUTH_SECRET
})