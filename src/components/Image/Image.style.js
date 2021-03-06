import { colors } from '../../constants';
/** @jsx jsx */  import { jsx, css } from '@emotion/core';

const avatar = css`
    width: 50px;
    height: 50px;
    border-radius: 100px;
    overflow: hidden;
    background: ${colors.lightblue};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    img {
        width: 100%;
        height: auto;
    }
`;

const styles = {
    avatar
}


export default styles;