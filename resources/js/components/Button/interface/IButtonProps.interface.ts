import React from 'react';
import { ButtonTypeEnum } from '@components/Button/enums/buttonType.enum.ts';

export interface IButtonProps {
    className?: string;
    label?: string;
    loading?: boolean;
    type: ButtonTypeEnum;
    children?: React.ReactNode;
}