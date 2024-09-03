import {  } from "firebase-admin/app";

import { getApp,getApps,App,initializeApp,cert } from "firebase-admin/app";
import { getFirestore } from "firebase/firestore";

const serviceKey=require('@/service-token.json');

let app:App;

if(getApps().length===0){
    app=initializeApp({
        credential:cert(serviceKey)
    })
}
else{
    app=getApp();
}

const adminDb=getFirestore();