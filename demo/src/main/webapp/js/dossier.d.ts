declare namespace GUI {
    class GUIPathologies extends WUX.WComponent {
        container: WUX.WContainer;
        tagsFilter: WUX.WTags;
        fpFilter: WUX.WFormPanel;
        fpDetail: WUX.WFormPanel;
        btnFind: WUX.WButton;
        btnReset: WUX.WButton;
        btnNew: WUX.WButton;
        cntActions: AppTableActions;
        btnOpen: WUX.WButton;
        btnSave: WUX.WButton;
        btnCancel: WUX.WButton;
        tabResult: WUX.WDXTable;
        selId: any;
        isNew: boolean;
        status: number;
        readonly iSTATUS_STARTUP = 0;
        readonly iSTATUS_VIEW = 1;
        readonly iSTATUS_EDITING = 2;
        constructor(id?: string);
        protected render(): WUX.WContainer;
        collapseHandler(e: JQueryEventObject): void;
    }
}
declare namespace GUI {
    class SYM_P {
        static ID: string;
        static CODE: string;
        static FAMILY: string;
        static NAME: string;
        static BIRTHDATE: string;
        static GENDER: string;
        static EMAIL: string;
        static PHONE: string;
        static TITLE: string;
    }
    class SYM_H {
        static ID: string;
        static DATE: string;
        static SERV: string;
        static STRU: string;
        static PATH: string;
        static FARE: string;
        static AGRE: string;
    }
    class DlgHistory extends WUX.WDialog<string, any[]> {
        protected fp: WUX.WFormPanel;
        protected table: WUX.WDXTable;
        protected btnAdd: WUX.WButton;
        protected btnRes: WUX.WButton;
        constructor(id: string);
        updateState(nextState: any[]): void;
        getState(): any[];
        delete(id: string): void;
        protected onShown(): void;
    }
    class GUIPatients extends WUX.WComponent {
        container: WUX.WContainer;
        tagsFilter: WUX.WTags;
        fpFilter: WUX.WFormPanel;
        fpDetail: WUX.WFormPanel;
        btnFind: WUX.WButton;
        btnReset: WUX.WButton;
        btnNew: WUX.WButton;
        cntActions: AppTableActions;
        btnOpen: WUX.WButton;
        btnSave: WUX.WButton;
        btnCancel: WUX.WButton;
        btnHist: WUX.WButton;
        tabResult: WUX.WDXTable;
        selId: any;
        isNew: boolean;
        status: number;
        readonly iSTATUS_STARTUP = 0;
        readonly iSTATUS_VIEW = 1;
        readonly iSTATUS_EDITING = 2;
        ckFlt: boolean;
        dlgHist: DlgHistory;
        constructor(id?: string);
        protected render(): WUX.WContainer;
        collapseHandler(e: JQueryEventObject): void;
        showHistory(): void;
    }
}
declare namespace GUI {
    class GUIServices extends WUX.WComponent {
        container: WUX.WContainer;
        tagsFilter: WUX.WTags;
        fpFilter: WUX.WFormPanel;
        fpDetail: WUX.WFormPanel;
        btnFind: WUX.WButton;
        btnReset: WUX.WButton;
        btnNew: WUX.WButton;
        cntActions: AppTableActions;
        btnOpen: WUX.WButton;
        btnSave: WUX.WButton;
        btnCancel: WUX.WButton;
        tabResult: WUX.WDXTable;
        selId: any;
        isNew: boolean;
        status: number;
        readonly iSTATUS_STARTUP = 0;
        readonly iSTATUS_VIEW = 1;
        readonly iSTATUS_EDITING = 2;
        constructor(id?: string);
        protected render(): WUX.WContainer;
        collapseHandler(e: JQueryEventObject): void;
    }
}
declare namespace GUI {
    class GUIStatEvents extends WUX.WComponent {
        container: WUX.WContainer;
        tagsFilter: WUX.WTags;
        fpFilter: WUX.WFormPanel;
        selMonth: SelMonth;
        btnFind: WUX.WButton;
        btnReset: WUX.WButton;
        chrPE: WUX.WChartJS;
        chrPV: WUX.WChartJS;
        chrPP: WUX.WChartJS;
        chrGV: WUX.WChartJS;
        constructor(id?: string);
        protected render(): WUX.WContainer;
        collapseHandler(e: JQueryEventObject): void;
        protected fix(): void;
    }
}
declare namespace GUI {
    class GUIStructures extends WUX.WComponent {
        container: WUX.WContainer;
        tagsFilter: WUX.WTags;
        fpFilter: WUX.WFormPanel;
        fpDetail: WUX.WFormPanel;
        btnFind: WUX.WButton;
        btnReset: WUX.WButton;
        btnNew: WUX.WButton;
        cntActions: AppTableActions;
        btnOpen: WUX.WButton;
        btnSave: WUX.WButton;
        btnCancel: WUX.WButton;
        tabResult: WUX.WDXTable;
        selId: any;
        isNew: boolean;
        status: number;
        readonly iSTATUS_STARTUP = 0;
        readonly iSTATUS_VIEW = 1;
        readonly iSTATUS_EDITING = 2;
        constructor(id?: string);
        protected render(): WUX.WContainer;
        collapseHandler(e: JQueryEventObject): void;
    }
}
