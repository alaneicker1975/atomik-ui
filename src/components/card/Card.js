import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Card = ({ children, className, footer, title, ...others }) => {
  return (
    <div className="atomikui-card" {...others}>
      {title && <div className="atomikui-card__header">{title}</div>}
      <div className="atomikui-card__body">{children}</div>
      {footer && <div className="atomikui-card__footer">{footer}</div>}
    </div>
  );
};

Card.propTypes = {
  /** Card body content */
  children: PropTypes.node,
  /** Adds custom component CSS classes */
  className: PropTypes.string,
  /** Card footer */
  footer: PropTypes.node,
  /** Card title */
  title: PropTypes.node,
};

Card.defaultProps = {
  children: <></>,
  className: '',
  footer: null,
  title: <></>,
};

export default Card;
