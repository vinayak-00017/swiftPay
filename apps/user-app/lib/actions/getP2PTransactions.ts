import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export default async function getP2PTransactions() {
    const session = await getServerSession(authOptions)
    const p2PTransactions = await prisma.user.findUnique({
        where: {
            id: Number(session?.user?.id)
        },
        include: {
            sentTransfer: true,
            recivedTransfer: true
        }
    })
    console.log(p2PTransactions)
    return "hi"
}