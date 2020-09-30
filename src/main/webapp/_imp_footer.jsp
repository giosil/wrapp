<%@ page import="java.util.Locale, org.dew.wrapp.*" %>
<%
	Locale flocale = WebUtil.getLocale(request);
	String flang   = WebUtil.getLanguage(flocale);
%>
<div class="modal inmodal" id="dlg-cp" tabindex="-1" role="dialog" aria-hidden="true">
<div class="modal-dialog">
	<div class="modal-content animated fadeIn">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only"><%= App.getMessage(flocale, "close") %></span></button>
			<h3><%= App.getMessage(flocale, "modpwd") %></h3>
		</div>
		<div class="modal-body">
			<form class="m-t" id="dlg-cp-form" action="">
				<div class="form-group"><input name="cpop" id="cpop" type="password" class="form-control" data-toggle="password" data-placement="after" placeholder="<%= App.getMessage(flocale, "oldpwd") %>"></div>
				<div class="form-group"><input name="cpnp" id="cpnp" type="password" class="form-control" data-toggle="password" data-placement="after" placeholder="<%= App.getMessage(flocale, "newpwd") %>"></div>
				<div class="form-group"><input name="cpcp" id="cpcp" type="password" class="form-control" data-toggle="password" data-placement="after" placeholder="<%= App.getMessage(flocale, "conpwd") %>"></div>
			</form>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-secondary button-sm" data-dismiss="modal"><%= App.getMessage(flocale, "cancel") %></button>
			<button type="button" class="btn btn-info button-sm" onclick="updatePassword()"><%= App.getMessage(flocale, "ok") %></button>
		</div>
	</div>
</div>
</div>

<script src="inspinia/js/jquery-3.5.1.min.js" type="text/javascript"></script>
<script src="inspinia/js/bootstrap.min.js" type="text/javascript"></script>
<script src="inspinia/js/inspinia.js" type="text/javascript"></script>

<script src="inspinia/js/plugins/metisMenu/jquery.metisMenu.js" type="text/javascript"></script>
<script src="inspinia/js/plugins/slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
<script src="inspinia/js/plugins/pace/pace.min.js" type="text/javascript"></script>
<script src="inspinia/js/plugins/wow/wow.min.js"></script>
<script src="inspinia/js/plugins/sweetalert/sweetalert.min.js" type="text/javascript"></script>
<script src="inspinia/js/plugins/toastr/toastr.min.js"></script>

<script src="inspinia/js/plugins/jquery-ui/jquery-ui.min.js" type="text/javascript"></script>
<script src="inspinia/js/plugins/fullcalendar/moment.min.js" type="text/javascript"></script>
<script src="inspinia/js/plugins/datapicker/bootstrap-datepicker.js" type="text/javascript"></script>
<script src="inspinia/js/plugins/validate/jquery.validate.min.js" type="text/javascript"></script>
<script src="inspinia/js/plugins/select2/select2.full.min.js" type="text/javascript"></script>
<script src="inspinia/js/plugins/nestable/jquery.nestable.js" type="text/javascript"></script>

<script src="js/plugins/bootstrap-show-password.min.js" type="text/javascript"></script>
<script src="js/plugins/datapicker/bootstrap-datepicker.<%= flang %>.js" type="text/javascript"></script>
<script src="js/plugins/scrollToFixed/jquery-scrolltofixed-min.js" type="text/javascript"></script>
<script src="js/plugins/select/bootstrap-select.min.js" type="text/javascript"></script>
<script src="js/plugins/select/i18n/defaults-<%= flang %>.min.js" type="text/javascript"></script>
<script src="js/plugins/select/ajax-bootstrap-select.min.js" type="text/javascript"></script>
<script src="js/plugins/select/ajax-bootstrap-select-<%= flang %>.min.js" type="text/javascript"></script>
<script src="js/plugins/select2/i18n/<%= flang %>.js" type="text/javascript"></script>
<script src="js/plugins/validate/messages_<%= flang %>.js" type="text/javascript"></script>
<script src="js/plugins/validate/additional-methods.min.js" type="text/javascript"></script>
<script src="js/plugins/shortcut/shortcut.min.js" type="text/javascript"></script>
<script src="js/plugins/filesaver/FileSaver.min.js" type="text/javascript"></script>
<script src="js/plugins/ba-throttle-debounce/jquery.ba-throttle-debounce.min.js"></script>

<script type="text/javascript" src="cldr/cldr.min.js"></script>
<script type="text/javascript" src="cldr/cldr/event.min.js"></script>
<script type="text/javascript" src="cldr/cldr/supplemental.min.js"></script>
<script type="text/javascript" src="cldr/cldr/unresolved.min.js"></script>

<script type="text/javascript" src="globalize/globalize.min.js"></script>
<script type="text/javascript" src="globalize/globalize/message.min.js"></script>
<script type="text/javascript" src="globalize/globalize/number.min.js"></script>
<script type="text/javascript" src="globalize/globalize/date.min.js"></script>
<script type="text/javascript" src="globalize/globalize/currency.min.js"></script>

<% WebUtil.writeScriptImport(out, "devextreme/js/jszip.min.js"); %>
<% WebUtil.writeScriptImport(out, "devextreme/js/dx.web.js"); %>
<% WebUtil.writeScriptImport(out, "devextreme/dx.messages." + flang + ".min.js"); %>

<% WebUtil.writeScriptImport(out, "js/jrpc.js"); %>
<% WebUtil.writeScriptImport(out, "js/main.js"); %>
