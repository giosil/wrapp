declare namespace GUI {
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
    function getUserLogged(): User;
    function getConfig(): any;
    function getPage(): any;
    function getLocale(): string;
    class HelloWorld extends WUX.WComponent {
        constructor();
        protected render(): string;
    }
}
