declare module '*.module.scss' {
    const classNames: {
        [className: string]: string;
    };
    export default classNames;
}

declare module '*.svg';

type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
