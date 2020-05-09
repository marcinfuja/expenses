import { colors } from '../../constants';
/** @jsx jsx */  import { jsx, css } from '@emotion/core';

const addExpenseHolder = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 0 20px;
    width: 100%;
    input, button {
        transition: all 0.2s ease-in-out;
    }
    > div {
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
    }
`;

const top = css`
    min-height: 20px;
    margin: 20px 0 0;
`;

const personInDebt = css`
    font-weight: 400;
    letter-spacing: 1px;
    font-size: 14px;
`;
const highlight = css`
    input {
        border-bottom-color: ${colors.lightblue};
    }
    button {
        background: ${colors.lightblue};
    }
`;

const formContainer = css`
    width: 100%;
    display: flex;
    flex-direction: row;
    > div {
        input {
            width: 100%;
        } 
    } 
    > div:nth-of-type(1) {
        width: calc(40% - 20px);
    }
    > div:nth-of-type(2) {
        width: 20%;
    }
    > div:nth-of-type(3) {
        width: 30%;
    }
    > div:nth-of-type(4) {
        width: 10%;
        display: flex;
        justify-content: flex-end;
    }
`;

const styles = {
    addExpenseHolder, highlight, top, personInDebt, formContainer
}

export default styles;