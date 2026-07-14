import React from 'react';
import icons from './icon-data';

/**
 * Icon — renders SVG icons from icon-data.
 * Icons paint with currentColor for easy color control.
 *
 * Usage:
 *   <Icon name="panel" size={20} />
 *   <Icon name="search" size={16} style={{ color: 'red' }} />
 */
export function Icon({ name, size = 20, ...rest }) {
  const icon = icons[name];
  if (!icon) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox={icon.viewBox}
      fill="none"
      dangerouslySetInnerHTML={{ __html: icon.body }}
      {...rest}
    />
  );
}

export default Icon;
