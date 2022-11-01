export default async function getEmails({ page, pageSize, returnValues, filters, revalidate }: { page?: number, pageSize?: number, returnValues?: string[], filters?: any[], revalidate?: number }) {
    const response = await fetch(`${process.env.HOST!}/emails`,
        {
            method: "PUT",
            headers: { "x-api-key": process.env.APIKEY! },
            body: JSON.stringify({
                "returnValues": returnValues ?? ["subject", "sendName", "created", "sentDate", "tags", "recipient", "cc", "bcc", "sentStatus"],
                "filters": filters ?? [],
                "pageSize": pageSize ?? 10,
                "page": page ?? 1,
            }),
            next: { revalidate: revalidate ?? 60 },
        },)
    const data = await response.json()
    return data;
}