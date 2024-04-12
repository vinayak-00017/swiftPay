import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../../lib/auth'
import prisma from '@repo/db/client'
import AddMoneyCard from '../../../components/AddMoneyCard'
import BalanceCard from '../../../components/BalanceCard'
import { OnRampTransactions } from '../../../components/OnRampTransaction'


async function getBalance() {
    const session = await getServerSession(authOptions)
    const balance = await prisma.balance.findFirst({
      where: {
        userId: Number(session?.user?.id)
      }
    });
    return{
      amount: balance?.amount || 0,
      locked: balance?.locked || 0
    }
}


async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
      where: {
        userId: Number(session?.user?.id)
      }
    });
    return txns.map(t => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider
    }))
}


const Transfer = async () => {
  const balance = await getBalance()
  const transactions = await getOnRampTransactions();

  return (
    <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoneyCard />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </section>
    </div>
  )
}

export default Transfer