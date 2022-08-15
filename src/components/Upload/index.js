import React from "react";
import { useDropzone } from "react-dropzone";
import { IoMdCloudUpload } from "react-icons/io";

import {
    AcceptedFiles,
    DropContainer,
    MaxFileSize,
    UploadMessage,
} from "./styles";

const Upload = (props) => {
    const { onUpload } = props;

    const { getRootProps, getInputProps, isDragActive, isDragReject } =
        useDropzone({
            accept: {
                "image/*": [],
            },
            onDropAccepted: onUpload,
        });

    const renderDragMessage = (isDragActive, isDragReject) => {
        if (!isDragActive) {
            return <UploadMessage>Arraste arquivos aqui...</UploadMessage>;
        }

        if (isDragReject) {
            return (
                <UploadMessage type="error">
                    Arquivo não suportado
                </UploadMessage>
            );
        }

        return (
            <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>
        );
    };

    return (
        <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
        >
            <input {...getInputProps()} />
            {renderDragMessage(isDragActive, isDragReject)}
            <MaxFileSize>Arquivos de no máximo 2 MB.</MaxFileSize>
            <AcceptedFiles>
                .png, .jpeg, .jpg, .pjpeg, .gif
                <IoMdCloudUpload className="icon" />
            </AcceptedFiles>
        </DropContainer>
    );
};

export default Upload;
