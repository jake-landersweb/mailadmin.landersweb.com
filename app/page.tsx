import BoundsWrapper from "../components/boundsWrapper"
import Link from "../components/link"
import MailCell from "../components/mailCell"
import emailsSince from "../lib/apiRoutes/emailsSince"
import getEmails from "../lib/apiRoutes/getEmails"

const Index = async () => {
    const latestResponse = await getEmails({})
    const sinceResponse = await emailsSince(24)

    const latestEmails = () => {
        const cells = []
        for (var i = 0; i < latestResponse['body'].length; i++) {
            cells.push(<MailCell obj={latestResponse['body'][i]} />)
        }
        return cells
    }

    const numSince = () => {
        return sinceResponse['body'].length as number
    }

    const errorsSince = () => {
        var num = 0
        for (var i = 0; i < sinceResponse['body'].length; i++) {
            if (sinceResponse['body'][i]['sentStatus'] == -1) {
                num++
            }
        }
        return num
    }

    const infoCell = (label: string, val: string) => {
        return <div className="bg-white p-4 border-b-[6px] border-b-main rounded-md">
            <h3 className="text-gray-400 text-lg">{label.toUpperCase()}</h3>
            <div className="grid place-items-center p-8">
                <p className="text-6xl font-semibold text-txt-700">{val}</p>
            </div>
        </div>
    }

    const navCell = (title: string, route: string) => {
        return <Link props={{
            href: route,
            child: <>
                <div className="space-y-4">
                    <h4>{title}</h4>
                </div>
            </>,
            isExternal: false,
            className: "bg-white p-4 rounded-md grid place-items-center hover:opacity-50 transition-all"
        }} />
    }

    return <BoundsWrapper>
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {navCell("All Emails", "/emails")}
                {navCell("All Errors", "")}
                {navCell("Create Email", "/createEmail")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {infoCell("Sent Last 24 Hours", numSince().toString())}
                {infoCell("Errors Last 24 Hours", errorsSince().toString())}
            </div>
            <div className="space-y-2">
                <h4 className="text-2xl font-medium">Last 10 Emails</h4>
                {latestEmails()}
            </div>
        </div>
    </BoundsWrapper>
}

export default Index