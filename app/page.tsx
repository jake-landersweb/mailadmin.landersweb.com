import MailCell from "../components/mailCell"
import getEmails from "../lib/apiRoutes/getEmails"

const Index = async () => {
    const emailResponse = await getEmails()
    // const getLastHour = await getEmails(1, ["subject"], [
    //     {
    //         "fieldName": "created",
    //         "operator": ">",
    //         ""
    //     }
    // ])

    const t = () => {
        const cells = []
        for (var i = 0; i < emailResponse['body'].length; i++) {
            cells.push(<MailCell obj={emailResponse['body'][i]} />)
        }
        return cells
    }

    return <div className="">
        {t()}
    </div>
}

export default Index