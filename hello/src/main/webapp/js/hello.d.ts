interface User {
    id: number;
    userName: string;
    currLogin: Date;
    tokenId?: string;
    role?: string;
    email?: string;
    mobile?: string;
    locale?: string;
}
declare function getUserLogged(): User;
declare function getConfig(): any;
declare function getPage(): any;
declare function getLocale(): string;
declare class HelloWorld extends WUX.WComponent {
    constructor();
    protected render(): string;
}
