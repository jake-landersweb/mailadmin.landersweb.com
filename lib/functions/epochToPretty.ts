export default function epochToPretty(epoch: number) {
    var date = new Date(epoch)
    return date.toLocaleString()
}