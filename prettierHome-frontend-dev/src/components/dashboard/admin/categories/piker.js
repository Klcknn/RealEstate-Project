import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './piker.scss';

const IconPicker = ({ icons, defaultValue, onChange }) => {
  const [iconState, setIconState] = useState({
    icon: defaultValue || '',
    isOpen: false,
    position: { top: 0, left: 0 },
  });

  const { icon, isOpen, position } = iconState;
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const isButton = e.target === buttonRef.current;
      const isButtonChild = buttonRef.current?.children?.[0] === e.target;

      if (!isButton && !isButtonChild) {
        setIconState((prev) => ({ ...prev, isOpen: false }));
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const selectIcon = (selectedIcon) => {
    setIconState((prev) => ({ ...prev, icon: selectedIcon, isOpen: false }));
    onChange(selectedIcon);
  };

  const openIconList = () => {
    const clientRect = buttonRef.current.getBoundingClientRect();
    setIconState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
      position: { top: clientRect.top + 45, left: clientRect.left },
    }));
  };

  return (
    <div className="IconPickerWrapper">
      <div className="BtnGroup" style={{ padding: 0 }}>
        <button type="button" className='icon-btn'>
          <FontAwesomeIcon icon={icon} />
        
        </button>
        <button type="button" className='icon-btn-ok' onClick={openIconList} ref={buttonRef}>
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>
      <div style={{ position: 'relative' }}>
        {isOpen && (
          <div className="IconListWrap" style={{ top: `${position.top}px`, left: `${position.left}px` }}>
            <div className="IconListInner">
              <ul className="IconList">
                {icons.map((icon, index) => (
                  <li key={index} className="IconItem" onClick={() => selectIcon(icon)}>
                    <FontAwesomeIcon icon={icon} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IconPicker;
