import { auth } from "@clerk/nextjs";
import { db } from "./db";

export const currentProfile = async () => {
  const { userId } = await auth();
  console.log("userId", userId);
  if (!userId) return null;

  const profile = await db.profile.findUnique({
    where: { userId },
  });

  return profile;
};
