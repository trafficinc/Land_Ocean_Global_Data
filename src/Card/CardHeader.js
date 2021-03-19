import React from 'react';
import classNames from 'classnames/bind';

import styles from './index.module.css';

const cx = classNames.bind(styles);

const CardHeader = ({ children, className, ...props }) => {
    return (
        <div className={cx('CardHeader', className)} {...props}>
            {children}
        </div>
    );
};

export default CardHeader;
