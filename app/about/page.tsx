import { Metadata } from "next"
import Image from "next/image"
import Headersection from "@/components/header-section"
import { IoEyeOutline, IoLocateOutline } from "react-icons/io5"


export const metadata: Metadata = {
  title: "About Us",
    description: "Learn more about our hotel and services"}
    
const Aboutpage = () => {
  return (
    <div>
        <Headersection title="About Us" subtitle="lorem ipsum dolor amet."/>
        <div className="max-w-screen-xl mx-auto py-20 px-4">
            <div className="grid md:grid-cols-2 gap-8">
                <Image src="/about-image.jpeg" alt="About Image" width={650} height={809} />
                <div>
                    <h1 className="text-5xl font-semibold text-gray-900 mb-4">Who We Are</h1>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, in veniam corrupti asperiores quia sunt.
                    <ul className="list-item space-y-6 pt-8">
                        <li className="flex gap-5">
                            <div className="flex-none mt-1">
                                <IoEyeOutline className="size-7"/>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold mb-1"> vision</h4>
                                <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, tempore.</p>
                            </div>
                        </li>
                        <li className="flex gap-5">
                            <div className="flex-none mt-1">
                                <IoLocateOutline className="size-7"/>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold mb-1">Mission</h4>
                                <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, tempore.</p>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Aboutpage