"use client"

import { Card } from '@repo/ui/Card'
import TextInput from '@repo/ui/TextInput'
import { Button } from '@repo/ui/button'
import React, { useState } from 'react'

const SendCard = () => {

    const [number, setNumber] = useState('')
    const [amount, setAmount] = useState(0)

  return (
    <div className='flex justify-center items-center h-[90vh] w-[80vw]'>
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
                    onClick={()=>{}}
                >
                    Send
                </Button>
            </div>
        </Card>
    </div>
  )
}

export default SendCard