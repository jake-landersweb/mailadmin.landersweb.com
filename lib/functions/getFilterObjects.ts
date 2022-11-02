export default function getFilterObjects(input: string) {
    const filterObjects = []
    if (input == "") {
        return []
    }
    const fos = input.split("--")
    for (var i = 0; i < fos.length; i++) {
        const fo = fos[i].split(",")
        filterObjects.push({
            "fieldName": fo[0],
            "operator": fo[1],
            "value": fo[2],
            "chainCommand": fo.length > 3 ? fo[3] : "AND",
        })
    }
    return filterObjects
}