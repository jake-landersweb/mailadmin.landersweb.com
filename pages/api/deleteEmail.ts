export default async function handle(req: any, res: any) {
    const response = await fetch(`${process.env.HOST!}/emails/${req.body['id']}/delete`,
        {
            method: "DELETE",
            headers: { "x-api-key": process.env.APIKEY! },
            cache: 'no-store',
        },)
    const data = await response.json()
    if (data['status'] == 200) {
        return res.status(200).json({})
    } else {
        return res.status(400).json({})
    }
}