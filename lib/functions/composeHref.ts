export default function composeHref({ page, pageSize, tags, tagsChainCommand, filterObjects }:
    {
        page: number,
        pageSize: number,
        tags?: string,
        tagsChainCommand: string,
        filterObjects?: string,
    }
) {
    var href = `/emails?page=${page}&pageSize=${pageSize}`
    if (tags != undefined && tags != "") {
        href += `&tags=${tags}`
    }
    if (tagsChainCommand != undefined && tagsChainCommand != "") {
        href += `&tagsChainCommand=${tagsChainCommand}`
    }
    if (filterObjects != undefined && filterObjects != "") {
        href += `&filterObjects=${filterObjects}`
    }
    return href
}