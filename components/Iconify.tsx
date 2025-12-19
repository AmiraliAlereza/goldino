import { Icon, IconProps } from '@iconify/react';
import { FC } from 'react';

interface IconifyProps extends IconProps {
  className?: string;
}

const Iconify: FC<IconifyProps> = ({ icon, className, ...other }) => {
  return (
    <Icon 
      icon={icon} 
      className={className} 
      {...other} 
    />
  );
};

export default Iconify;