import epochToPretty from "../lib/functions/epochToPretty"

const MailCell = ({ obj }: { obj: any }) => {

    const tags = () => {
        const t = []
        const parsedTags = obj['tags'].split(",")
        for (var i = 0; i < parsedTags.length; i++) {
            t.push(<a href="#"><p className="text-gray-400 md:hover:opacity-50 transition-all underline md:hover:no-underline">{parsedTags[i]}</p></a>)
        }
        return t
    }

    return <div className="bg-bg-700 mb-2 px-4 py-2 rounded-md">
        <h3 className="text-2xl font-medium">{obj['subject']}</h3>
        <p>Send Name: {obj['sendName']}</p>
        <p>Sent: {epochToPretty(obj['sentDate'])}</p>
        <p>Created: {epochToPretty(obj['created'])}</p>
        <p>Recipient: {obj['recipient']}</p>
        <p>CC: {obj['cc']}</p>
        <p>BCC: {obj['bcc']}</p>
        <div className="flex space-x-2">
            <p>Tags: </p>
            {tags()}
        </div>
    </div>
}

export default MailCell