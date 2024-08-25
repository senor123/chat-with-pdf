'use client';
import React, {useCallback} from 'react';

import {useDropzone} from 'react-dropzone';

import {
    CheckCircleIcon,
    CircleArrowDown,
    HammerIcon,
    RocketIcon,
    SaveIcon
} from 'lucide-react';

function Upload() {
  const onDrop = useCallback((acceptedFiles:File[]) => {
    // Do something with the files
    console.log(acceptedFiles[0]);
  }, [])
  const {getRootProps, getInputProps, isDragActive, isFocused ,isDragAccept} = useDropzone({onDrop})

  return (
    <div className='flex flex-col items-center max-w-7xl mx-auto'>
    <div {...getRootProps()} className={`p-10 border-indigo-600 border-2 rounded-sm mt-10 w-[90%] border-dashed text-indigo-600 flex 
        items-center justify-center h-96 ${isDragAccept || isFocused ? 'bg-indigo-400':'bg-indigo-200' }`}>
      <input {...getInputProps()} />
      <div className='flex flex-col items-center justify-center'>
      {
        isDragActive ?(
          <>
            <RocketIcon className='h-16 w-16 animate-ping'/>
            <p>Drop the files here ...</p>
          </>
        ):(
          <>
            <CircleArrowDown className='h-16 w-16 animate-bounce'/>
            <p>Drag `n` drop some files here, or click to select files</p>
          </>
        )
      }
      </div>
    </div>
    </div>
  )
}

export default Upload;