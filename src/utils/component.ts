import { Component, ComponentType } from 'react';

// tslint:disable:no-any

export const getDisplayName = (component: ComponentType) => component.displayName || component.name || Component.name;

export const getHocDisplayName = (parent: ComponentType<any>, child: ComponentType<any>) =>
    `${getDisplayName(parent)}(${getDisplayName(child)})`;
