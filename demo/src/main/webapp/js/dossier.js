var GUI;
(function (GUI) {
    var GUIEvents = (function (_super) {
        __extends(GUIEvents, _super);
        function GUIEvents() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GUIEvents.prototype.render = function () {
            return '<p>GUIEvents</p>';
        };
        return GUIEvents;
    }(WUX.WComponent));
    GUI.GUIEvents = GUIEvents;
})(GUI || (GUI = {}));
var GUI;
(function (GUI) {
    var WUtil = WUX.WUtil;
    var GUIPathologies = (function (_super) {
        __extends(GUIPathologies, _super);
        function GUIPathologies(id) {
            var _this = _super.call(this, id ? id : '*', 'GUIPathologies') || this;
            _this.iSTATUS_STARTUP = 0;
            _this.iSTATUS_VIEW = 1;
            _this.iSTATUS_EDITING = 2;
            _this.status = _this.iSTATUS_STARTUP;
            return _this;
        }
        GUIPathologies.prototype.render = function () {
            var _this = this;
            this.btnFind = new WUX.WButton(this.subId('bf'), GUI.TXT.FIND, '', WUX.BTN.SM_PRIMARY);
            this.btnFind.on('click', function (e) {
                if (_this.status == _this.iSTATUS_EDITING) {
                    WUX.showWarning(GUI.I18.M_EDIT);
                    return;
                }
                _this.fpDetail.clear();
                var box = WUX.getComponent('bxf');
                if (box instanceof WUX.WBox) {
                    _this.tagsFilter.setState(_this.fpFilter.getValues(true));
                    box.collapse();
                }
                jrpc.execute('PATHOLOGIES.find', [_this.fpFilter.getState()], function (result) {
                    _this.status = _this.iSTATUS_VIEW;
                    _this.tabResult.setState(result);
                    if (_this.selId) {
                        var idx_1 = WUtil.indexOf(result, GUI.SYM_E.CODE, _this.selId);
                        if (idx_1 >= 0) {
                            setTimeout(function () {
                                _this.tabResult.select([idx_1]);
                            }, 100);
                        }
                        _this.selId = null;
                    }
                    else {
                        if (result && result.length) {
                            WUX.showSuccess(result.length + ' ' + GUI.I18.M_IFND);
                        }
                        else {
                            WUX.showWarning(GUI.I18.M_NFND);
                        }
                    }
                });
            });
            this.btnReset = new WUX.WButton(this.subId('br'), GUI.TXT.RESET, '', WUX.BTN.SM_SECONDARY);
            this.btnReset.on('click', function (e) {
                _this.fpFilter.clear();
                _this.tagsFilter.setState({});
                _this.tabResult.setState([]);
                _this.fpDetail.clear();
                _this.fpFilter.focus();
            });
            this.tagsFilter = new WUX.WTags('tf');
            this.fpFilter = new WUX.WFormPanel(this.subId('fpf'));
            this.fpFilter.addRow();
            this.fpFilter.addTextField(GUI.SYM_E.CODE, GUI.I18.L_CODE);
            this.fpFilter.addTextField(GUI.SYM_E.DESC, GUI.I18.L_DESC);
            this.fpFilter.addComponent(GUI.SYM_E.TYPE, GUI.I18.L_TYPE, new GUI.SelSerType());
            this.fpFilter.setMandatory(GUI.SYM_E.CODE, GUI.SYM_E.DESC, GUI.SYM_E.TYPE);
            this.fpFilter.onEnterPressed(function (e) {
                _this.btnFind.trigger('click');
            });
            this.btnNew = new WUX.WButton(this.subId('bn'), GUI.TXT.NEW, '', WUX.BTN.SM_INFO);
            this.btnNew.on('click', function (e) {
                if (_this.status == _this.iSTATUS_EDITING) {
                    _this.btnNew.blur();
                    return;
                }
                _this.isNew = true;
                _this.status = _this.iSTATUS_EDITING;
                _this.selId = null;
                _this.tabResult.clearSelection();
                _this.fpDetail.enabled = true;
                _this.fpDetail.clear();
                setTimeout(function () { _this.fpDetail.focus(); }, 100);
            });
            this.btnOpen = new WUX.WButton(this.subId('bo'), GUI.TXT.OPEN, GUI.ICO.OPEN, WUX.BTN.ACT_OUTLINE_PRIMARY);
            this.btnOpen.on('click', function (e) {
                if (_this.status == _this.iSTATUS_EDITING || _this.status == _this.iSTATUS_STARTUP) {
                    _this.btnOpen.blur();
                    return;
                }
                var sr = _this.tabResult.getSelectedRows();
                if (!sr || !sr.length) {
                    WUX.showWarning(GUI.I18.M_SEL);
                    _this.btnOpen.blur();
                    return;
                }
                _this.isNew = false;
                _this.status = _this.iSTATUS_EDITING;
                _this.selId = null;
                _this.fpDetail.enabled = true;
                setTimeout(function () { _this.fpDetail.focus(); }, 100);
            });
            this.btnSave = new WUX.WButton(this.subId('bs'), GUI.TXT.SAVE, GUI.ICO.SAVE, WUX.BTN.ACT_OUTLINE_PRIMARY);
            this.btnSave.on('click', function (e) {
                if (_this.status != _this.iSTATUS_EDITING) {
                    WUX.showWarning(GUI.I18.M_MOD);
                    _this.btnSave.blur();
                    return;
                }
                var check = _this.fpDetail.checkMandatory(true, true, false);
                if (check) {
                    _this.btnSave.blur();
                    WUX.showWarning(GUI.I18.M_MAND + ': ' + check);
                    return;
                }
                var values = _this.fpDetail.getState();
                var id = WUtil.getString(values, GUI.SYM_E.ID);
                var cf = WUtil.getString(values, GUI.SYM_E.CODE);
                jrpc.execute('PATHOLOGIES.exists', [cf, id], function (result) {
                    if (result) {
                        _this.btnSave.blur();
                        WUX.showWarning(GUI.I18.M_ALRP);
                        return;
                    }
                    if (_this.isNew) {
                        jrpc.execute('PATHOLOGIES.insert', [values], function (result) {
                            _this.status = _this.iSTATUS_VIEW;
                            _this.fpDetail.enabled = false;
                            WUX.showSuccess(GUI.I18.M_OK);
                            _this.selId = result[GUI.SYM_E.ID];
                            _this.fpFilter.clear();
                            _this.fpFilter.setValue(GUI.SYM_E.CODE, result[GUI.SYM_E.CODE]);
                            _this.btnFind.trigger('click');
                        });
                    }
                    else {
                        jrpc.execute('PATHOLOGIES.update', [values], function (result) {
                            _this.status = _this.iSTATUS_VIEW;
                            _this.fpDetail.enabled = false;
                            WUX.showSuccess(GUI.I18.M_OK);
                            _this.selId = result[GUI.SYM_E.ID];
                            var selRows = _this.tabResult.getSelectedRows();
                            if (!selRows || !selRows.length) {
                                _this.btnFind.trigger('click');
                            }
                        });
                    }
                });
            });
            this.btnCancel = new WUX.WButton(this.subId('bc'), GUI.TXT.CANCEL, GUI.ICO.CANCEL, WUX.BTN.ACT_OUTLINE_INFO);
            this.btnCancel.on('click', function (e) {
                _this.btnCancel.blur();
                if (_this.status != _this.iSTATUS_EDITING)
                    return;
                WUX.confirm(GUI.MSG.CONF_CANCEL, function (res) {
                    if (!res)
                        return;
                    if (_this.isNew) {
                        _this.fpDetail.clear();
                    }
                    _this.status = _this.iSTATUS_VIEW;
                    _this.fpDetail.enabled = false;
                    _this.selId = null;
                });
            });
            this.fpDetail = new WUX.WFormPanel(this.subId('fpd'));
            this.fpDetail.addRow();
            this.fpDetail.addTextField(GUI.SYM_E.CODE, GUI.I18.L_CODE);
            this.fpDetail.addTextField(GUI.SYM_E.DESC, GUI.I18.L_DESC);
            this.fpDetail.addComponent(GUI.SYM_E.TYPE, GUI.I18.L_TYPE, new GUI.SelSerType());
            this.fpDetail.addInternalField(GUI.SYM_E.ID);
            this.fpDetail.enabled = false;
            this.fpDetail.setMandatory(GUI.SYM_E.CODE, GUI.SYM_E.DESC, GUI.SYM_E.TYPE);
            this.cntActions = new GUI.AppTableActions('ta');
            this.cntActions.left.add(this.btnOpen);
            this.cntActions.left.add(this.btnSave);
            this.cntActions.left.add(this.btnCancel);
            this.cntActions.right.add(this.btnNew);
            var rc = [
                [GUI.I18.L_CODE, GUI.SYM_E.CODE, 's'],
                [GUI.I18.L_DESC, GUI.SYM_E.DESC, 's'],
                [GUI.I18.L_TYPE, GUI.SYM_E.TYPE_DESC, 's']
            ];
            this.tabResult = new WUX.WDXTable(this.subId('tab'), WUtil.col(rc, 0), WUtil.col(rc, 1));
            this.tabResult.filter = true;
            this.tabResult.exportFile = 'services';
            this.tabResult.types = WUtil.col(rc, 2);
            this.tabResult.css({ h: 250, f: 10 });
            this.tabResult.onSelectionChanged(function (e) {
                var item = e.selectedRowsData[0];
                if (!item)
                    return;
                var id = WUtil.getString(item, GUI.SYM_E.ID);
                if (!id)
                    return;
                jrpc.execute('PATHOLOGIES.read', [id], function (result) {
                    _this.fpDetail.clear();
                    _this.fpDetail.setState(result);
                });
            });
            this.container = new WUX.WContainer();
            this.container.attributes = WUX.ATT.STICKY_CONTAINER;
            this.container
                .addBox(GUI.I18.L_FILT + ':', '', '', 'bxf', WUX.ATT.BOX_FILTER)
                .addTool(this.tagsFilter)
                .addCollapse(this.collapseHandler.bind(this))
                .addRow()
                .addCol('col-xs-11 b-r')
                .add(this.fpFilter)
                .addCol('col-xs-1 b-l')
                .addGroup({ classStyle: 'form-group text-right' }, this.btnFind, this.btnReset)
                .end()
                .addBox()
                .addGroup({ classStyle: 'search-actions-and-results-wrapper' }, this.cntActions, this.tabResult)
                .end()
                .addRow()
                .addCol('12').section(GUI.I18.L_DET)
                .add(this.fpDetail);
            return this.container;
        };
        GUIPathologies.prototype.collapseHandler = function (e) {
            var c = WUtil.getBoolean(e.data, 'collapsed');
            if (c) {
                this.tagsFilter.setState({});
            }
            else {
                this.tagsFilter.setState(this.fpFilter.getValues(true));
            }
        };
        return GUIPathologies;
    }(WUX.WComponent));
    GUI.GUIPathologies = GUIPathologies;
})(GUI || (GUI = {}));
var GUI;
(function (GUI) {
    var WUtil = WUX.WUtil;
    var SYM_P = (function () {
        function SYM_P() {
        }
        SYM_P.ID = '_id';
        SYM_P.CODE = 'code';
        SYM_P.FAMILY = 'family';
        SYM_P.NAME = 'name';
        SYM_P.BIRTHDATE = 'birthDate';
        SYM_P.GENDER = 'gender';
        SYM_P.EMAIL = 'email';
        SYM_P.PHONE = 'phone';
        SYM_P.TITLE = 'title';
        return SYM_P;
    }());
    GUI.SYM_P = SYM_P;
    var SYM_H = (function () {
        function SYM_H() {
        }
        SYM_H.ID = '_id';
        SYM_H.DATE = 'date';
        SYM_H.SERV = 'serv';
        SYM_H.STRU = 'stru';
        SYM_H.PATH = 'path';
        SYM_H.FARE = 'fare';
        SYM_H.AGRE = 'agre';
        return SYM_H;
    }());
    GUI.SYM_H = SYM_H;
    var DlgHistory = (function (_super) {
        __extends(DlgHistory, _super);
        function DlgHistory(id) {
            var _this = _super.call(this, id, 'DlgHistory') || this;
            _this.title = GUI.I18.L_EVNS;
            _this.fp = new WUX.WFormPanel(_this.subId('fp'));
            _this.fp.addRow();
            _this.fp.addDateField(SYM_H.DATE, GUI.I18.L_DATE);
            _this.fp.addComponent(SYM_H.SERV, GUI.I18.L_SERV, new GUI.SelServices());
            _this.fp.addCurrencyField(SYM_H.FARE, GUI.I18.L_FARE);
            _this.fp.addRow();
            _this.fp.addComponent(SYM_H.STRU, GUI.I18.L_STRU, new GUI.SelStructures());
            _this.fp.addComponent(SYM_H.PATH, GUI.I18.L_PATH, new GUI.SelPathologies());
            _this.fp.addBlankField();
            _this.fp.setMandatory(SYM_H.DATE, SYM_H.SERV, SYM_H.STRU);
            _this.btnAdd = new WUX.WButton(_this.subId('ba'), GUI.TXT.ADD, '', WUX.BTN.SM_PRIMARY);
            _this.btnAdd.on('click', function (e) {
                var check = _this.fp.checkMandatory(true, true, true);
                if (check) {
                    WUX.showWarning(GUI.I18.M_MAND + ': ' + check);
                    return;
                }
                var v = _this.fp.getState();
                v["patient"] = _this.props;
                jrpc.execute('EVENTS.insert', [v], function (result) {
                    if (!result || !result["_id"]) {
                        WUX.showWarning(GUI.I18.M_KO);
                        return;
                    }
                    var s = _this.table.getState();
                    if (!s)
                        s = [];
                    result['nfl'] = 1;
                    s.unshift(result);
                    _this.table.setState(s);
                });
            });
            _this.btnRes = new WUX.WButton(_this.subId('br'), GUI.TXT.RESET, '', WUX.BTN.SM_DANGER);
            _this.btnRes.on('click', function (e) {
                _this.fp.clear();
                _this.fp.focus();
            });
            var sc = [
                [GUI.I18.L_DATE, SYM_H.DATE, 'd'],
                [GUI.I18.L_SERV, SYM_H.SERV, 's'],
                [GUI.I18.L_STRU, SYM_H.STRU, 's'],
                [GUI.I18.L_AGRE, SYM_H.AGRE, 'b'],
                [GUI.I18.L_PATH, SYM_H.PATH, 's'],
                [GUI.I18.L_FARE, SYM_H.FARE, 'c']
            ];
            _this.table = new WUX.WDXTable(_this.subId('tah'), WUtil.col(sc, 0), WUtil.col(sc, 1));
            _this.table.types = WUtil.col(sc, 2);
            _this.table.css({ h: 400, f: 10 });
            _this.table.exportFile = 'events';
            _this.table.filter = true;
            _this.table.onRowPrepared(function (e) {
                if (!e.data)
                    return;
                var nfl = WUtil.getInt(e.data, 'nfl');
                if (nfl) {
                    WUX.setCss(e.rowElement, WUX.CSS.WARNING);
                }
            });
            _this.table.addActions('_id', {
                id: 'del',
                type: WUX.WInputType.Link,
                classStyle: 'btn btn-link btn-xs',
                style: 'text-danger',
                label: GUI.TXT.DELETE,
                icon: WUX.WIcon.TRASH
            });
            _this.table.onClickAction(function (e) {
                var sub = WUX.firstSub(e.currentTarget);
                var eid = WUX.lastSub(e.currentTarget);
                console.log('[DlgHistory] onClickAction sub=' + sub, 'eid=' + eid);
                if (sub == 'del') {
                    _this.delete(eid);
                }
            });
            _this.body
                .addRow()
                .addCol('col-xs-11 b-r')
                .add(_this.fp)
                .addCol('col-xs-1 b-l')
                .addGroup({ classStyle: 'form-group text-right' }, _this.btnAdd, _this.btnRes)
                .addRow()
                .addCol('12')
                .addDiv(8)
                .add(_this.table);
            return _this;
        }
        DlgHistory.prototype.updateState = function (nextState) {
            _super.prototype.updateState.call(this, nextState);
            if (this.table)
                this.table.setState(nextState);
        };
        DlgHistory.prototype.getState = function () {
            if (this.table)
                return this.table.getState();
            return [];
        };
        DlgHistory.prototype.delete = function (id) {
            var _this = this;
            if (!id)
                return;
            jrpc.execute('EVENTS.delete', [id], function (result) {
                if (result) {
                    var s = _this.table.getState();
                    var i = WUtil.indexOf(s, '_id', id);
                    if (i < 0)
                        return;
                    s.splice(i, 1);
                    _this.table.setState(s);
                }
                else {
                    WUX.showWarning(GUI.I18.M_KO);
                }
            });
        };
        DlgHistory.prototype.onShown = function () {
            this.fp.clear();
            this.fp.focus();
        };
        return DlgHistory;
    }(WUX.WDialog));
    GUI.DlgHistory = DlgHistory;
    var GUIPatients = (function (_super) {
        __extends(GUIPatients, _super);
        function GUIPatients(id) {
            var _this = _super.call(this, id ? id : '*', 'GUIPatients') || this;
            _this.iSTATUS_STARTUP = 0;
            _this.iSTATUS_VIEW = 1;
            _this.iSTATUS_EDITING = 2;
            _this.status = _this.iSTATUS_STARTUP;
            _this.ckFlt = false;
            _this.dlgHist = new DlgHistory(_this.subId('dh'));
            return _this;
        }
        GUIPatients.prototype.render = function () {
            var _this = this;
            this.btnFind = new WUX.WButton(this.subId('bf'), GUI.TXT.FIND, '', WUX.BTN.SM_PRIMARY);
            this.btnFind.on('click', function (e) {
                if (_this.status == _this.iSTATUS_EDITING) {
                    WUX.showWarning(GUI.I18.M_EDIT);
                    return;
                }
                if (_this.ckFlt) {
                    if (_this.fpFilter.isBlank()) {
                        WUX.showWarning(GUI.I18.M_CRIT);
                        return;
                    }
                    var check = _this.fpFilter.checkMandatory(true, true, true);
                    if (check) {
                        WUX.showWarning(GUI.I18.M_MAND + ': ' + check);
                        return;
                    }
                }
                _this.fpDetail.clear();
                var box = WUX.getComponent('bxf');
                if (box instanceof WUX.WBox) {
                    _this.tagsFilter.setState(_this.fpFilter.getValues(true));
                    box.collapse();
                }
                jrpc.execute('PATIENTS.find', [_this.fpFilter.getState()], function (result) {
                    _this.status = _this.iSTATUS_VIEW;
                    _this.tabResult.setState(result);
                    if (_this.selId) {
                        var idx_2 = WUtil.indexOf(result, SYM_P.CODE, _this.selId);
                        if (idx_2 >= 0) {
                            setTimeout(function () {
                                _this.tabResult.select([idx_2]);
                            }, 100);
                        }
                        _this.selId = null;
                    }
                    else {
                        if (result && result.length) {
                            WUX.showSuccess(result.length + ' ' + GUI.I18.M_IFND);
                        }
                        else {
                            WUX.showWarning(GUI.I18.M_NFND);
                        }
                    }
                });
            });
            this.btnReset = new WUX.WButton(this.subId('br'), GUI.TXT.RESET, '', WUX.BTN.SM_SECONDARY);
            this.btnReset.on('click', function (e) {
                _this.fpFilter.clear();
                _this.tagsFilter.setState({});
                _this.tabResult.setState([]);
                _this.fpDetail.clear();
                _this.fpFilter.focus();
            });
            this.tagsFilter = new WUX.WTags('tf');
            this.fpFilter = new WUX.WFormPanel(this.subId('fpf'));
            this.fpFilter.addRow();
            this.fpFilter.addTextField(SYM_P.FAMILY, GUI.I18.L_FAML);
            this.fpFilter.addTextField(SYM_P.NAME, GUI.I18.L_NAME);
            this.fpFilter.setMandatory(SYM_P.FAMILY, SYM_P.CODE);
            this.fpFilter.onEnterPressed(function (e) {
                _this.btnFind.trigger('click');
            });
            this.btnNew = new WUX.WButton(this.subId('bn'), GUI.TXT.NEW, '', WUX.BTN.SM_INFO);
            this.btnNew.on('click', function (e) {
                if (_this.status == _this.iSTATUS_EDITING) {
                    _this.btnNew.blur();
                    return;
                }
                _this.isNew = true;
                _this.status = _this.iSTATUS_EDITING;
                _this.selId = null;
                _this.tabResult.clearSelection();
                _this.fpDetail.enabled = true;
                _this.fpDetail.clear();
                setTimeout(function () { _this.fpDetail.focus(); }, 100);
            });
            this.btnOpen = new WUX.WButton(this.subId('bo'), GUI.TXT.OPEN, GUI.ICO.OPEN, WUX.BTN.ACT_OUTLINE_PRIMARY);
            this.btnOpen.on('click', function (e) {
                if (_this.status == _this.iSTATUS_EDITING || _this.status == _this.iSTATUS_STARTUP) {
                    _this.btnOpen.blur();
                    return;
                }
                var sr = _this.tabResult.getSelectedRows();
                if (!sr || !sr.length) {
                    WUX.showWarning(GUI.I18.M_SEL);
                    _this.btnOpen.blur();
                    return;
                }
                _this.isNew = false;
                _this.status = _this.iSTATUS_EDITING;
                _this.selId = null;
                _this.fpDetail.enabled = true;
                setTimeout(function () { _this.fpDetail.focus(); }, 100);
            });
            this.btnSave = new WUX.WButton(this.subId('bs'), GUI.TXT.SAVE, GUI.ICO.SAVE, WUX.BTN.ACT_OUTLINE_PRIMARY);
            this.btnSave.on('click', function (e) {
                if (_this.status != _this.iSTATUS_EDITING) {
                    WUX.showWarning(GUI.I18.M_MOD);
                    _this.btnSave.blur();
                    return;
                }
                var check = _this.fpDetail.checkMandatory(true, true, false);
                if (check) {
                    _this.btnSave.blur();
                    WUX.showWarning(GUI.I18.M_MAND + ': ' + check);
                    return;
                }
                var values = _this.fpDetail.getState();
                var id = WUtil.getString(values, SYM_P.ID);
                var cf = WUtil.getString(values, SYM_P.CODE);
                jrpc.execute('PATIENTS.exists', [cf, id], function (result) {
                    if (result) {
                        _this.btnSave.blur();
                        WUX.showWarning(GUI.I18.M_ALRP);
                        return;
                    }
                    if (_this.isNew) {
                        jrpc.execute('PATIENTS.insert', [values], function (result) {
                            _this.status = _this.iSTATUS_VIEW;
                            _this.fpDetail.enabled = false;
                            WUX.showSuccess(GUI.I18.M_OK);
                            _this.selId = result[SYM_P.ID];
                            _this.fpFilter.clear();
                            _this.fpFilter.setValue(SYM_P.CODE, result[SYM_P.CODE]);
                            _this.btnFind.trigger('click');
                        });
                    }
                    else {
                        jrpc.execute('PATIENTS.update', [values], function (result) {
                            _this.status = _this.iSTATUS_VIEW;
                            _this.fpDetail.enabled = false;
                            WUX.showSuccess(GUI.I18.M_OK);
                            _this.selId = result[SYM_P.ID];
                            var selRows = _this.tabResult.getSelectedRows();
                            if (!selRows || !selRows.length) {
                                _this.btnFind.trigger('click');
                            }
                        });
                    }
                });
            });
            this.btnCancel = new WUX.WButton(this.subId('bc'), GUI.TXT.CANCEL, GUI.ICO.CANCEL, WUX.BTN.ACT_OUTLINE_INFO);
            this.btnCancel.on('click', function (e) {
                _this.btnCancel.blur();
                if (_this.status != _this.iSTATUS_EDITING)
                    return;
                WUX.confirm(GUI.MSG.CONF_CANCEL, function (res) {
                    if (!res)
                        return;
                    if (_this.isNew) {
                        _this.fpDetail.clear();
                    }
                    _this.status = _this.iSTATUS_VIEW;
                    _this.fpDetail.enabled = false;
                    _this.selId = null;
                });
            });
            this.btnHist = new WUX.WButton(this.subId('bh'), GUI.I18.L_EVNS, GUI.ICO.DETAIL, WUX.BTN.ACT_OUTLINE_INFO);
            this.btnHist.on('click', function (e) {
                _this.showHistory();
            });
            this.fpDetail = new WUX.WFormPanel(this.subId('fpd'));
            this.fpDetail.addRow();
            this.fpDetail.addTextField(SYM_P.FAMILY, GUI.I18.L_FAML);
            this.fpDetail.addTextField(SYM_P.NAME, GUI.I18.L_NAME);
            this.fpDetail.addTextField(SYM_P.CODE, GUI.I18.L_CODE);
            this.fpDetail.addDateField(SYM_P.BIRTHDATE, GUI.I18.L_BIDT);
            this.fpDetail.addRow();
            this.fpDetail.addTextField(SYM_P.TITLE, GUI.I18.L_TIT);
            this.fpDetail.addTextField(SYM_P.EMAIL, GUI.I18.L_MAIL);
            this.fpDetail.addTextField(SYM_P.PHONE, GUI.I18.L_PHON);
            this.fpDetail.addBlankField();
            this.fpDetail.addInternalField(SYM_P.ID);
            this.fpDetail.enabled = false;
            this.fpDetail.setMandatory(SYM_P.FAMILY, SYM_P.NAME);
            this.cntActions = new GUI.AppTableActions('ta');
            this.cntActions.left.add(this.btnOpen);
            this.cntActions.left.add(this.btnSave);
            this.cntActions.left.add(this.btnCancel);
            this.cntActions.left.add(this.btnHist);
            this.cntActions.right.add(this.btnNew);
            var rc = [
                [GUI.I18.L_FAML, SYM_P.FAMILY, 's'],
                [GUI.I18.L_NAME, SYM_P.NAME, 's'],
                [GUI.I18.L_BIDT, SYM_P.BIRTHDATE, 'd'],
                [GUI.I18.L_CODE, SYM_P.CODE, 's'],
                [GUI.I18.L_MAIL, SYM_P.EMAIL, 's'],
                [GUI.I18.L_PHON, SYM_P.PHONE, 's'],
            ];
            this.tabResult = new WUX.WDXTable(this.subId('tab'), WUtil.col(rc, 0), WUtil.col(rc, 1));
            this.tabResult.filter = true;
            this.tabResult.exportFile = 'patients';
            this.tabResult.types = WUtil.col(rc, 2);
            this.tabResult.css({ h: 250, f: 10 });
            this.tabResult.onSelectionChanged(function (e) {
                var item = e.selectedRowsData[0];
                if (!item)
                    return;
                var id = WUtil.getString(item, SYM_P.ID);
                if (!id)
                    return;
                jrpc.execute('PATIENTS.read', [id], function (result) {
                    _this.fpDetail.clear();
                    _this.fpDetail.setState(result);
                });
            });
            this.tabResult.onDoubleClick(function (e) {
                _this.showHistory();
            });
            this.container = new WUX.WContainer();
            this.container.attributes = WUX.ATT.STICKY_CONTAINER;
            this.container
                .addBox(GUI.I18.L_FILT + ':', '', '', 'bxf', WUX.ATT.BOX_FILTER)
                .addTool(this.tagsFilter)
                .addCollapse(this.collapseHandler.bind(this))
                .addRow()
                .addCol('col-xs-11 b-r')
                .add(this.fpFilter)
                .addCol('col-xs-1 b-l')
                .addGroup({ classStyle: 'form-group text-right' }, this.btnFind, this.btnReset)
                .end()
                .addBox()
                .addGroup({ classStyle: 'search-actions-and-results-wrapper' }, this.cntActions, this.tabResult)
                .end()
                .addRow()
                .addCol('12').section(GUI.I18.L_DET)
                .add(this.fpDetail);
            return this.container;
        };
        GUIPatients.prototype.collapseHandler = function (e) {
            var c = WUtil.getBoolean(e.data, 'collapsed');
            if (c) {
                this.tagsFilter.setState({});
            }
            else {
                this.tagsFilter.setState(this.fpFilter.getValues(true));
            }
        };
        GUIPatients.prototype.showHistory = function () {
            var _this = this;
            var srd = this.tabResult.getSelectedRowsData();
            if (!srd || !srd.length)
                return;
            var pid = WUtil.getString(srd[0], "_id");
            if (!pid)
                return;
            jrpc.execute('EVENTS.find', [{ "patient": pid }], function (result) {
                _this.dlgHist.setProps(pid);
                _this.dlgHist.setState(result);
                _this.dlgHist.show(_this);
            });
        };
        return GUIPatients;
    }(WUX.WComponent));
    GUI.GUIPatients = GUIPatients;
})(GUI || (GUI = {}));
var GUI;
(function (GUI) {
    var WUtil = WUX.WUtil;
    var GUIServices = (function (_super) {
        __extends(GUIServices, _super);
        function GUIServices(id) {
            var _this = _super.call(this, id ? id : '*', 'GUIServices') || this;
            _this.iSTATUS_STARTUP = 0;
            _this.iSTATUS_VIEW = 1;
            _this.iSTATUS_EDITING = 2;
            _this.status = _this.iSTATUS_STARTUP;
            return _this;
        }
        GUIServices.prototype.render = function () {
            var _this = this;
            this.btnFind = new WUX.WButton(this.subId('bf'), GUI.TXT.FIND, '', WUX.BTN.SM_PRIMARY);
            this.btnFind.on('click', function (e) {
                if (_this.status == _this.iSTATUS_EDITING) {
                    WUX.showWarning(GUI.I18.M_EDIT);
                    return;
                }
                _this.fpDetail.clear();
                var box = WUX.getComponent('bxf');
                if (box instanceof WUX.WBox) {
                    _this.tagsFilter.setState(_this.fpFilter.getValues(true));
                    box.collapse();
                }
                jrpc.execute('SERVICES.find', [_this.fpFilter.getState()], function (result) {
                    _this.status = _this.iSTATUS_VIEW;
                    _this.tabResult.setState(result);
                    if (_this.selId) {
                        var idx_3 = WUtil.indexOf(result, GUI.SYM_P.CODE, _this.selId);
                        if (idx_3 >= 0) {
                            setTimeout(function () {
                                _this.tabResult.select([idx_3]);
                            }, 100);
                        }
                        _this.selId = null;
                    }
                    else {
                        if (result && result.length) {
                            WUX.showSuccess(result.length + ' ' + GUI.I18.M_IFND);
                        }
                        else {
                            WUX.showWarning(GUI.I18.M_NFND);
                        }
                    }
                });
            });
            this.btnReset = new WUX.WButton(this.subId('br'), GUI.TXT.RESET, '', WUX.BTN.SM_SECONDARY);
            this.btnReset.on('click', function (e) {
                _this.fpFilter.clear();
                _this.tagsFilter.setState({});
                _this.tabResult.setState([]);
                _this.fpDetail.clear();
                _this.fpFilter.focus();
            });
            this.tagsFilter = new WUX.WTags('tf');
            this.fpFilter = new WUX.WFormPanel(this.subId('fpf'));
            this.fpFilter.addRow();
            this.fpFilter.addTextField(GUI.SYM_E.CODE, GUI.I18.L_CODE);
            this.fpFilter.addTextField(GUI.SYM_E.DESC, GUI.I18.L_DESC);
            this.fpFilter.addComponent(GUI.SYM_E.TYPE, GUI.I18.L_TYPE, new GUI.SelSerType());
            this.fpFilter.setMandatory(GUI.SYM_E.CODE, GUI.SYM_E.DESC, GUI.SYM_E.TYPE);
            this.fpFilter.onEnterPressed(function (e) {
                _this.btnFind.trigger('click');
            });
            this.btnNew = new WUX.WButton(this.subId('bn'), GUI.TXT.NEW, '', WUX.BTN.SM_INFO);
            this.btnNew.on('click', function (e) {
                if (_this.status == _this.iSTATUS_EDITING) {
                    _this.btnNew.blur();
                    return;
                }
                _this.isNew = true;
                _this.status = _this.iSTATUS_EDITING;
                _this.selId = null;
                _this.tabResult.clearSelection();
                _this.fpDetail.enabled = true;
                _this.fpDetail.clear();
                setTimeout(function () { _this.fpDetail.focus(); }, 100);
            });
            this.btnOpen = new WUX.WButton(this.subId('bo'), GUI.TXT.OPEN, GUI.ICO.OPEN, WUX.BTN.ACT_OUTLINE_PRIMARY);
            this.btnOpen.on('click', function (e) {
                if (_this.status == _this.iSTATUS_EDITING || _this.status == _this.iSTATUS_STARTUP) {
                    _this.btnOpen.blur();
                    return;
                }
                var sr = _this.tabResult.getSelectedRows();
                if (!sr || !sr.length) {
                    WUX.showWarning(GUI.I18.M_SEL);
                    _this.btnOpen.blur();
                    return;
                }
                _this.isNew = false;
                _this.status = _this.iSTATUS_EDITING;
                _this.selId = null;
                _this.fpDetail.enabled = true;
                setTimeout(function () { _this.fpDetail.focus(); }, 100);
            });
            this.btnSave = new WUX.WButton(this.subId('bs'), GUI.TXT.SAVE, GUI.ICO.SAVE, WUX.BTN.ACT_OUTLINE_PRIMARY);
            this.btnSave.on('click', function (e) {
                if (_this.status != _this.iSTATUS_EDITING) {
                    WUX.showWarning(GUI.I18.M_MOD);
                    _this.btnSave.blur();
                    return;
                }
                var check = _this.fpDetail.checkMandatory(true, true, false);
                if (check) {
                    _this.btnSave.blur();
                    WUX.showWarning(GUI.I18.M_MAND + ': ' + check);
                    return;
                }
                var values = _this.fpDetail.getState();
                var id = WUtil.getString(values, GUI.SYM_P.ID);
                var cf = WUtil.getString(values, GUI.SYM_P.CODE);
                jrpc.execute('SERVICES.exists', [cf, id], function (result) {
                    if (result) {
                        _this.btnSave.blur();
                        WUX.showWarning(GUI.I18.M_ALRP);
                        return;
                    }
                    if (_this.isNew) {
                        jrpc.execute('SERVICES.insert', [values], function (result) {
                            _this.status = _this.iSTATUS_VIEW;
                            _this.fpDetail.enabled = false;
                            WUX.showSuccess(GUI.I18.M_OK);
                            _this.selId = result[GUI.SYM_P.ID];
                            _this.fpFilter.clear();
                            _this.fpFilter.setValue(GUI.SYM_P.CODE, result[GUI.SYM_P.CODE]);
                            _this.btnFind.trigger('click');
                        });
                    }
                    else {
                        jrpc.execute('SERVICES.update', [values], function (result) {
                            _this.status = _this.iSTATUS_VIEW;
                            _this.fpDetail.enabled = false;
                            WUX.showSuccess(GUI.I18.M_OK);
                            _this.selId = result[GUI.SYM_P.ID];
                            var selRows = _this.tabResult.getSelectedRows();
                            if (!selRows || !selRows.length) {
                                _this.btnFind.trigger('click');
                            }
                        });
                    }
                });
            });
            this.btnCancel = new WUX.WButton(this.subId('bc'), GUI.TXT.CANCEL, GUI.ICO.CANCEL, WUX.BTN.ACT_OUTLINE_INFO);
            this.btnCancel.on('click', function (e) {
                _this.btnCancel.blur();
                if (_this.status != _this.iSTATUS_EDITING)
                    return;
                WUX.confirm(GUI.MSG.CONF_CANCEL, function (res) {
                    if (!res)
                        return;
                    if (_this.isNew) {
                        _this.fpDetail.clear();
                    }
                    _this.status = _this.iSTATUS_VIEW;
                    _this.fpDetail.enabled = false;
                    _this.selId = null;
                });
            });
            this.fpDetail = new WUX.WFormPanel(this.subId('fpd'));
            this.fpDetail.addRow();
            this.fpDetail.addTextField(GUI.SYM_E.CODE, GUI.I18.L_CODE);
            this.fpDetail.addTextField(GUI.SYM_E.DESC, GUI.I18.L_DESC);
            this.fpDetail.addComponent(GUI.SYM_E.TYPE, GUI.I18.L_TYPE, new GUI.SelSerType());
            this.fpDetail.addCurrencyField(GUI.SYM_E.FARE, GUI.I18.L_FARE);
            this.fpDetail.addInternalField(GUI.SYM_E.ID);
            this.fpDetail.enabled = false;
            this.fpDetail.setMandatory(GUI.SYM_E.CODE, GUI.SYM_E.DESC, GUI.SYM_E.TYPE);
            this.cntActions = new GUI.AppTableActions('ta');
            this.cntActions.left.add(this.btnOpen);
            this.cntActions.left.add(this.btnSave);
            this.cntActions.left.add(this.btnCancel);
            this.cntActions.right.add(this.btnNew);
            var rc = [
                [GUI.I18.L_CODE, GUI.SYM_E.CODE, 's'],
                [GUI.I18.L_DESC, GUI.SYM_E.DESC, 's'],
                [GUI.I18.L_TYPE, GUI.SYM_E.TYPE_DESC, 's'],
                [GUI.I18.L_FARE, GUI.SYM_E.FARE, 'c'],
            ];
            this.tabResult = new WUX.WDXTable(this.subId('tab'), WUtil.col(rc, 0), WUtil.col(rc, 1));
            this.tabResult.filter = true;
            this.tabResult.exportFile = 'services';
            this.tabResult.types = WUtil.col(rc, 2);
            this.tabResult.css({ h: 250, f: 10 });
            this.tabResult.onSelectionChanged(function (e) {
                var item = e.selectedRowsData[0];
                if (!item)
                    return;
                var id = WUtil.getString(item, GUI.SYM_P.ID);
                if (!id)
                    return;
                jrpc.execute('SERVICES.read', [id], function (result) {
                    _this.fpDetail.clear();
                    _this.fpDetail.setState(result);
                });
            });
            this.container = new WUX.WContainer();
            this.container.attributes = WUX.ATT.STICKY_CONTAINER;
            this.container
                .addBox(GUI.I18.L_FILT + ':', '', '', 'bxf', WUX.ATT.BOX_FILTER)
                .addTool(this.tagsFilter)
                .addCollapse(this.collapseHandler.bind(this))
                .addRow()
                .addCol('col-xs-11 b-r')
                .add(this.fpFilter)
                .addCol('col-xs-1 b-l')
                .addGroup({ classStyle: 'form-group text-right' }, this.btnFind, this.btnReset)
                .end()
                .addBox()
                .addGroup({ classStyle: 'search-actions-and-results-wrapper' }, this.cntActions, this.tabResult)
                .end()
                .addRow()
                .addCol('12').section(GUI.I18.L_DET)
                .add(this.fpDetail);
            return this.container;
        };
        GUIServices.prototype.collapseHandler = function (e) {
            var c = WUtil.getBoolean(e.data, 'collapsed');
            if (c) {
                this.tagsFilter.setState({});
            }
            else {
                this.tagsFilter.setState(this.fpFilter.getValues(true));
            }
        };
        return GUIServices;
    }(WUX.WComponent));
    GUI.GUIServices = GUIServices;
})(GUI || (GUI = {}));
var GUI;
(function (GUI) {
    var WUtil = WUX.WUtil;
    var GUIStatEvents = (function (_super) {
        __extends(GUIStatEvents, _super);
        function GUIStatEvents(id) {
            return _super.call(this, id ? id : '*', 'GUIStatEvents') || this;
        }
        GUIStatEvents.prototype.render = function () {
            var _this = this;
            this.btnFind = new WUX.WButton(this.subId('bf'), GUI.TXT.FIND, '', WUX.BTN.SM_PRIMARY);
            this.btnFind.on('click', function (e) {
                var check = _this.fpFilter.checkMandatory(true, true);
                if (check) {
                    WUX.showWarning(GUI.I18.M_MAND + ': ' + check);
                    return false;
                }
                var box = WUX.getComponent('boxFilter');
                if (box instanceof WUX.WBox) {
                    _this.tagsFilter.setState(_this.fpFilter.getValues(true));
                    box.collapse();
                }
                jrpc.execute('STATISTICS.load', [_this.fpFilter.getState()], function (result) {
                    if (WUtil.isEmpty(result)) {
                        WUX.showWarning(GUI.I18.M_NFND);
                        return;
                    }
                    _this.chrPE.setState(result['pe']);
                    _this.chrPV.setState(result['pv']);
                    _this.chrPP.setState(result['pp']);
                    _this.chrGV.setState(result['gv']);
                    setTimeout(function () {
                        _this.fix();
                    }, 200);
                });
            });
            this.btnReset = new WUX.WButton(this.subId('br'), GUI.TXT.RESET, '', WUX.BTN.SM_SECONDARY);
            this.btnReset.on('click', function (e) {
                _this.chrPE.setState(null);
                _this.chrPV.setState(null);
                _this.chrPP.setState(null);
                _this.chrGV.setState(null);
                _this.fpFilter.clear();
                _this.tagsFilter.setState({});
            });
            this.tagsFilter = new WUX.WTags('tagsFilter');
            this.selMonth = new GUI.SelMonth();
            this.fpFilter = new WUX.WFormPanel(this.subId('fpf'));
            this.fpFilter.addRow();
            this.fpFilter.addComponent('code', GUI.I18.L_MONT, this.selMonth);
            this.fpFilter.addBlankField();
            this.fpFilter.setMandatory('code');
            this.fpFilter.onEnterPressed(function (e) {
                _this.btnFind.trigger('click');
            });
            this.chrPE = new WUX.WChartJS('chrpe', 'bar');
            this.chrPV = new WUX.WChartJS('chrpv', 'bar');
            this.chrPP = new WUX.WChartJS('chrpp', 'pie');
            this.chrGV = new WUX.WChartJS('chrgv', 'line');
            this.container = new WUX.WContainer();
            this.container.attributes = WUX.ATT.STICKY_CONTAINER;
            this.container
                .addBox(GUI.I18.L_FILT + ":", '', '', 'boxFilter', WUX.ATT.BOX_FILTER)
                .addTool(this.tagsFilter)
                .addCollapse(this.collapseHandler.bind(this))
                .addRow()
                .addCol('col-xs-11 b-r')
                .add(this.fpFilter)
                .addCol('col-xs-1 b-l')
                .addGroup({ classStyle: 'form-group text-right' }, this.btnFind, this.btnReset)
                .end()
                .addRow()
                .addCol('6').section(GUI.I18.L_DONE)
                .add(this.chrPE)
                .addCol('6').section(GUI.I18.L_VALU)
                .add(this.chrPV)
                .addRow()
                .addCol('6').section(GUI.I18.L_COMP)
                .add(this.chrPP)
                .addCol('6').section(GUI.I18.L_TREN)
                .add(this.chrGV);
            return this.container;
        };
        GUIStatEvents.prototype.collapseHandler = function (e) {
            var c = WUtil.getBoolean(e.data, 'collapsed');
            if (c) {
                this.tagsFilter.setState({});
            }
            else {
                this.tagsFilter.setState(this.fpFilter.getValues(true));
            }
        };
        GUIStatEvents.prototype.fix = function () {
            var r = this.chrPE.getRoot();
            var v = r.height();
            if (v) {
                this.chrPE.css({ h: v, maxh: v });
                this.chrPV.css({ h: v, maxh: v });
                this.chrPP.css({ h: v, maxh: v });
                this.chrGV.css({ h: v, maxh: v });
            }
        };
        return GUIStatEvents;
    }(WUX.WComponent));
    GUI.GUIStatEvents = GUIStatEvents;
})(GUI || (GUI = {}));
var GUI;
(function (GUI) {
    var WUtil = WUX.WUtil;
    var GUIStructures = (function (_super) {
        __extends(GUIStructures, _super);
        function GUIStructures(id) {
            var _this = _super.call(this, id ? id : '*', 'GUIStructures') || this;
            _this.iSTATUS_STARTUP = 0;
            _this.iSTATUS_VIEW = 1;
            _this.iSTATUS_EDITING = 2;
            _this.status = _this.iSTATUS_STARTUP;
            return _this;
        }
        GUIStructures.prototype.render = function () {
            var _this = this;
            this.btnFind = new WUX.WButton(this.subId('bf'), GUI.TXT.FIND, '', WUX.BTN.SM_PRIMARY);
            this.btnFind.on('click', function (e) {
                if (_this.status == _this.iSTATUS_EDITING) {
                    WUX.showWarning(GUI.I18.M_EDIT);
                    return;
                }
                _this.fpDetail.clear();
                var box = WUX.getComponent('bxf');
                if (box instanceof WUX.WBox) {
                    _this.tagsFilter.setState(_this.fpFilter.getValues(true));
                    box.collapse();
                }
                jrpc.execute('STRUCTURES.find', [_this.fpFilter.getState()], function (result) {
                    _this.status = _this.iSTATUS_VIEW;
                    _this.tabResult.setState(result);
                    if (_this.selId) {
                        var idx_4 = WUtil.indexOf(result, GUI.SYM_P.CODE, _this.selId);
                        if (idx_4 >= 0) {
                            setTimeout(function () {
                                _this.tabResult.select([idx_4]);
                            }, 100);
                        }
                        _this.selId = null;
                    }
                    else {
                        if (result && result.length) {
                            WUX.showSuccess(result.length + ' ' + GUI.I18.M_IFND);
                        }
                        else {
                            WUX.showWarning(GUI.I18.M_NFND);
                        }
                    }
                });
            });
            this.btnReset = new WUX.WButton(this.subId('br'), GUI.TXT.RESET, '', WUX.BTN.SM_SECONDARY);
            this.btnReset.on('click', function (e) {
                _this.fpFilter.clear();
                _this.tagsFilter.setState({});
                _this.tabResult.setState([]);
                _this.fpDetail.clear();
                _this.fpFilter.focus();
            });
            this.tagsFilter = new WUX.WTags('tf');
            this.fpFilter = new WUX.WFormPanel(this.subId('fpf'));
            this.fpFilter.addRow();
            this.fpFilter.addTextField(GUI.SYM_E.CODE, GUI.I18.L_CODE);
            this.fpFilter.addTextField(GUI.SYM_E.DESC, GUI.I18.L_DESC);
            this.fpFilter.addBooleanField(GUI.SYM_E.AGRE, GUI.I18.L_AGRE);
            this.fpFilter.setMandatory(GUI.SYM_E.CODE, GUI.SYM_E.DESC, GUI.SYM_E.TYPE);
            this.fpFilter.onEnterPressed(function (e) {
                _this.btnFind.trigger('click');
            });
            this.btnNew = new WUX.WButton(this.subId('bn'), GUI.TXT.NEW, '', WUX.BTN.SM_INFO);
            this.btnNew.on('click', function (e) {
                if (_this.status == _this.iSTATUS_EDITING) {
                    _this.btnNew.blur();
                    return;
                }
                _this.isNew = true;
                _this.status = _this.iSTATUS_EDITING;
                _this.selId = null;
                _this.tabResult.clearSelection();
                _this.fpDetail.enabled = true;
                _this.fpDetail.clear();
                setTimeout(function () { _this.fpDetail.focus(); }, 100);
            });
            this.btnOpen = new WUX.WButton(this.subId('bo'), GUI.TXT.OPEN, GUI.ICO.OPEN, WUX.BTN.ACT_OUTLINE_PRIMARY);
            this.btnOpen.on('click', function (e) {
                if (_this.status == _this.iSTATUS_EDITING || _this.status == _this.iSTATUS_STARTUP) {
                    _this.btnOpen.blur();
                    return;
                }
                var sr = _this.tabResult.getSelectedRows();
                if (!sr || !sr.length) {
                    WUX.showWarning(GUI.I18.M_SEL);
                    _this.btnOpen.blur();
                    return;
                }
                _this.isNew = false;
                _this.status = _this.iSTATUS_EDITING;
                _this.selId = null;
                _this.fpDetail.enabled = true;
                setTimeout(function () { _this.fpDetail.focus(); }, 100);
            });
            this.btnSave = new WUX.WButton(this.subId('bs'), GUI.TXT.SAVE, GUI.ICO.SAVE, WUX.BTN.ACT_OUTLINE_PRIMARY);
            this.btnSave.on('click', function (e) {
                if (_this.status != _this.iSTATUS_EDITING) {
                    WUX.showWarning(GUI.I18.M_MOD);
                    _this.btnSave.blur();
                    return;
                }
                var check = _this.fpDetail.checkMandatory(true, true, false);
                if (check) {
                    _this.btnSave.blur();
                    WUX.showWarning(GUI.I18.M_MAND + ': ' + check);
                    return;
                }
                var values = _this.fpDetail.getState();
                var id = WUtil.getString(values, GUI.SYM_P.ID);
                var cf = WUtil.getString(values, GUI.SYM_P.CODE);
                jrpc.execute('STRUCTURES.exists', [cf, id], function (result) {
                    if (result) {
                        _this.btnSave.blur();
                        WUX.showWarning(GUI.I18.M_ALRP);
                        return;
                    }
                    if (_this.isNew) {
                        jrpc.execute('STRUCTURES.insert', [values], function (result) {
                            _this.status = _this.iSTATUS_VIEW;
                            _this.fpDetail.enabled = false;
                            WUX.showSuccess(GUI.I18.M_OK);
                            _this.selId = result[GUI.SYM_P.ID];
                            _this.fpFilter.clear();
                            _this.fpFilter.setValue(GUI.SYM_P.CODE, result[GUI.SYM_P.CODE]);
                            _this.btnFind.trigger('click');
                        });
                    }
                    else {
                        jrpc.execute('STRUCTURES.update', [values], function (result) {
                            _this.status = _this.iSTATUS_VIEW;
                            _this.fpDetail.enabled = false;
                            WUX.showSuccess(GUI.I18.M_OK);
                            _this.selId = result[GUI.SYM_P.ID];
                            var selRows = _this.tabResult.getSelectedRows();
                            if (!selRows || !selRows.length) {
                                _this.btnFind.trigger('click');
                            }
                        });
                    }
                });
            });
            this.btnCancel = new WUX.WButton(this.subId('bc'), GUI.TXT.CANCEL, GUI.ICO.CANCEL, WUX.BTN.ACT_OUTLINE_INFO);
            this.btnCancel.on('click', function (e) {
                _this.btnCancel.blur();
                if (_this.status != _this.iSTATUS_EDITING)
                    return;
                WUX.confirm(GUI.MSG.CONF_CANCEL, function (res) {
                    if (!res)
                        return;
                    if (_this.isNew) {
                        _this.fpDetail.clear();
                    }
                    _this.status = _this.iSTATUS_VIEW;
                    _this.fpDetail.enabled = false;
                    _this.selId = null;
                });
            });
            this.fpDetail = new WUX.WFormPanel(this.subId('fpd'));
            this.fpDetail.addRow();
            this.fpDetail.addTextField(GUI.SYM_E.CODE, GUI.I18.L_CODE);
            this.fpDetail.addTextField(GUI.SYM_E.DESC, GUI.I18.L_DESC);
            this.fpDetail.addBooleanField(GUI.SYM_E.AGRE, GUI.I18.L_AGRE);
            this.fpDetail.addInternalField(GUI.SYM_E.ID);
            this.fpDetail.enabled = false;
            this.fpDetail.setMandatory(GUI.SYM_E.CODE, GUI.SYM_E.DESC, GUI.SYM_E.TYPE);
            this.cntActions = new GUI.AppTableActions('ta');
            this.cntActions.left.add(this.btnOpen);
            this.cntActions.left.add(this.btnSave);
            this.cntActions.left.add(this.btnCancel);
            this.cntActions.right.add(this.btnNew);
            var rc = [
                [GUI.I18.L_CODE, GUI.SYM_E.CODE, 's'],
                [GUI.I18.L_DESC, GUI.SYM_E.DESC, 's'],
                [GUI.I18.L_AGRE, GUI.SYM_E.AGRE, 'b'],
            ];
            this.tabResult = new WUX.WDXTable(this.subId('tab'), WUtil.col(rc, 0), WUtil.col(rc, 1));
            this.tabResult.filter = true;
            this.tabResult.exportFile = 'structures';
            this.tabResult.types = WUtil.col(rc, 2);
            this.tabResult.css({ h: 250, f: 10 });
            this.tabResult.onSelectionChanged(function (e) {
                var item = e.selectedRowsData[0];
                if (!item)
                    return;
                var id = WUtil.getString(item, GUI.SYM_P.ID);
                if (!id)
                    return;
                jrpc.execute('STRUCTURES.read', [id], function (result) {
                    _this.fpDetail.clear();
                    _this.fpDetail.setState(result);
                });
            });
            this.container = new WUX.WContainer();
            this.container.attributes = WUX.ATT.STICKY_CONTAINER;
            this.container
                .addBox(GUI.I18.L_FILT + ':', '', '', 'bxf', WUX.ATT.BOX_FILTER)
                .addTool(this.tagsFilter)
                .addCollapse(this.collapseHandler.bind(this))
                .addRow()
                .addCol('col-xs-11 b-r')
                .add(this.fpFilter)
                .addCol('col-xs-1 b-l')
                .addGroup({ classStyle: 'form-group text-right' }, this.btnFind, this.btnReset)
                .end()
                .addBox()
                .addGroup({ classStyle: 'search-actions-and-results-wrapper' }, this.cntActions, this.tabResult)
                .end()
                .addRow()
                .addCol('12').section(GUI.I18.L_DET)
                .add(this.fpDetail);
            return this.container;
        };
        GUIStructures.prototype.collapseHandler = function (e) {
            var c = WUtil.getBoolean(e.data, 'collapsed');
            if (c) {
                this.tagsFilter.setState({});
            }
            else {
                this.tagsFilter.setState(this.fpFilter.getValues(true));
            }
        };
        return GUIStructures;
    }(WUX.WComponent));
    GUI.GUIStructures = GUIStructures;
})(GUI || (GUI = {}));
//# sourceMappingURL=dossier.js.map