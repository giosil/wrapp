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
    class AppTableActions extends WUX.WComponent {
        left: WUX.WContainer;
        right: WUX.WContainer;
        constructor(id: string);
        protected componentDidMount(): void;
    }
    class SYM_E {
        static ID: string;
        static CODE: string;
        static DESC: string;
        static TYPE: string;
        static FARE: string;
        static TYPE_DESC: string;
        static AGRE: string;
    }
}
declare var jrpc: JRPC;
declare namespace GUI {
    class SelMonth extends WUX.WSelect2 {
        constructor(id?: string, mesi?: number, pros?: number);
    }
    class SelSerType extends WUX.WSelect2 {
        constructor(id?: string, multiple?: boolean);
    }
    class SelPatType extends WUX.WSelect2 {
        constructor(id?: string, multiple?: boolean);
    }
    class SelServices extends WUX.WSelect2 {
        constructor(id?: string, multiple?: boolean);
        protected componentDidMount(): void;
    }
    class SelStructures extends WUX.WSelect2 {
        constructor(id?: string, multiple?: boolean);
        protected componentDidMount(): void;
    }
    class SelPathologies extends WUX.WSelect2 {
        constructor(id?: string, multiple?: boolean);
        protected componentDidMount(): void;
    }
}
