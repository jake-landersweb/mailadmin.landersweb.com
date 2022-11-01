import getEmails from "./getEmails";

export default async function emailsSince(hours: number) {
    return await getEmails({
        returnValues: ["id"],
        pageSize: 50,
        filters: [
            {
                "fieldName": "created",
                "operator": ">",
                "value": new Date().setTime(new Date().getTime() - 24 * 60 * 60 * 1000)
            }
        ]
    })
}