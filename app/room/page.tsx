import { Metadata } from "next"

import Headersection from "@/components/header-section"



export const metadata: Metadata = {
  title: "About Us",
    description: "Learn more about our hotel and services"}
    
const room = () => {
  return (
    <div>
        <Headersection title="About Us" subtitle="lorem ipsum dolor amet."/>
        <div className="max-w-screen-xl mx-auto py-20 px-4">
            <div className="grid md:grid-cols-2 gap-8">
                <p> ini halaman room</p>

            </div>
        </div>
    </div>
  )
}

export default room