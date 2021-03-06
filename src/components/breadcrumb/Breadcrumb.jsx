import React, { Children } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Breadcrumb = ({ children, className, title, ...others }) => (
  <nav title={title}>
    <ol
      className={classnames('atomikui-breadcrumb', className, {})}
      {...others}
    >
      {Children.map(children, (child, i) => (
        <li key={`breadcumb-${i + 1}`}>{child}</li>
      ))}
    </ol>
  </nav>
);

Breadcrumb.propTypes = {
  /** Adds custom component CSS classes */
  className: PropTypes.string,
  /** Breadcrumb content. A list of Links */
  children: PropTypes.node,
  /** Title that gets assigned to breadcrumb <nav /> */
  title: PropTypes.string,
};

Breadcrumb.defaultProps = {
  className: '',
  children: null,
  title: 'breadcrumb',
};

export default Breadcrumb;
