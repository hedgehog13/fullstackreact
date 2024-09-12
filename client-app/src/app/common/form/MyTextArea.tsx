
import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    rows: number
    label?: string
}


export default function MyTextAreaInput(props: Props) {
    const [filed, meta] = useField(props.name);
    const value = filed.value ?? "";
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label >{props.label}</label>
            <textarea {...filed} {...props} value={value}/>
            {meta.touched && meta.error ? (
                <Label basic color="red">{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}