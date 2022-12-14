'use client';

import { useState } from "react";
import Field from "../../components/field";
import Link from "../../components/link";
import MailCell from "../../components/mailCell";
import EmailPageContent from "../../lib/data/emailPageContent";
import composeHref from "../../lib/functions/composeHref";
import getFilterObjects from "../../lib/functions/getFilterObjects";
import FilterObject from "./filterObject";

const EmailsContent = ({ emailResponse, countResponse, searchParams }: {
    emailResponse: any,
    countResponse: any,
    searchParams: {
        page: number,
        pageSize: number,
        tags: string,
        tagsChainCommand: string,
        filterObjects: string,
    }
}) => {

    const [tags, setTags] = useState(searchParams.tags)
    const [fos, setFos] = useState(getFilterObjects(searchParams.filterObjects))

    const emails = () => {
        const cells = []
        for (var i = 0; i < emailResponse['body'].length; i++) {
            cells.push(<MailCell obj={emailResponse['body'][i]} />)
        }
        return cells
    }

    const removeFilterObject = (index: number) => {
        console.log(index)
        const tmp = [...fos]
        tmp.splice(index, 1)
        setFos(tmp)
    }

    const filterObjects = () => {
        const cells = []
        for (var i = 0; i < fos.length; i++) {
            const idx = i
            cells.push(<FilterObject props={{
                fieldName: fos[idx]['fieldName'],
                operator: fos[idx]['operator'] == "" ? "in" : fos[idx]['operator'],
                value: fos[idx]['value'],
                chainCommand: fos[idx]['chainCommand'] == "" ? "AND" : fos[idx]['chainCommand'],
                showChain: idx != 0,
                onRemove: () => removeFilterObject(idx),
                onUpdate: (fo) => {
                    const tmp = [...fos]
                    tmp[idx] = fo
                    setFos(tmp)
                }
            }} />)
        }
        return cells
    }

    const composeFilterObjects = () => {
        var fosString = ""

        for (var i = 0; i < fos.length; i++) {
            const idx = i
            if (fos[idx]['fieldName'] != "" && fos[idx]['operator'] != "" && fos[idx]['value'] != "") {
                if (idx == 0) {
                    fosString = `${fos[idx]['fieldName']},${fos[idx]['operator']},${fos[idx]['value']},${fos[idx]['chainCommand']}`
                } else {
                    fosString += `--${fos[idx]['fieldName']},${fos[idx]['operator']},${fos[idx]['value']},${fos[idx]['chainCommand']}`
                }
            }
        }
        return fosString
    }

    return <div className="space-y-4">
        <div className="space-y-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">
                <div className="space-y-2">
                    <p>Tags (Comma Separated)</p>
                    <Field props={{
                        value: tags,
                        label: "Tags",
                        onChanged: (val: string) => setTags(val),
                        initText: tags,
                    }} />
                </div>
                <div className="space-y-2">
                    <p>Filter Objects</p>
                    {filterObjects()}
                    <button className="mt-2" onClick={() => {
                        setFos([...fos, {
                            "fieldName": "",
                            "operator": "in",
                            "value": "",
                            "chainCommand": "AND"
                        }])
                    }}><p className="px-4 py-1 bg-main text-white rounded-md md:hover:bg-opacity-50 transition-all">Add</p></button>
                </div>
            </div>
            <div className="grid place-items-center">
                <a href={composeHref({ page: 1, pageSize: searchParams.pageSize, tags: tags.toLowerCase(), tagsChainCommand: searchParams.tagsChainCommand, filterObjects: composeFilterObjects() })}>
                    <p className="bg-main px-8 py-2 grid place-items-center rounded-md text-white md:hover:opacity-50 transition-all">Search</p>
                </a>
            </div>
        </div>
        <p>Total: {countResponse['body'][0]['COUNT(*)']}</p>
        {emails()}
    </div>
}

export default EmailsContent