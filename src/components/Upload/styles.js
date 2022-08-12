import styled, { css } from "styled-components";

const dragActive = css`
    border-color: #78e5d5;
`;

const dragReject = css`
    border-color: #e57878;
`;

export const DropContainer = styled.div.attrs({
    className: "dropzone",
})`
    border: 1px dashed #ddd;
    border-radius: 4px;
    cursor: pointer;

    padding: 32px;
    font-size: 2rem;
    transition: height 0.2s ease;

    ${(props) => props.isDragActive && dragActive};
    ${(props) => props.isDragReject && dragReject};

    @media (max-width: 600px) {
        font-size: 1rem;
        padding: 0px;
    }

    @media (max-width: 300px) {
        font-size: 12px;
        padding: 0px;
    }
`;

const messageColors = {
    default: "#999",
    error: "#e57878",
    success: "#78e5d5",
};

export const UploadMessage = styled.p`
    display: flex;
    color: ${(props) => messageColors[props.type || "default"]};
    justify-content: center;
    align-items: center;
    padding: 15px 0;
`;
