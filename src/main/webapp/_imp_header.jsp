<%@ page import="org.dew.wrapp.*" %>

<link href="inspinia/css/bootstrap.min.css" rel="stylesheet">

<link href="inspinia/font-awesome/css/font-awesome.css" rel="stylesheet">

<link href="inspinia/css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css" rel="stylesheet">
<link href="inspinia/css/plugins/jQueryUI/jquery-ui-1.10.4.custom.min.css" rel="stylesheet">
<link href="inspinia/css/plugins/select2/select2.min.css" rel="stylesheet">
<link href="inspinia/css/plugins/datapicker/datepicker3.css" rel="stylesheet">
<link href="inspinia/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
<link href="inspinia/css/plugins/toastr/toastr.min.css" rel="stylesheet">

<link href="css/plugins/select/bootstrap-select.min.css" rel="stylesheet" >
<link href="css/plugins/select/ajax-bootstrap-select.min.css" rel="stylesheet">

<link href="inspinia/css/animate.css" rel="stylesheet">
<link href="inspinia/css/style.css" rel="stylesheet">

<% WebUtil.writeCSSImport(out, "devextreme/css/dx.common.css"); %>
<% WebUtil.writeCSSImport(out, "devextreme/css/dx.light.compact.css"); %>

<% WebUtil.writeCSSImport(out, "css/custom.css"); %>

<% WebUtil.writeUserInfo(request, out); %>