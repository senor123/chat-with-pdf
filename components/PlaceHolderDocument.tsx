'use client';
import React from 'react'
import { Button } from './ui/button'
import { PlusCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';

function PlaceHolderDocument() {
  const router=useRouter();
  const uploadFile=()=>{
    router.push("/dashboard/upload");
  }
  return (
    <Button onClick={uploadFile} className='flex flex-col w-64 h-80 items-center justify-center bg-gray-200 rounded-xl drop-shadow-md text-gray-400'>
        <PlusCircleIcon className='h-16 w-16'/>
        <p className="">PlaceHolderDocument</p>
    </Button>
  )
}

export default PlaceHolderDocument