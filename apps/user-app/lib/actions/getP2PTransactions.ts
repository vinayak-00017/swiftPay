import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export default async function getP2PTransactions() {
    const session = await getServerSession(authOptions)
    const p2PTransactions = await prisma.p2PTransfer.findMany({
        where: {
            OR: [
                { fromUserId: Number(session?.user?.id) },
                { toUserId: Number(session?.user?.id) }
            ]
        },
        select: {
            id: true,
            amount: true,
            timestamp: true,
            fromUser: {
                select: {
                    name: true,
                    number: true,
                    id: true
                }
            },
            toUser: {
                select: {
                    name: true,
                    number: true,
                    id: true,
                }
            }
        }
    })
    return p2PTransactions
}