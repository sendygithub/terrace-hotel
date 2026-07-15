import { Metadata } from "next"
import Headersection from "@/components/header-section"
import { IoMailOpenOutline,IoCallOutline,IoLocateOutline, IoMailOutline, IoLocationOutline } from "react-icons/io5"
import Contactform from "@/components/contactform"

export const metadata: Metadata = {
  title: "Contact Us",}

const Contactpage = ()=> {
  return (
    <div>
    <Headersection title="contact us" subtitle ="lorem10"/>
    <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <h1 className="text-lg text-gray-500 mb-3"> contact us</h1>
                <h1 className="text-5xl font-semibold text-gray-900 mb-4"> get in touch today</h1>
                <p className="text-gray-700 py-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus ullam cupiditate voluptatum in nulla deleniti quae modi minima explicabo vero eius magnam itaque, laborum magni fuga molestias reiciendis voluptas officia.</p>
                <ul className="list-item space-y-6 pt-8">
                    <li className="flex items gap-5">
                        <div className="flex-none bg-gray-300 p-3 shadow-sm rounded-sm">
                            <IoMailOpenOutline className="size-7"/>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-lg font-semi-bold mb-1">email :</h4>
                            <p>email-us@example.com</p>
                        </div>
                    </li>
                    <li className="flex items gap-5">
                        <div className="flex-none bg-gray-300 p-3 shadow-sm rounded-sm">
                            <IoCallOutline className="size-7"/>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-lg font-semibold mb-1">phone number :</h4>
                            <p>081xxxxxxx</p>
                        </div>
                    </li>
                    <li className="flex items gap-5">
                        <div className="flex-none bg-gray-300 p-3 shadow-sm rounded-sm">
                            <IoLocationOutline className="size-7"/>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-lg font-semibold mb-1">adress :</h4>
                            <p>jakarta, jalan pegangsaan timur, INDONESIA </p>
                        </div>
                    </li>
                </ul>
            </div>
            {/* {contact form} */}
            <Contactform/>
        </div>
    </div>
    
    </div>
  )
}

export default Contactpage