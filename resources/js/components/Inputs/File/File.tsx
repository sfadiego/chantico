interface IInputFileProps {
    inputId: string,
    formikErrors?: { [key: string]: string };
    label: string,
    acceptInputTypes: string,
    onChangeEvent: (e: any) => void
}

export const File = ({
    formikErrors,
    onChangeEvent,
    acceptInputTypes,
    label,
    inputId
}: IInputFileProps) => {

    return (
        <>
            <label className='form-label' htmlFor={inputId}>{label} </label>
            <input
                type='file'
                id={inputId}
                name={inputId}
                onChange={onChangeEvent}
                accept={acceptInputTypes}
                className="form-control">
            </input>
            {
                (formikErrors && formikErrors[inputId])
                && <div className="text-danger p-1">{formikErrors[inputId]}</div>
            }
        </>
    )
}
