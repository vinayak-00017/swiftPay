import React from 'react'
import SendCard from '../../../components/SendCard'
import P2PTransactions from '../../../components/P2PTransactions'
import getP2PTransactions from '../../../lib/actions/getP2PTransactions'

const P2P = async() => {
  const transactions = await getP2PTransactions()

  return (
    <div className='flex justify-center items-center h-[80vh] w-[80vw]'>
        <SendCard></SendCard>
        <P2PTransactions transactions={transactions}></P2PTransactions>
    </div>
  )
}

export default P2P