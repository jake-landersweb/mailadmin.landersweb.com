'use client';

import { useState } from "react";
import Field from "../../components/field";

type FilterObjectProps = {
    fieldName: string
    operator: string
    value: string
    chainCommand: string
    onRemove: () => void
}

const FilterObject = ({ props }: { props: FilterObjectProps }) => {

    const [fieldName, setFieldName] = useState(props.fieldName)
    const [operator, setOperator] = useState(props.operator)
    const [value, setValue] = useState(props.value)
    const [chainCommand, setChainCommand] = useState(props.chainCommand)

    return <div className="bg-white rounded-md relative">
        <button onClick={() => props.onRemove()} className="bg-gray-300 absolute top-0 right-0 px-2 py-1 rounded-tr-md rounded-bl-md md:hover:opacity-50 transition-all">Remove</button>
        <Field props={{
            value: fieldName,
            label: "Field Name",
            onChanged: (val: string) => setFieldName(val),
            initText: fieldName,
        }} />
        <div className="w-full ml-8 h-[0.5px] bg-bg-700"></div>
        <Field props={{
            value: operator,
            label: "Operator",
            onChanged: (val: string) => setOperator(val),
            initText: operator,
        }} />
        <div className="w-full ml-8 h-[0.5px] bg-bg-700"></div>
        <Field props={{
            value: value,
            label: "Value",
            onChanged: (val: string) => setValue(val),
            initText: value,
        }} />
        <div className="w-full ml-8 h-[0.5px] bg-bg-700"></div>
        <Field props={{
            value: chainCommand,
            label: "Chain Command",
            onChanged: (val: string) => setChainCommand(val),
            initText: chainCommand,
        }} />
    </div>
}

export default FilterObject