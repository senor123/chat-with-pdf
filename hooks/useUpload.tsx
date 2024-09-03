"use client"
import { useUser } from '@clerk/nextjs';
import {db, storage} from '@/firebase';
import { useRouter } from 'next/navigation';
import React from 'react';
import {v4 as uuid4} from 'uuid';

export enum StatusText{
    UPLOADING="Uploading file...",
    UPLOADED="File Uploaded successfully",
    SAVING="Saving file to database...",
    GENERATING="Generating AI Embeddings, This will only take a few seconds"
}

export type Status=StatusText[keyof StatusText];
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
function useUpload() {
    const [fileId,setFileID]=React.useState<string|null>(null);
    const [status,setStatus]=React.useState<string|null>(null);
    const [progress,setProgress]=React.useState<number|null>(null);
    const {user}=useUser();

    const handleUpload= async(file:File)=>{
        if(!file || !user)return;

        const fileIdToUpload=uuid4();

        const storageRef=ref(storage,`users/${user.id}/files/${fileIdToUpload}`);

        const uploadTask=uploadBytesResumable(storageRef,file);

        uploadTask.on("state_changed",(snapshot)=>{
            const progressValue=Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
            setStatus(StatusText.UPLOADING);
            console.log(progressValue);
            setProgress(progressValue);
        },(error)=>{
            console.log("Uploading File Failed"+error);
        },async()=>{
            setStatus(StatusText.UPLOADED);

            const downloadUrl=await getDownloadURL(storageRef);

            setStatus(StatusText.SAVING);

            await setDoc(doc(db,"users",user.id,"files",fileIdToUpload),{
                name:file.name,
                size:file.size,
                type:file.type,
                downloadUrl:downloadUrl,
                ref:uploadTask.snapshot.ref.fullPath,
                createdAt:new Date()
            })
            setStatus(StatusText.GENERATING);

            setFileID(fileIdToUpload);
        })
    }

    return {progress,status,fileId,handleUpload};

}

export default useUpload