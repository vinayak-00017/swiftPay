import React from 'react'
import SendCard from '../../../components/SendCard'
import P2PTransactions from '../../../components/P2PTransactions'
import getP2PTransactions from '../../../lib/actions/getP2PTransactions'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'


const P2P = async() => {
  const transfer = await getP2PTransactions()
  const session = await getServerSession(authOptions)
  const id = Number(session?.user?.id)
  return (
    <div className=' w-[80vw] m-10'>
        <SendCard></SendCard>
        <P2PTransactions transfer={transfer} id={id}></P2PTransactions>
    </div>
  )
}

export default P2P