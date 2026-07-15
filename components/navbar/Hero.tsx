import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return(
<div className="relative h-screen text-white overflow-hidden">
  <Image src={"/hero.jpg"} alt="Hero Image" fill className="object-cover object-center w-full h-full" />
<div className="absolute inset-0 bg-black opacity-50">
</div>
<div className="relative flex flex-col justify-center items-center h-full text-center">
  <h1 className="text-7xl font-extrabold leading-tight mb-3 capitalize"> Book youre Luxury Hotel</h1>
  <p className="text-xl text-gray-300 mb-8"> get special offer justfor you</p>
  <div className="flex gap-5">
    <Link href="/room" className="bg-orange-400 text-white hover:bg-orange-500 py-2 px-6 md:px-10 text-lg font-semibold hover:shadow-lg"> Book Now</Link>
    <Link href="/contact" className="bg-transparent border border-orange-400 text-white hover:bg-orange-500 py-2 px-6 md:px-10 text-lg font-semibold hover:shadow-lg"> Contact Us</Link>
  </div>
</div>
</div>

  )
}

export default Hero;