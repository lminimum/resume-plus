import React from 'react';
import { Avatar as AntdAvatar } from 'antd';

type AvatarProps = {
  avatarSrc?: string;
  className?: string;
  shape?: string;
  size?: string;
  };

export const Avatar: React.FC<AvatarProps> = ({
  avatarSrc,
  className,
  shape = 'circle',
  size = 'default',
  }) => {
  return (
    <div className={`avatar ${!avatarSrc ? 'avatar-hidden' : ''}`}>
      {avatarSrc ? (
        <AntdAvatar
          className={className}
          src={avatarSrc}
          shape={shape as 'circle' | 'square'}
          size={size as 'large' | 'default' | 'small' | number}
        />
      ) : (
        <span className="text-gray-400 text-sm">头像地址为空</span>
      )}
    </div>
  );
};
