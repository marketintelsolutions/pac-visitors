import React from 'react'
import { ReactComponent as Radial } from "../assets/radial.svg";


export default function Footer() {
  return (
    <div className='w-full  bottom-0  h-16 absolute text-center py-2 text-sm' >
         {/* <Radial className="absolute left-0 top-0 h-full" /> */}
        <div>Powered by MDS (A PanAfrica Capital Holdings)</div>
        <div className='text-gray-600' ><strong>info@marketintelsolutions.com</strong></div>
    </div>
  )
}
