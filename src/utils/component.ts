import { Component, ComponentType } from 'react';

export const getDisplayName = (component: ComponentType<any>) => component.displayName || component.name || Component.name;

export const getHocDisplayName = (parent: ComponentType<any>, child: ComponentType<any>) =>
    `${getDisplayName(parent)}(${getDisplayName(child)})`;
