import { Card } from '@repo/ui/Card'
import React from 'react'


const P2PTransactions = (
    transactions: any
) => {


  return (
    <Card title='Transfers'>
        <div>
            {transactions}
        </div>
    </Card>
  )
}

export default P2PTransactions