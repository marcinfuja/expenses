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

const loginScreen = css`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    button {
        background: none;
        border: 0;
        cursor: pointer;
        font-size: 20px;
        color: ${colors.darkblue};
    }
    h1 {
       font-size: 40px;
       margin: 20px 0 30px 
    }
`;

const menu = css`
    position: absolute;
    top: 100%;
    right: 0;
`;

const styles = {
    app, container, loginScreen, menu
}

export default styles;