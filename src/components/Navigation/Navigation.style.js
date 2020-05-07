import { colors } from '../../constants';
/** @jsx jsx */  import { jsx, css } from '@emotion/core';

const main = css`
    width: 100%;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    position: relative;
    margin-bottom: 20px;
`;
const menu = css`
    position: absolute;
    top: 110%;
    right: 50%;
    transform: translate(45%, 0);
    background: #fff;
    padding: 15px;
`;
const button = css`
    background: none;
    border: 0;
    margin: 0;
    padding: 0;
    font-size: 16px;
    cursor: pointer
`;

const styles = {
    main, menu, button
}

export default styles;