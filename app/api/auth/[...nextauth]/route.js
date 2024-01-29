import connectDB from "@/model/db";
import User from "@/model/user.schema";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        await connectDB();
        const { email } = credentials;
        const user = await User.findOne({ email }).select("email name photo");
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      await connectDB();
      const user = await User.findOne({ email: session.user.email }).select(
        "-password"
      );

      return {
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          photo: user?.photo || null,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: "jdjfkdjfkdjfjdjfdkjf",
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
