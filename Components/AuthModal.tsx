"use client";

import { SupabaseClient, useSessionContext } from "@supabase/auth-helpers-react";
import Modal from "./Model";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import {Auth} from "@supabase/auth-ui-react"
import {ThemeSupa } from "@supabase/auth-ui-shared";

import useAuthModal from "@/app/hooks/useAuthModal";
import { useEffect } from "react";

 const AuthModal =()=>{
   const SupabaseClient=useSupabaseClient();
   const router = useRouter();
   const { session}= useSessionContext ();
const{ onClose,isOpen}= useAuthModal();

useEffect(()=>{
if(session){
    router.refresh();
    onClose();
}
},[session,router,onClose])

const onChange =(open:boolean)=>{
if(!isOpen){
onClose();
}
}

       return(
        <Modal
        title ="Welcome Back"
        description="Login to your account"
        isOpen={isOpen}
        onChange= {onChange}
        >
            <Auth
            theme="dark"
            magicLink
           providers={[]}
            supabaseClient={SupabaseClient}
            appearance={{
             theme:ThemeSupa,
             variables:{
default:{
    colors:{
        brand:'#404040',
        brandAccent:'#22c55e'
    }
}
             }
            }}
            />
        </Modal>
    )
 }
 export default AuthModal;