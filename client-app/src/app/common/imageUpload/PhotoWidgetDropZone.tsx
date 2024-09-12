
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react';


interface Props {
    setFiles: (files: object[]) => void;
}
export default function PhotoWidgetDropZone({ setFiles }: Props) {

    const dzStyles = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        paddinTop: '30px',
        textAlign: 'center' ,
        height: '200px'
    } as object

    const dzActive = {

        borderColor: 'green'
    }

    const onDrop = useCallback((acceptedFiles: object[]) => {
        setFiles(
            acceptedFiles.map((file:object) => ({
                ...file,
                preview: URL.createObjectURL(file as Blob)
            }))
        )
    }, [setFiles]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}>
            <input {...getInputProps()} />
            <Icon name='upload' size='huge' />
            <Header content='Drop image here' />
        </div>
    )
}