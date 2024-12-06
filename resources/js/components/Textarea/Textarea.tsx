interface ITextAreaProps {
    textareaId: string,
    label: string,
    formikErrors?: any,
    formikValues?: any,
    handleChange?: any,
    handleBlur?: any,
}

export const Textarea = ({ formikErrors, handleChange, handleBlur, formikValues, textareaId, label }: ITextAreaProps) => {
    return (
        <>
            <label className='form-label' htmlFor={label}>
                {label}
            </label>
            <textarea
                id={textareaId}
                name={textareaId}
                value={formikValues[textareaId]}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control">
            </textarea>
            {
                formikErrors[textareaId] && <div className="text-danger p-1">{formikErrors[textareaId]}</div>
            }
        </>
    )
}
