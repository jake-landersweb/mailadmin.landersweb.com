export default async function getEmails(page: number = 1, returnValues: string[] = ["subject", "sendName", "created", "sentDate", "tags", "recipient", "cc", "bcc"], filters: any[] = []) {
    const response = await fetch(`${process.env.HOST!}/emails`,
        {
            method: "PUT",
            headers: { "x-api-key": process.env.APIKEY! },
            body: JSON.stringify({
                "returnValues": returnValues,
                "filters": filters,
                "pageSize": 10,
                "page": page,
            }),
            next: { revalidate: 60 },
        },)
    const data = await response.json()
    return data;
}