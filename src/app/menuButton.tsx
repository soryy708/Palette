import React, { useState, useEffect } from 'react';

type MenuItem = {
    text: string;
    menuItems?: MenuItem[];
    onClose?: () => void;
    onClick?: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

type MenuButtonProps = MenuItem;

const MenuButton: React.FunctionComponent<MenuButtonProps> = (props: MenuButtonProps) => {
    const [isOpen, setOpen] = useState(false);
    const [isInitial, setIsInitial] = useState(true);

    useEffect(() => {
        if (!isInitial && !isOpen && props.onClose) {
            props.onClose();
        }
        if (isInitial) {
            setIsInitial(false);
        }
    }, [isOpen, props.onClose]);

    return <React.Fragment>
        <button
            type="button"
            onClick={ev => {
                setOpen(prevIsOpen => !prevIsOpen);
                if (props.onClick) {
                    props.onClick(ev);
                }
            }}
        >
            {props.text}
        </button>
        {isOpen &&
            <div className="menuButtonMenu">
                {props.menuItems.map((item, i) =>
                    item.menuItems ? (
                        <div key={i}>
                            <MenuButton
                                {...item}
                                onClose={() => {
                                    if (item.onClose) {
                                        item.onClose();
                                    }
                                    setOpen(false);
                                }}
                            />
                        </div>
                    ) : (
                        <button
                            type="button"
                            key={JSON.stringify(item)}
                            onClick={ev => {
                                if (item.onClick) {
                                    item.onClick(ev);
                                }
                                if (item.onClose) {
                                    item.onClose();
                                }
                                setOpen(false);
                            }}
                        >
                            {item.text}
                        </button>
                    )
                )}
            </div>
        }
    </React.Fragment>;
};

export default MenuButton;
