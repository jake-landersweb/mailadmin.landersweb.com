
import BoundsWrapper from '../../components/boundsWrapper';
import Link from '../../components/link';
import getEmails from '../../lib/apiRoutes/getEmails';
import composeHref from '../../lib/functions/composeHref';
import getFilterObjects from '../../lib/functions/getFilterObjects';
import EmailsContent from './content';

export default async function Emails({ searchParams }: {
    searchParams:
    {
        page: string,
        pageSize: string,
        tags: string,
        tagsChainCommand: string,
        filterObjects: string,
        filterChainCommand: string,
    }
}) {
    const page = Object.is(Number(searchParams.page), NaN) ? 1 : Number(searchParams.page) ?? 1
    const pageSize = Object.is(Number(searchParams.pageSize), NaN) ? 10 : Number(searchParams.pageSize) ?? 10
    const tags = searchParams.tags ?? ""
    const tagsChainCommand = searchParams.tagsChainCommand ?? ""
    const filterObjects = searchParams.filterObjects ?? ""

    const getFOS = () => {
        var objs = []
        if (tags != "") {
            const splitTags = tags.split(",")
            const chain = tagsChainCommand == "" ? "AND" : tagsChainCommand
            for (var i = 0; i < splitTags.length; i++) {
                objs.push({
                    "fieldName": "tags",
                    "operator": "in",
                    "value": splitTags[i],
                    "chainCommand": chain,
                })
            }
        }
        const fos = getFilterObjects(filterObjects)
        objs = objs.concat(fos)
        console.log(objs)
        return objs
    }

    const emailResponse = await getEmails({
        page: page,
        pageSize: pageSize,
        filters: getFOS()
    })

    const countResponse = await getEmails({
        filters: getFOS(),
        returnValues: ["COUNT"]
    })

    const lastPage = Math.round((countResponse['body'][0]['COUNT(*)'] / pageSize) + 0.5)

    const navCell = (index: number) => {
        return <Link props={{
            href: composeHref({ page: index, pageSize: pageSize, tags: tags, tagsChainCommand: tagsChainCommand, filterObjects: filterObjects }),
            child: <>
                <p className='text-xl font-light'>{index}</p>
            </>,
            isExternal: false,
            className: `h-[50px] w-[50px] grid place-items-center md:hover:opacity-50 transition-all rounded-md ${index == page ? "bg-main text-white" : "bg-white"}`
        }} />
    }

    const navItems = () => {
        const cells = []
        if (page <= 5) {
            var max = 10
            if (lastPage < max) {
                max = lastPage + 1
            }
            for (var i = 1; i < max; i++) {
                cells.push(navCell(i))
            }
        } else {
            var last = page + 5
            if (last > lastPage) {
                last = lastPage + 1
            }
            for (var i = page - 4; i < last; i++) {
                cells.push(navCell(i))
            }
        }
        return cells
    }

    return <BoundsWrapper>
        <div className="space-y-8">
            <EmailsContent emailResponse={emailResponse} countResponse={countResponse} searchParams={{
                page: page,
                pageSize: pageSize,
                tags: tags,
                tagsChainCommand: tagsChainCommand,
                filterObjects: filterObjects,
            }} />
            <div className="md:grid place-items-center">
                <div className="md:flex space-x-4 items-end hidden">
                    <div className={`flex space-x-4 items-end ${page < 6 ? "hidden" : ""}`}>
                        <Link props={{
                            href: composeHref({ page: 1, pageSize: pageSize, tags: tags, tagsChainCommand: tagsChainCommand, filterObjects: filterObjects }),
                            child: <>
                                <p className='text-xl font-light'>1</p>
                            </>,
                            isExternal: false,
                            className: `h-[50px] w-[80px] grid place-items-center md:hover:opacity-50 transition-all rounded-md bg-white`
                        }} />
                        <p>...</p>
                    </div>
                    {navItems()}
                    <div className={`flex space-x-4 items-end ${page > lastPage - 5 ? "hidden" : ""}`}>
                        <p>...</p>
                        <Link props={{
                            href: composeHref({ page: lastPage, pageSize: pageSize, tags: tags, tagsChainCommand: tagsChainCommand, filterObjects: filterObjects }),
                            child: <>
                                <p className='text-xl font-light'>{lastPage}</p>
                            </>,
                            isExternal: false,
                            className: `h-[50px] w-[80px] grid place-items-center md:hover:opacity-50 transition-all rounded-md bg-white`
                        }} />
                    </div>
                </div>
                <div className="md:hidden grid grid-cols-2 gap-4">
                    <div className={`${page == 1 ? "hidden" : ""} bg-white rounded-md`}>
                        <Link props={{
                            href: composeHref({ page: page - 1, pageSize: pageSize, tags: tags, tagsChainCommand: tagsChainCommand, filterObjects: filterObjects }),
                            child: <>
                                <p className='text-xl font-light'>Previous</p>
                            </>,
                            isExternal: false,
                            className: `py-2 text-xl font-light grid place-items-center`
                        }} />
                    </div>
                    <div className={`${page == lastPage ? "hidden" : ""} bg-white rounded-md`}>
                        <Link props={{
                            href: composeHref({ page: page + 1, pageSize: pageSize, tags: tags, tagsChainCommand: tagsChainCommand, filterObjects: filterObjects }),
                            child: <>Next</>,
                            isExternal: false,
                            className: `py-2 text-xl font-light grid place-items-center`
                        }} />
                    </div>
                </div>
            </div>
        </div>
    </BoundsWrapper>
}