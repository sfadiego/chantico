import React from 'react';
import { IButtonProps } from '@components/Buttons/interface/IButtonProps';
import { ButtonTypeEnum } from '@components/Button/enums/buttonType.enum.ts';
import { Button } from 'react-bootstrap';

const ButtonComponent: React.FC<IButtonProps> = ({ type = ButtonTypeEnum.Button, onClickFunction, isLoading, className, children }) => {
    return (
        <Button onClick={onClickFunction} disabled={isLoading} type={type} className={className}>
            {children}
        </Button>
    );
}

export default ButtonComponent;