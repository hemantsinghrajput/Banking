import { Avatar as AntdAvatar, AvatarProps } from 'antd';
import React from 'react';

type Props = AvatarProps & {
    name?: string;
};

export const CustomAvatar: React.FC<Props> = ({ name, style, ...rest }) => {
    return (
        <AntdAvatar
            alt={name}
            size="small"
            style={{
                backgroundColor: '#87d068',
                display: 'flex',
                alignItems: 'center',
                border: 'none',
                ...style,
            }}
            {...rest}
        >
            {name}
        </AntdAvatar>
    );
};

export default CustomAvatar;
