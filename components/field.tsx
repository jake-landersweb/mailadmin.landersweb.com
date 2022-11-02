

type FieldProps = {
    value: string
    label: string
    onChanged: (val: string) => void
    initText?: string
    showLabelText?: boolean
    isTextArea?: boolean
    inputType?: string
    className?: string
}

const Field = ({ props }: { props: FieldProps }) => {
    const { value, label, onChanged, initText = "", showLabelText = false, isTextArea = false, inputType = "text", className = "" } = props
    const header = () => {
        if (showLabelText) {
            return <h3 className="font-bold text-md ml-4 text-gray-500">
                {props.label}
            </h3>
        } else {
            return null
        }
    }

    const content = () => {
        const cls = `${className} py-2 px-4 bg-white w-full rounded-md border-transparent border-2 focus:outline-none focus:border-main`
        if (isTextArea) {
            return <textarea value={value} className={cls} onChange={fieldChanged} placeholder={label} />
        } else {
            return <input value={value} className={cls} onChange={fieldChanged} placeholder={label} type={inputType} />
        }
    }

    const fieldChanged = (event: any) => {
        onChanged(event.target.value)
    }

    return <div className="space-y-1 w-full">
        {header()}
        {content()}
    </div>
}

export default Field