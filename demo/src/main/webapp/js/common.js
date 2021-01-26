var GUI;
(function (GUI) {
    function getUserLogged() {
        var userLogged = window ? window['_userLogged'] : undefined;
        if (userLogged && typeof userLogged == 'object')
            return userLogged;
        return { id: 1, userName: 'user', currLogin: new Date(), role: 'user', email: 'user@mail.com', tokenId: 'devtkn' };
    }
    GUI.getUserLogged = getUserLogged;
    function getConfig() {
        var config = window ? window['_config'] : undefined;
        if (config && typeof config == 'object')
            return config;
        return {};
    }
    GUI.getConfig = getConfig;
    function getPage() {
        var page = window ? window['_page'] : undefined;
        if (page && typeof page == 'object')
            return page;
        return {};
    }
    GUI.getPage = getPage;
    function getLocale() {
        var u = getUserLogged();
        if (u != null && u.locale)
            return u.locale;
        return WUX.WUtil.getString(getConfig(), 'locale', '');
    }
    GUI.getLocale = getLocale;
    var AppTableActions = (function (_super) {
        __extends(AppTableActions, _super);
        function AppTableActions(id) {
            var _this = _super.call(this, id, 'AppTableActions', null, 'table-actions-wrapper') || this;
            _this.left = new WUX.WContainer(_this.subId('l'), 'left-actions');
            _this.right = new WUX.WContainer(_this.subId('r'), 'right-actions');
            return _this;
        }
        AppTableActions.prototype.componentDidMount = function () {
            var $i = $('<div class="table-actions clearfix" data-b2x-sticky-element="1" data-b2x-sticky-element-z-index="3"></div>');
            this.root.append($i);
            this.left.mount($i);
            this.right.mount($i);
        };
        return AppTableActions;
    }(WUX.WComponent));
    GUI.AppTableActions = AppTableActions;
    var SYM_E = (function () {
        function SYM_E() {
        }
        SYM_E.ID = '_id';
        SYM_E.CODE = 'code';
        SYM_E.DESC = 'desc';
        SYM_E.TYPE = 'type';
        SYM_E.FARE = 'fare';
        SYM_E.TYPE_DESC = 'typeDesc';
        SYM_E.AGRE = 'agre';
        return SYM_E;
    }());
    GUI.SYM_E = SYM_E;
})(GUI || (GUI = {}));
WUX.global.locale = GUI.getLocale();
var jrpc = new JRPC("/dossier/rpc");
jrpc.setToken(GUI.getUserLogged().tokenId);
var GUI;
(function (GUI) {
    var SelMonth = (function (_super) {
        __extends(SelMonth, _super);
        function SelMonth(id, mesi, pros) {
            if (mesi === void 0) { mesi = 12; }
            if (pros === void 0) { pros = 0; }
            var _this = _super.call(this, id) || this;
            _this.multiple = false;
            _this.name = 'SelMonth';
            _this.options = [];
            var currDate = new Date();
            var currMonth = currDate.getMonth() + 1;
            var currYear = currDate.getFullYear();
            if (pros > 0) {
                currMonth += pros;
                if (currMonth > 12) {
                    currMonth -= 12;
                    if (currMonth > 12)
                        currMonth = 1;
                    currYear++;
                }
            }
            for (var i = 0; i < mesi; i++) {
                var m = currYear * 100 + currMonth;
                _this.options.push({ id: m, text: GUI.formatMonth(currMonth, true, currYear) });
                currMonth--;
                if (currMonth == 0) {
                    currMonth = 12;
                    currYear--;
                }
            }
            return _this;
        }
        return SelMonth;
    }(WUX.WSelect2));
    GUI.SelMonth = SelMonth;
    var SelSerType = (function (_super) {
        __extends(SelSerType, _super);
        function SelSerType(id, multiple) {
            var _this = _super.call(this, id) || this;
            _this.multiple = multiple;
            _this.name = 'SelSerType';
            _this.options = [
                { id: '', text: '' },
                { id: 'CAR', text: 'Cardiologie' },
                { id: 'OPH', text: 'Ophtalmologie' },
                { id: 'ORT', text: 'Orthopédie' },
                { id: 'DER', text: 'Dermatologie' },
                { id: 'DEN', text: 'Dentisterie' },
                { id: 'OTO', text: 'Otolaryngologie' },
                { id: 'PHI', text: 'Physiatrie' },
                { id: 'DIA', text: 'Diabétologie' }
            ];
            return _this;
        }
        return SelSerType;
    }(WUX.WSelect2));
    GUI.SelSerType = SelSerType;
    var SelPatType = (function (_super) {
        __extends(SelPatType, _super);
        function SelPatType(id, multiple) {
            var _this = _super.call(this, id) || this;
            _this.multiple = multiple;
            _this.name = 'SelPatType';
            _this.options = [
                { id: '', text: '' },
                { id: 'CAR', text: 'Cardiologie' },
                { id: 'OPH', text: 'Ophtalmologie' },
                { id: 'ORT', text: 'Orthopédie' },
                { id: 'DER', text: 'Dermatologie' },
                { id: 'DEN', text: 'Dentisterie' },
                { id: 'OTO', text: 'Otolaryngologie' },
                { id: 'PHI', text: 'Physiatrie' },
                { id: 'DIA', text: 'Diabétologie' }
            ];
            return _this;
        }
        return SelPatType;
    }(WUX.WSelect2));
    GUI.SelPatType = SelPatType;
    var SelServices = (function (_super) {
        __extends(SelServices, _super);
        function SelServices(id, multiple) {
            var _this = _super.call(this, id, [], multiple) || this;
            _this.name = 'SelServices';
            return _this;
        }
        SelServices.prototype.componentDidMount = function () {
            var _this = this;
            jrpc.execute('SERVICES.find', [{}], function (result) {
                var data = [];
                for (var i = 0; i < result.length; i++) {
                    var r = result[i];
                    var d = {
                        id: r['_id'],
                        text: r['desc']
                    };
                    data.push(d);
                }
                var options = {
                    data: data,
                    placeholder: "",
                    allowClear: true,
                };
                _this.init(options);
            });
        };
        return SelServices;
    }(WUX.WSelect2));
    GUI.SelServices = SelServices;
    var SelStructures = (function (_super) {
        __extends(SelStructures, _super);
        function SelStructures(id, multiple) {
            var _this = _super.call(this, id, [], multiple) || this;
            _this.name = 'SelStructures';
            return _this;
        }
        SelStructures.prototype.componentDidMount = function () {
            var _this = this;
            jrpc.execute('STRUCTURES.find', [{}], function (result) {
                var data = [];
                for (var i = 0; i < result.length; i++) {
                    var r = result[i];
                    var d = {
                        id: r['_id'],
                        text: r['desc']
                    };
                    data.push(d);
                }
                var options = {
                    data: data,
                    placeholder: "",
                    allowClear: true,
                };
                _this.init(options);
            });
        };
        return SelStructures;
    }(WUX.WSelect2));
    GUI.SelStructures = SelStructures;
    var SelPathologies = (function (_super) {
        __extends(SelPathologies, _super);
        function SelPathologies(id, multiple) {
            var _this = _super.call(this, id, [], multiple) || this;
            _this.name = 'SelPathologies';
            return _this;
        }
        SelPathologies.prototype.componentDidMount = function () {
            var _this = this;
            jrpc.execute('PATHOLOGIES.find', [{}], function (result) {
                var data = [];
                for (var i = 0; i < result.length; i++) {
                    var r = result[i];
                    var d = {
                        id: r['_id'],
                        text: r['desc']
                    };
                    data.push(d);
                }
                var options = {
                    data: data,
                    placeholder: "",
                    allowClear: true,
                };
                _this.init(options);
            });
        };
        return SelPathologies;
    }(WUX.WSelect2));
    GUI.SelPathologies = SelPathologies;
})(GUI || (GUI = {}));
//# sourceMappingURL=common.js.map