"use client"

import  { useState } from 'react'
import { SUPPORTED_BANKS } from '../constants'
import { Card } from '@repo/ui/Card';
import TextInput from '@repo/ui/TextInput';
import Select from '@repo/ui/Select';
import { Button } from '@repo/ui/button';
import { createOnRampTransactions } from '../lib/actions/createOnRampTransaction';


const AddMoneyCard = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0)
    const [bank, setBank] = useState(SUPPORTED_BANKS[0]?.name || "")
    
  return (
    <Card title='Add Money'>
        <div className='w-full'>
            <TextInput 
                label={"Amount"} 
                placeholder={"Amount"} 
                onChange={(val) => setAmount((Number(val))) }
            ></TextInput>
            <div className='py-4 text-left'>
                Bank
            </div>
            <Select onSelect={(value) => {
                setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
                setBank(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
            }} options={SUPPORTED_BANKS.map(x => ({
                key: x.name,
                value: x.name
            }))}
            ></Select>
            <div className='flex justify-center pt-4'>
                <Button onClick = {async() => {
                    await createOnRampTransactions(bank, amount  )
                    window.location.href = redirectUrl || "";
                }}>
                    Add Money
                </Button>
            </div>
        </div>
    </Card>
  )
}

export default AddMoneyCard

