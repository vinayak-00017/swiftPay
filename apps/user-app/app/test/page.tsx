"use client"

import { useBalance } from "@repo/store/useBalance"
import React from 'react'

const Page = () => {
    const balance = useBalance()

  return (
    <div>Page {balance}</div>
  )
}

export default Page