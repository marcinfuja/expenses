import { colors } from '../../constants';
/** @jsx jsx */  import { jsx, css } from '@emotion/core';

const payoutSummary = css`
    margin: 40px 0 20px;
    font-size: 26px;
`;

const payoutSummaryAmmount = css`
    font-size: 44px;
    font-weight: bold;
    margin-left: 0;
`;

const styles = {
    payoutSummary, payoutSummaryAmmount
}

export default styles;