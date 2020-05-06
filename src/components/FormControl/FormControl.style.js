import { colors } from '../../constants';
/** @jsx jsx */  import { jsx, css } from '@emotion/core';

const formControl = css`
    padding: 0 0 0 0;
    border: none;
    border-bottom: 1px solid ${colors.blue};
    font-weight: 400;
    font-size: 18px;
    line-height: 1em;
    outline: 0;
    height: 40px;
    min-width: 0;
    background: none;
    margin: 0 10px 0 0;
`;

const styles = {
    formControl
}

export default styles;