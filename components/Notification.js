import Avatar from "@/components/Avatar"
import Link from 'next/link';


export default function Notification(){
    return (
        <div  className="-mx-4">
          <div className="flex items-center gap-3 p-4 px-8 border-b border-b-gray-100">
            <Link href={"/profile"}><Avatar /></Link>
            <div><Link className="font-semibold hover:underline" href={"/profile"}>John Doe</Link> liked your <Link className="text-socialBlue hover:underline" href={"/"}>photo</Link>.</div>
          </div>
        </div>
    )
}