import BoundsWrapper from "../../../components/boundsWrapper"
import getEmail from "../../../lib/apiRoutes/getEmail"
import DeleteButton from "./deleteButton"

export default async function EmailView({ params }: { params: { id: string } }) {
    const email = await getEmail({ id: params.id })
    if (email == undefined) {
        return <div className="">ERR</div>
    }

    const detailCell = (label: string, value: string) => {
        return <div className="max-w-2xl">
            <div className="text-txt bg-white px-2 py-4 flex justify-between items-center">
                <p className="!text-txt break-all">{value}</p>
                <h3 className="!text-txt-600 md:text-lg font-medium text break-keep">{label.toUpperCase()}</h3>
            </div>
            <div className="w-full h-[1px] bg-bg-700"></div>
        </div>
    }

    return <div className="bg-bg-700 grid place-items-center">
        <div className="max-w-2xl w-full space-y-4 px-2">
            <DeleteButton id={email['id']} />
            <div className="rounded-md overflow-clip">
                {detailCell("id", email['id'])}
                {detailCell("subject", email['subject'])}
                {detailCell("recipient", email['recipient'])}
                {detailCell("cc", email['cc'] ?? "")}
                {detailCell("bcc", email['bcc'])}
                {detailCell("host", email['host'])}
                {detailCell("port", email['port'])}
                {detailCell("username", email['username'])}
                {detailCell("created", email['created'])}
                {detailCell("sent Date", email['sentDate'] ?? "")}
                {detailCell("send Date", email['sendDate'] ?? "")}
                {detailCell("sent Status", email['sentStatus'])}
                {detailCell("send Name", email['sendName'])}
                {detailCell("tags", email['tags'])}
                {detailCell("retry Count", email['retryCount'] ?? "")}
            </div>
            <div className="grid place-items-center space-y-2">
                <p className="!text-txt">HTML Preview</p>
                <div className="overflow-scroll pointer-events-none" dangerouslySetInnerHTML={{ __html: email['body'] }} />
            </div>
        </div>
    </div>
}