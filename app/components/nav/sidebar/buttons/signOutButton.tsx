"use client"

import { signOut } from "next-auth/react"

export function SignOutButton() {
    return (
        <button onClick={()=>{signOut()}} className="bg-red-500 transition-all duration-200 hover:bg-red-700 p-1 rounded w-fit text-white font-bold">Sign out</button>
    )
} 