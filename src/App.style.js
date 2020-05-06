import { colors } from './constants';
/** @jsx jsx */  import { jsx, css } from '@emotion/core';

const app = css`
    background: ${colors.lightbeige};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    color:  ${colors.darkblue};
    min-height: 100vh;
`;

const main = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const container = css`
    width: 100%;
    max-width: 410px;
    padding: 20px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
    margin: 20px 0 0;
`;

const styles = {
    app, main, container
}

export default styles;