import { useSearchParams } from 'next/navigation';
import BoundsWrapper from '../../components/boundsWrapper';
import Link from '../../components/link';
import MailCell from '../../components/mailCell';
import getEmails from '../../lib/apiRoutes/getEmails';


export default async function Emails({ searchParams }: {
    searchParams:
    {
        page: string,
        pageSize: string,
        tags: string,
        tagsChainCommand: string
    }
}) {
    const page = Object.is(Number(searchParams.page), NaN) ? 1 : Number(searchParams.page) ?? 1
    const pageSize = Object.is(Number(searchParams.pageSize), NaN) ? 10 : Number(searchParams.pageSize) ?? 10
    const getFilterObjects = () => {
        const objs = []
        if (searchParams.tags != "" && searchParams.tags != undefined) {
            const splitTags = searchParams.tags.split(",")
            const chain = searchParams.tagsChainCommand == "" || searchParams.tagsChainCommand == undefined ? "AND" : searchParams.tagsChainCommand
            for (var i = 0; i < splitTags.length; i++) {
                objs.push({
                    "fieldName": "tags",
                    "operator": "in",
                    "value": splitTags[i],
                    "chainCommand": chain,
                })
            }
        }
        return objs
    }
    const emailResponse = await getEmails({
        page: page,
        pageSize: pageSize,
        filters: getFilterObjects()
    })
    const countResponse = await getEmails({
        filters: getFilterObjects(),
        returnValues: ["COUNT"]
    })
    const lastPage = Math.round((countResponse['body'][0]['COUNT(*)'] / pageSize) + 0.5)

    const emails = () => {
        const cells = []
        for (var i = 0; i < emailResponse['body'].length; i++) {
            cells.push(<MailCell obj={emailResponse['body'][i]} />)
        }
        return cells
    }

    const composeHref = (index: number) => {
        var href = `/emails?page=${index}&pageSize=${pageSize}`
        if (searchParams.tags != undefined && searchParams.tags != "") {
            href += `&tags=${searchParams.tags}`
        }
        if (searchParams.tagsChainCommand != undefined && searchParams.tagsChainCommand != "") {
            href += `&tagsChainCommand=${searchParams.tagsChainCommand}`
        }
        return href
    }

    const navCell = (index: number) => {
        return <Link props={{
            href: composeHref(index),
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
            for (var i = 1; i < 10; i++) {
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
        <div className="space-y-4">
            <div className="grid place-items-center">
                <div className="flex space-x-4 items-end">
                    <div className={`flex space-x-4 items-end ${page < 6 ? "hidden" : ""}`}>
                        <Link props={{
                            href: composeHref(1),
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
                            href: composeHref(lastPage),
                            child: <>
                                <p className='text-xl font-light'>{lastPage}</p>
                            </>,
                            isExternal: false,
                            className: `h-[50px] w-[80px] grid place-items-center md:hover:opacity-50 transition-all rounded-md bg-white`
                        }} />
                    </div>
                </div>
            </div>
            <p>Total: {countResponse['body'][0]['COUNT(*)']}</p>
            {emails()}
        </div>
    </BoundsWrapper>
}