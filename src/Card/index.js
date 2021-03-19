import React from 'react';
import classNames from 'classnames/bind';

import styles from './index.module.css';
import CardHeader from './CardHeader';
import CardBody from './CardBody';

const cx = classNames.bind(styles);

const Card = ({ children, className }) => {
    return <div className={cx('Card', className)}>{children}</div>;
};

Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;