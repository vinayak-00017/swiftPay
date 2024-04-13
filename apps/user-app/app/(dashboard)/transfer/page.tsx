import React from 'react'
import AddMoneyCard from '../../../components/AddMoneyCard'
import BalanceCard from '../../../components/BalanceCard'
import { OnRampTransactions } from '../../../components/OnRampTransaction'
import  getOnRampTransactions from '../../../lib/actions/getOnRampTransactions'
import getBalance from '../../../lib/actions/getBalance'


const Transfer = async () => {
  const balance = await getBalance()
  const transactions = await getOnRampTransactions();

  return (
    <div className="w-screen">
        <h2 className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <section>
                <AddMoneyCard />
            </section>
            <section>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <section className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </section>
            </section>
        </div>
    </div>
  )
}

export default Transfer