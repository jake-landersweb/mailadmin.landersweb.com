export default async function getEmail({ id }: { id: string }) {
    const response = await fetch(`${process.env.HOST!}/emails/${id}`,
        {
            method: "GET",
            headers: { "x-api-key": process.env.APIKEY! },
            cache: 'no-store',
        },)
    const data = await response.json()
    if (data['status'] == 200) {
        return data['body'][0]
    } else {
        return undefined
    }
}