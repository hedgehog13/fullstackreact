import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?:string
}


export default function MyTextInput(props: Props) {
    const [filed, meta] = useField(props.name)
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label >{props.label}</label>
            <input {...filed} {...props} />
            {meta.touched && meta.error ? (
                <Label basic color="red">{meta.error}</Label>
            ): null}
        </Form.Field>
    )
}