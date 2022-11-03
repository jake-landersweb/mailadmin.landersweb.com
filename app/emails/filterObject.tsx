'use client';

import { useState } from "react";
import Field from "../../components/field";

type FilterObjectProps = {
    fieldName: string
    operator: string
    value: string
    chainCommand: string
    showChain: boolean
    onRemove: () => void
    onUpdate: (fo: any) => void
}

const FilterObject = ({ props }: { props: FilterObjectProps }) => {

    const operatorValues = [">", "=", "<", "bw", "in", "ew", "!="]
    const chainCommandValues = ["AND", "OR"]


    const operators = () => {
        const cells = []
        for (var i = 0; i < operatorValues.length; i++) {
            const idx = i
            cells.push(<button onClick={() => onChanged(() => props.operator = operatorValues[idx])}><p className={`px-4 py-1 bg-gray-100 rounded-md border-2 md:hover:opacity-50 transition-all ${props.operator == operatorValues[idx] ? "border-main" : "border-transparent"}`}>{operatorValues[idx]}</p></button>)
        }
        return cells
    }

    const chainCommands = () => {
        const cells = []
        for (var i = 0; i < chainCommandValues.length; i++) {
            const idx = i
            cells.push(<button onClick={() => onChanged(() => props.chainCommand = chainCommandValues[idx])}><p className={`px-4 py-1 bg-white rounded-md border-2 md:hover:opacity-50 transition-all ${props.chainCommand == chainCommandValues[idx] ? "border-main" : "border-transparent"}`}>{chainCommandValues[idx]}</p></button>)
        }
        return cells
    }

    const onChanged = (fn: () => void) => {
        fn()
        props.onUpdate({
            "fieldName": props.fieldName,
            "operator": props.operator,
            "value": props.value,
            "chainCommand": props.chainCommand,
        })
    }

    return <div className="space-y-2">
        <div className={`${props.showChain ? "md:flex md:space-x-2 py-1 grid grid-cols-4 gap-2" : "hidden"}`}>
            {chainCommands()}
        </div>
        <div className="bg-white rounded-md relative">
            <button onClick={() => props.onRemove()} className="bg-gray-300 absolute top-0 right-0 px-2 py-1 rounded-tr-md rounded-bl-md md:hover:opacity-50 transition-all">Remove</button>
            <Field props={{
                value: props.fieldName,
                label: "Field Name",
                onChanged: (val: string) => onChanged(() => props.fieldName = val),
                initText: props.fieldName,
            }} />
            <div className="w-full ml-8 h-[0.5px] bg-bg-700"></div>
            <div className="md:flex md:space-x-2 py-1 px-2 grid grid-cols-4 gap-2">
                {operators()}
            </div>
            <div className="w-full ml-8 h-[0.5px] bg-bg-700"></div>
            <Field props={{
                value: props.value,
                label: "Value",
                onChanged: (val: string) => onChanged(() => props.value = val),
                initText: props.fieldName,
            }} />
        </div>
    </div>
}

export default FilterObject