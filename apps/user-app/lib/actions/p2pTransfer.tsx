"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client"


export async function p2pTransfer(to: string, amount: number){
    const session = await getServerSession(authOptions)
    
    const from = session?.user?.id
    if(!from){
        return {
            message: "Error while sending "
        }
    }
    
    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    })

    if(!toUser){
        return {
            message: "User not found"
        }
    }

    await prisma.$transaction(async(tx) => {
        const userId = Number(from)
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${userId} FOR UPDATE` 

        const fromBalance = await tx.balance.findUnique({
            where: {
                userId: Number(from)
            }
        });
        
        if(!fromBalance || fromBalance.amount < amount ){
            throw new Error('Insufficient funds');
        }
        
        // await new Promise(r => setTimeout(r, 2000))

        await tx.balance.update({
            where: {userId: Number(from)},
            data: {amount: {decrement: amount}}
        });

        await tx.balance.update({
            where: {userId: toUser.id},
            data: {amount: {increment: amount}}
        })

        await tx.p2PTransfer.create({
            data:{
                amount,
                fromUserId: userId,
                toUserId: toUser.id,
                timestamp: new Date()
            }
        })

    })
}