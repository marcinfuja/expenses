import { colors } from '../../constants';
/** @jsx jsx */  import { jsx, css } from '@emotion/core';

const button = css`
    padding: 15px;
    font-size: 18px;
    color: ${colors.darkblue};
    background: none;
    border: 0;
    margin: 0 10px;
    cursor: pointer;
    outline: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const expense = css`
    font-weight: 700;
    padding: 10px 15px;
    margin-right: 20px;
    margin-left: 0;
    &.active {
        background: ${colors.darkblue};
        color: #fff;
    }
`;

const add = css`
    background: ${colors.blue};
    padding: 0;
    display: flex;
    border-radius: 3px;
    flex-direction: column;
    height: 30px;
    width: 30px;
    padding: 0;
    justify-content: center;
    align-items: center;
    margin: 0;
`;

const reset = css`
    font-size: 12px;
    background: ${colors.red};
    padding: 8px 10px 8px;
    color: #fff;
    border-radius: 3px;
`;

const deleteBtn = css`
    border: 0;
    background: none;
    padding: 0;
`;

const styles = {
    button, expense, add, reset, deleteBtn
}

export default styles;