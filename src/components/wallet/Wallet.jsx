import React, { Children, cloneElement } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import WalletItem from './components/wallet-item';

const Wallet = ({ children, className, isGrid, ...others }) => (
  <div
    className={classnames('atomikui-wallet', className, {
      'atomikui-wallet--grid': isGrid,
    })}
    {...others}
  >
    {isGrid
      ? Children.map(children, (child) =>
          cloneElement(child, {
            className: 'atomikui-wallet-item--grid',
          }),
        )
      : children}
  </div>
);

Wallet.propTypes = {
  /** Payment method passed in to Wallet as children */
  children: PropTypes.node,
  /** Adds custom component CSS classes */
  className: PropTypes.string,
  /** Sets the layout as a grid format */
  isGrid: PropTypes.bool,
};

Wallet.defaultProps = {
  children: null,
  className: '',
  isGrid: false,
};

Wallet.Item = WalletItem;

export default Wallet;
