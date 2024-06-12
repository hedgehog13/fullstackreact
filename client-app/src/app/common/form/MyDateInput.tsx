import { useField } from "formik";
import { Form } from "semantic-ui-react";
import DatePicker, { ReactDatePickerProps as Props } from 'react-datepicker';


export default function MyTextInput(props: Partial<Props>) {
    const [filed, meta, helpers] = useField(props.name!)
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker   {...filed} {...props}
                selected={(filed.value && new Date(filed.value)) || null}
                onChange={value => helpers.setValue(value)}
            ></DatePicker>
        </Form.Field>
    )
}