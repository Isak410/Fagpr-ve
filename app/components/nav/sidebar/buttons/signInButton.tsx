"use client"

import { signIn } from "next-auth/react"

export function SignInButton() {
    return (
        <button onClick={()=>{signIn()}} className="items-center h-16 bg-sidebarbuttonhoverbg p-1 rounded w-fit hover:brightness-110 mt-5">Sign in (test)</button>
    )
} 