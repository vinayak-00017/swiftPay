"use client"

import { Card } from '@repo/ui/Card'
import TextInput from '@repo/ui/TextInput'
import { Button } from '@repo/ui/button'
import React, { useState } from 'react'
import { p2pTransfer } from '../lib/actions/p2pTransfer'
import { useRouter } from 'next/navigation'


const SendCard = () => {

    const [number, setNumber] = useState('')
    const [amount, setAmount] = useState(0)
    const router = useRouter()

  return (
    <section className=' flex justify-center'>
        <Card title='Send'>
            <div >
                <TextInput
                    label={"Number"}
                    placeholder='9999999999'
                    onChange={(val) => setNumber((val))}
                ></TextInput>
                <TextInput
                    label={"Amount"}
                    placeholder='Amount'
                    onChange={(val) => setAmount(Number(val))}
                ></TextInput>
            </div>
            <div className='flex justify-center pt-4'>
                <Button
                    onClick={async()=>{
                        await p2pTransfer(number, Number(amount) * 100 )
                        router.refresh()
                    }}
                >
                    Send
                </Button>
            </div>
        </Card>
    </section>
  )
}

export default SendCard