import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export default async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
      where: {
        userId: Number(session?.user?.id)
      }
    });
    return txns.map((t:any) => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider
    }))
}