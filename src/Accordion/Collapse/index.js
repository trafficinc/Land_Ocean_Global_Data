import React from 'react';
import PropTypes from 'prop-types';

import { useAccordionContext } from '../hooks';

const Collapse = ({
    element: Component,
    eventKey,
    children,
    ...otherProps
}) => {
    const { activeEventKey } = useAccordionContext();

    return activeEventKey === eventKey ? (
        <Component {...otherProps}>{children}</Component>
    ) : null;
};

Collapse.propTypes = {
    element: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Collapse.defaultProps = {
    element: 'div'
};

export default Collapse;
