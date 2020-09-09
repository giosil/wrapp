jQuery.fn.exists=function(){return this.length>0;}
jQuery.fn.clearForm=function(){$(this).find("input, select").val("");}
jQuery.validator.addMethod("date",function(val,ele){
	var bits=val.match(/([0-9]+)/gi),str;
	if(!bits)return this.optional(ele) || false;
	if(bits[0].length==4){
		str=bits[0]+'-'+bits[1]+'-'+bits[2];
	}else{
		str=bits[1]+'/'+bits[0]+'/'+bits[2];
	}
	return this.optional(ele) || !/Invalid|NaN/.test(new Date(str));
},'Inserire una data valida');
jQuery.validator.addMethod("pwd",function(val,ele){
	if(this.optional(ele)) return true;
	if(val.length<8) return false;
	var ll=false,lu=false,nu=false,sy=false;
	for(var i=0; i<val.length; i++){
		var c=val.charCodeAt(i);
		if(c>=97 && c<=122) ll=true; else if(c>=65 && c<=90) lu=true; else if(c>=48 && c<=57) nu=true; else sy=true;
	}
	if (!ll || !lu || !nu)return false;
	return true;
},'Inserire password valida (lung=8, almeno 1 let. min, 1 let. maius., 1 num.)');
jQuery.validator.addMethod("notEqualTo",function(val,ele,par){
	if(this.optional(ele))return true;
	if(par && par.indexOf('#')==0)return val!=$(par).val();
	return val!=par;
},'Valore digitato non ammesso');
jQuery.validator.classRuleSettings.notEqualTo={notEqualTo:true};

$.fn.select2.defaults.set('language','it');
$.fn.modal.Constructor.prototype.enforceFocus=function(){}; // Fix for select2 in modal

toastr.options={
	"closeButton":false,"debug":false,"progressBar":false,"preventDuplicates":false,
	"positionClass":"toast-top-right","onclick":null,
	"hideDuration":"1000","timeOut":"4000","extendedTimeOut":"1000",
	"showEasing":"swing","hideEasing":"linear",
	"showMethod":"fadeIn","hideMethod":"fadeOut"
};
function _showMessage(msg,title,type,dlg){
	if(dlg){
		swal({title:title,type:type,text:msg});
		return;
	}
	if(type===undefined || type===null || type==='' || type==='info'){
		toastr.info(msg, title);
	}
	else
	if(type=='success') toastr.success(msg,title); else
	if(type=='warning') toastr.warning(msg,title); else
	if(type=='error')   toastr.error(msg,title); else toastr.info(msg, title);
}
function _showInfo(msg,title,dlg,f){
	if(!title)title="Informazioni";
	if(dlg){
		swal({title:title,text:msg},f);
	}
	else{
		toastr.info(msg,title);
	}
}
function _showSuccess(msg,title,dlg){
	if(!title)title="Informazioni";
	if(dlg){
		swal({title:title,type:"success",text:msg});
	}
	else{
		toastr.success(msg,title);
	}
}
function _showWarning(msg,title,dlg){
	if(!title)title="Attenzione";
	if(dlg){
		swal({title:title,type:"warning",text:msg});
	}
	else {
		toastr.warning(msg,title);
	}
}
function _showError(msg,title,dlg){
	if(!title)title="Errore";
	if(dlg){
		swal({title:title,type:"error",text:msg});
	}
	else{
		toastr.error(msg,title);
	}
}
function _confirm(msg,f){
	if(typeof f==='function'){
		swal({title:"Conferma",type:"warning",text:msg,confirmButtonText:"Si",cancelButtonText:"No",confirmButtonColor:"#dd6b55",showCancelButton:true,closeOnConfirm:true,closeOnCancel:true},f);
	}
	else{
		return window.confirm(msg);
	}
}
function _getInput(msg,f,d) {
	if(typeof f==='function'){
		swal({title:"Inserisci",type:"input",inputValue:d,text:msg,showCancelButton:true},f);
	}
	else {
		return window.prompt(msg);
	}
}
$(function(){
	$('.password').password().on('show.bs.password',function(e){}).on('hide.bs.password',function(e){});
	$(window).scroll(function(){
		if($(this).scrollTop() > 50) {
			$('#back-to-top').fadeIn();
		}else{
			$('#back-to-top').fadeOut();
		}
	});
	$('#back-to-top').click(function(){
		$('body,html').animate({scrollTop:0},800);
		return false;
	});
	$('#filters').scrollToFixed();
	$('.navbar-default .navbar-static-side').scrollToFixed();
});
function updatePassword(){
	var f=$('#dlg-cp-form');
	f.validate({
		rules:{
			cpop:'required',
			cpnp:{required:true,pwd:true,notEqualTo:"#cpop"},
			cpcp:{equalTo:"#cpnp"}
		}
	});
	if(!f.valid())return;
	var op=$('#cpop').val();
	var np=$('#cpnp').val();
	var x = location.pathname.indexOf('/', 1);
	let b = x <= 0 ? "api/" : location.pathname.substring(0, x) + "/api/"
	$.ajax({
		url: b + "update",
		type: "post",
		data: { 
			"op": op, 
			"np": np
		},
		success: function(res) {
			$("#dlg-cp").modal('hide');
			_showSuccess("Password updated");
			$('#cpop').val('');
			$('#cpnp').val('');
			$('#cpcp').val('');
		},
		error: function(xhr) {
			_showWarning("Invalid password");
			$('#cpop').focus();
		}
	});
};
$(function(){DevExpress.ui.dxOverlay.baseZIndex(3000);});
function fixDataGridHeightInsideModal(e){
if (e.element.hasAncestor('.modal')) {
	var windowHeight = parseInt($(window).height());
	var initialDataGridHeight = parseInt(e.element.height());
	var $modal = e.element.closest('.modal');
	var $modalDialog = $modal.find('.modal-dialog');
	var $modalHeader = $modal.find('.modal-header');
	var $modalBody = $modal.find('.modal-body');
	var $modalFooter = $modal.find('.modal-footer');
	var $tableActions = $modal.find('.table-actions');
	var pixelsToBeRemoved = 0;
	pixelsToBeRemoved += parseInt($modalDialog.css("margin-top"));
	pixelsToBeRemoved += parseInt($modalDialog.css("margin-bottom"));
	pixelsToBeRemoved += parseInt($modalBody.css("padding-top"));
	pixelsToBeRemoved += parseInt($modalBody.css("padding-bottom"));
	if ($modalHeader.exists()) {
		pixelsToBeRemoved += parseInt($modalHeader.outerHeight(true));
	}
	if ($modalFooter.exists()) {
		pixelsToBeRemoved += parseInt($modalFooter.outerHeight(true));
	}
	if ($tableActions.exists()) {
		pixelsToBeRemoved += parseInt($tableActions.outerHeight(true));
		pixelsToBeRemoved -= parseInt($modalBody.css("padding-top"));
	}
	pixelsToBeRemoved += parseInt(5);
	if (windowHeight - pixelsToBeRemoved < initialDataGridHeight){
		e.component.option("height", windowHeight - pixelsToBeRemoved);
	}
}};