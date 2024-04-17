"use client"
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { useDebounce } from '@/hooks/use-debounce'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'


const SearchInput = () => {
    const [value,setValue]=useState("")
    console.log(value)
    const debouncedValue = useDebounce(value)
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const currentCategoryid = searchParams.get("categoryId")

    useEffect(()=>{
        const url = qs.stringifyUrl({
            url:pathname,
            query:{
                categoryId:currentCategoryid,
                title:debouncedValue
            }
        },{skipNull:true,skipEmptyString:true})
        router.push(url)
    },[debouncedValue,currentCategoryid,router,pathname])
  return (
    <div className='relative flex items-center '>
      <Search className='h-4 w-4 absolute left-3 text-slate-600'/>
      <Input value={value} onChange={(e)=>setValue(e.target.value)} className='w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200'
      placeholder='Search for a course'/>
    </div>
  )
}

export default SearchInput
