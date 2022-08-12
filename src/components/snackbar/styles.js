import styled, { css } from "styled-components";

const visible = css`
    opacity: 1;
    bottom: 20px;
    visibility: visible;
`;

const success = css`
    background-color: rgb(0, 158, 0);
`;

const info = css`
    background-color: rgb(86, 83, 255);
`;

const warning = css`
    background-color: rgb(255, 181, 44);
`;

const error = css`
    background-color: rgb(219, 55, 55);
`;

export const SnackbarContent = styled.div`
    background-color: #333;
    position: fixed;
    bottom: 0;
    left: 50%;
    width: 400px;
    margin-left: -200px;
    opacity: 0;
    visibility: hidden;
    color: #fff;
    padding: 16px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 200ms ease-in-out;

    ${(props) => props.open && visible};
    ${(props) => props.type === "success" && success};
    ${(props) => props.type === "info" && info};
    ${(props) => props.type === "warning" && warning};
    ${(props) => props.type === "error" && error};

    .close {
        font-size: 18px;
        cursor: pointer;
        transition: 200ms;
        padding: 0;
        border: 0;
        background-color: transparent;
        color: #fff;
    }

    @media (max-width: 480px) {
        width: 100%;
        margin-left: 0;
        left: 0;
        border-radius: 4px 4px 0 0;

        ${visible} {
            bottom: 0;
        }
    }
`;
