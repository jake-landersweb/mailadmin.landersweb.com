import epochToPretty from "../lib/functions/epochToPretty"
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineClockCircle } from 'react-icons/ai'
import Link from "next/link"

const MailCell = ({ obj }: { obj: any }) => {

    const tags = () => {
        if (obj['tags'] == undefined) {
            return null
        } else {
            const t = []
            const parsedTags = obj['tags'].split(",")
            for (var i = 0; i < parsedTags.length; i++) {
                t.push(<a href={`/emails?tags=${parsedTags[i]}`}><p className="text-gray-400 md:hover:opacity-50 transition-all underline md:hover:no-underline break-all">{parsedTags[i]}</p></a>)
            }
            return <div className="md:flex md:space-x-2 space-y-2 md:space-y-0">
                <p>Tags: </p>
                {t}
            </div>
        }
    }

    const endContent = () => {
        if (obj['sentStatus'] == 1) {
            return <AiOutlineCheckCircle size={40} className="text-green-400" />
        } else if (obj['sentStatus'] == 0) {
            return <AiOutlineClockCircle size={40} className="text-gray-400" />
        } else if (obj['sentStatus'] == -1) {
            return <AiOutlineCloseCircle size={40} className="text-red-400" />
        } else {
            return null
        }
    }


    return <div id={obj['id']} className="">
        <Link href={`/emails/${obj['id']}`}>
            <div className="bg-white px-4 py-2 rounded-md border-l-[6px] border-l-main overflow-clip md:hover:opacity-50 transition-all">
                <div className="flex items-center justify-between">
                    <div className="">
                        <h3 className="text-2xl font-medium break-words">{obj['subject']}</h3>
                        <p>Sent: {epochToPretty(obj['sentDate'])}</p>
                        <p>Recipient: {obj['recipient']}</p>
                        {tags()}
                    </div>
                    {endContent()}
                </div>
            </div>
        </Link>
    </div>
}

export default MailCell