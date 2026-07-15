import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900">
        <div className="max-w-screen-xl mx-auto px-4 w-full py-10 md:py-16">
            <div className="grid md:grid-cols-3 gap-7">
            <div>
                 <Link href="/" className="mb-10 block">
                <Image src="/logo4.png" alt="Logo" width={128} height={50} />
                </Link>
                <p className="text-gray-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis officia perspiciatis velit, aspernatur quas eius temporibus molestias tenetur veniam cupiditate magni. Repellendus expedita architecto ut autem, sed rerum porro amet.
                </p>
            </div>
        <div>
            <div className="flex gap-20">
                <div className="flex-1 md:flex-none">
                    <h4 className="mb-8 text-xl font-semibold text-white">links</h4>
                    <ul className="list-item space-y-5 text-gray-400">
                        <li>
                        <Link href="/"> Home</Link>
                    </li>
                    <li>
                        <Link href="/about"> about</Link>
                    </li>
                    <li>
                        <Link href="/room"> Room</Link>
                    </li>
                    <li>
                        <Link href="/contact"> contact us</Link>
                    </li>
                    </ul>
                </div>
                <div className="flex-1 md:flex-none">
                    <h4 className="mb-8 text-xl font-semibold text-white">legal</h4>
                    <ul className="list-item space-y-5 text-gray-400"><li>
                        <Link href="#"> Legal</Link>
                    </li>
                    <li>
                        <Link href="/#"> Term and Condition</Link>
                    </li>
                    <li>
                        <Link href="/#"> Payment Method</Link>
                    </li>
                    <li>
                        <Link href="#"> Privacy Policy</Link>
                    </li>
                    </ul>
                </div>
            </div>
        </div>
        <div>
            <h4 className="mb-8 text-xl font-semibold text-white"> News letter</h4>
            <p className="text-gray-400"> Lorem ipsum dolor sit amet consectetur adipisicing
            </p>        
                <form action="" className="mt-5">
                   <div className="mb-5">
                    <input type="text" name="email" className="w-full p3-rounder-sm bg-white placehoder=" placeholder="Enter your email" />
                   </div>
                   <button type="submit" className="py-2.5 px-6 bg-orange-400 text-white hover:bg-orange-500 rounded-sm">Subscribe</button>
            </form>
            </div>
        </div>
        </div>
        <div className="max-w-screen-xl mx-auto px-4 border-t border-gray-500 py-8 text-center text-base text-gray-500">

            &copy; {new Date().getFullYear()} Codermedia. All rights reserved.
        </div>
    </footer>
  )
}

export default Footer;