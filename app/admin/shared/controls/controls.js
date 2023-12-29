"use client"

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ControlLink from "./controlLink";

const Controls = ({ whichAdmin, session }) => {
    const pathName = usePathname()


    const cbUrl = whichAdmin === 'super' ? `${process.env.NEXT_PUBLIC_BASE_URL}/admin/super/login` : `${process.env.NEXT_PUBLIC_BASE_URL}/admin/login`
    return (
        <div className="mb-4">
            <ControlLink text={"Home"} url={"/"} />
            <ControlLink text={"Settings"} url={"/admin"} />
            <ControlLink text={"Logout"} clickEvent={async () => await signOut({ callbackUrl: cbUrl })} extraClass={"rounded-e border-e"}/>
            {
                whichAdmin === 'super' ?
                    <ControlLink text={"Add Account"} url={"/add"} color="yellow" extraClass="ms-4 border-s rounded-s"/>
                    : <></>
            }
        </div>
    )
}

export default Controls