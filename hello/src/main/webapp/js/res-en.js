WUX.RES.OK = 'OK';
WUX.RES.CLOSE = 'Close';
WUX.RES.CANCEL = 'Cancel';
WUX.RES.ERR_DATE = 'Invalid date.';
WUX.RES.FILE_NAME = 'File';
WUX.RES.FILE_SIZE = 'Size';
WUX.RES.FILE_TYPE = 'Type';
WUX.RES.FILE_LMOD = 'Last.Mod.';
var GUI;
(function (GUI) {
    var WIcon = WUX.WIcon;
    var TXT = (function () {
        function TXT() {
        }
        TXT.OK = 'OK';
        TXT.CLOSE = 'Close';
        TXT.NEW = 'New';
        TXT.OPEN = 'Modify';
        TXT.DELETE = 'Delete';
        TXT.SAVE = 'Save';
        TXT.SEND = 'Send';
        TXT.SEND_EMAIL = 'Email';
        TXT.FIND = 'Find';
        TXT.FORCE = 'Force';
        TXT.SEARCH = 'Search';
        TXT.CANCEL = 'Cancel';
        TXT.RESET = 'Reset';
        TXT.PRINT = 'Print';
        TXT.PRINT_ALL = 'Print All';
        TXT.PREVIEW = 'Preview';
        TXT.EXPORT = 'Export';
        TXT.IMPORT = 'Import';
        TXT.HELP = 'Help';
        TXT.VIEW = 'View';
        TXT.ENABLE = 'Enable';
        TXT.DISABLE = 'Disable';
        TXT.ADD = 'Add';
        TXT.APPLY = 'Apply';
        TXT.REMOVE = 'Remove';
        TXT.REMOVE_ALL = 'Rem.All';
        TXT.REFRESH = 'Refresh';
        TXT.UNDO = 'Undo';
        TXT.SETTINGS = 'Settings';
        TXT.COPY = 'Copy';
        TXT.CUT = 'Cut';
        TXT.PASTE = 'Paste';
        TXT.CONFIRM = 'Confirm';
        TXT.FORWARD = 'Forward';
        TXT.BACKWARD = 'Backward';
        TXT.NEXT = 'Next';
        TXT.PREVIOUS = 'Previous';
        TXT.SELECT = 'Select';
        TXT.SELECT_ALL = 'Sel.All';
        TXT.WORK = 'Work';
        TXT.AGGREGATE = 'Aggregate';
        TXT.SET = 'Set';
        TXT.DEFAULT = 'Default';
        TXT.REWORK = 'Rework';
        TXT.PUSH = 'Push';
        TXT.SUSPEND = 'Suspend';
        TXT.RESUME = 'Resume';
        TXT.CODE = 'Code';
        TXT.DESCRIPTION = 'Description';
        TXT.GROUP = 'Group';
        TXT.ROLE = 'Role';
        TXT.TYPE = 'Type';
        TXT.HELLO = 'Hello';
        return TXT;
    }());
    GUI.TXT = TXT;
    var MSG = (function () {
        function MSG() {
        }
        MSG.CONF_DELETE = 'Do you want to delete the selected item?';
        MSG.CONF_DISABLE = 'Do you want to disable the selected item?';
        MSG.CONF_ENABLE = 'Do you want to enable the selected item?';
        MSG.CONF_CANCEL = 'Do you want to undo the changes?';
        MSG.CONF_PROCEED = 'Do you want to proceed with the operation?';
        MSG.CONF_OVERWRITE = 'Do you want to proceed with the overwrite?';
        MSG.MSG_COMPLETED = 'Operation completed successfully.';
        MSG.MSG_ERRORS = 'Error during processing.';
        return MSG;
    }());
    GUI.MSG = MSG;
    var ICO = (function () {
        function ICO() {
        }
        ICO.TRUE = WIcon.CHECK_SQUARE_O;
        ICO.FALSE = WIcon.SQUARE_O;
        ICO.CLOSE = WIcon.TIMES;
        ICO.OK = WIcon.CHECK;
        ICO.CALENDAR = WIcon.CALENDAR;
        ICO.AGGREGATE = WIcon.CHAIN;
        ICO.NEW = WIcon.PLUS_SQUARE_O;
        ICO.EDIT = WIcon.EDIT;
        ICO.OPEN = WIcon.EDIT;
        ICO.DELETE = WIcon.TRASH;
        ICO.DETAIL = WIcon.FILE_TEXT_O;
        ICO.SAVE = WIcon.CHECK;
        ICO.FIND = WIcon.SEARCH;
        ICO.FIND_DIFF = WIcon.SEARCH_MINUS;
        ICO.FIND_PLUS = WIcon.SEARCH_PLUS;
        ICO.FORCE = WIcon.CHECK_CIRCLE;
        ICO.FORCE_ALL = WIcon.CHECK_CIRCLE_O;
        ICO.SEARCH = WIcon.SEARCH;
        ICO.CANCEL = WIcon.UNDO;
        ICO.RESET = WIcon.TIMES_CIRCLE;
        ICO.PRINT = WIcon.PRINT;
        ICO.PREVIEW = WIcon.SEARCH_PLUS;
        ICO.EXPORT = WIcon.SHARE_SQUARE_O;
        ICO.IMPORT = WIcon.SIGN_IN;
        ICO.FILE = WIcon.FILE_O;
        ICO.HELP = WIcon.QUESTION_CIRCLE;
        ICO.VIEW = WIcon.FILE_TEXT_O;
        ICO.ENABLE = WIcon.THUMBS_O_UP;
        ICO.DISABLE = WIcon.THUMBS_O_DOWN;
        ICO.ADD = WIcon.PLUS;
        ICO.APPLY = WIcon.CHECK;
        ICO.REMOVE = WIcon.MINUS;
        ICO.REFRESH = WIcon.REFRESH;
        ICO.UNDO = WIcon.UNDO;
        ICO.SETTINGS = WIcon.COG;
        ICO.OPTIONS = WIcon.CHECK_SQUARE;
        ICO.PASSWORD = WIcon.UNDO;
        ICO.COPY = WIcon.COPY;
        ICO.CUT = WIcon.CUT;
        ICO.PASTE = WIcon.PASTE;
        ICO.FORWARD = WIcon.ANGLE_DOUBLE_RIGHT;
        ICO.BACKWARD = WIcon.ANGLE_DOUBLE_LEFT;
        ICO.NEXT = WIcon.FORWARD;
        ICO.PREVIOUS = WIcon.BACKWARD;
        ICO.CONFIRM = WIcon.CHECK;
        ICO.FILTER = WIcon.FILTER;
        ICO.SEND = WIcon.SEND;
        ICO.SEND_EMAIL = WIcon.ENVELOPE_O;
        ICO.WAIT = WIcon.COG;
        ICO.WORK = WIcon.COG;
        ICO.CONFIG = WIcon.COG;
        ICO.LEFT = WIcon.ARROW_CIRCLE_LEFT;
        ICO.RIGHT = WIcon.ARROW_CIRCLE_RIGHT;
        ICO.SELECT_ALL = WIcon.TH_LIST;
        ICO.REWORK = WIcon.REFRESH;
        ICO.PUSH = WIcon.TRUCK;
        ICO.AHEAD = WIcon.ANGLE_DOUBLE_RIGHT;
        ICO.SUSPEND = WIcon.TOGGLE_OFF;
        ICO.RESUME = WIcon.RECYCLE;
        ICO.PAIRING = WIcon.RANDOM;
        ICO.CHECK = WIcon.CHECK_SQUARE_O;
        ICO.EVENT = WIcon.BOLT;
        ICO.MESSAGE = WIcon.ENVELOPE_O;
        ICO.USER = WIcon.USER_O;
        ICO.GROUP = WIcon.USERS;
        ICO.TOOL = WIcon.WRENCH;
        ICO.DEMOGRAPHIC = WIcon.ADDRESS_CARD;
        ICO.DOCUMENT = WIcon.FILE_TEXT_O;
        ICO.LINKS = WIcon.CHAIN;
        ICO.WARNING = WIcon.WARNING;
        ICO.INFO = WIcon.INFO_CIRCLE;
        ICO.CRITICAL = WIcon.TIMES_CIRCLE;
        return ICO;
    }());
    GUI.ICO = ICO;
})(GUI || (GUI = {}));
//# sourceMappingURL=res-en.js.map