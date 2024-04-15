import { Card } from '@repo/ui/Card'


const P2PTransactions = ({
  transfer, id
}: {
  transfer: {
      id: number,
      amount: number,
      timestamp: Date,
      toUser: {
		name: string | null,
		number: string,
		id: number
	  },
      fromUser: {
		name: string | null,
		number: string,
		id: number
	  }
  }[], id: number
}) => {

  if (!transfer.length) {
    return <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">
            No Recent transactions
        </div>
    </Card>
}

  return (
	<section className='mt-10'>
		<Card title='Transfers'>
			<div>
			{transfer.map((t,i) => {
				return (
				<div key={i} className='border-b-2 p-2'>
					{t.fromUser.id === id ? (
					<div className='flex justify-between'>
						<div className='flex flex-col'>
							<span>
								{t.toUser.name}
							</span>
							<span>
								{t.timestamp.toDateString()}
							</span>
						</div>
						<div className='text-red-500'>
						-Rs {t.amount/100}
						</div>
					</div>
					): (
						<div className='flex justify-between'>
						<div className='flex flex-col'>
							<span>
								{t.fromUser.name}
							</span>
							<span>
								{t.timestamp.toDateString()}
							</span>
						</div>
						<div className='text-green-500'>
						+Rs {t.amount/100}
						</div>
					</div>
					)}
				</div>
				)
			})}
			</div>
		</Card>
	</section>
  )
}

export default P2PTransactions