<%@ page import="java.util.Locale, org.dew.wrapp.*" %>
<%
	User   user    = WebUtil.getUser(request);
	Locale locale  = WebUtil.getLocale(request);
	Object message = request.getAttribute("message");
%>
<!DOCTYPE html>
<html lang="it">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><%= App.getAppName() %></title>
	<%@ include file="_imp_header.jsp" %>
</head>
<body id="page-top" class="landing-page">
	<div class="navbar-wrapper">
		<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
			<div class="container">
				<div class="navbar-header page-scroll">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
						<span class="sr-only">Navigation</span> <span class="icon-bar"></span>
						<span class="icon-bar"></span> <span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="#"><%= App.getAppName() %></a>
				</div>
				<div id="navbar" class="navbar-collapse collapse">
					<ul class="nav navbar-nav navbar-right">
						<li><a class="page-scroll" href="#contact"><%= App.getMessage(locale, "contacts") %></a></li>
<% if (user != null) { %>
							<li><a data-target="#cn-pwd" data-toggle="modal" href="#cn-pwd"><i class="fa fa-user"></i><%=user.getUserName()%></a></li>
							<li><a href="logout.jsp"> <i class="fa fa-sign-out"></i><%= App.getMessage(locale, "logout") %></a></li>
<% } %>
					</ul>
				</div>
			</div>
		</nav>
	</div>
	<div id="inSlider" class="carousel carousel-fade" data-ride="carousel">
		<ol class="carousel-indicators">
			<li data-target="#inSlider" data-slide-to="0" class="active"></li>
			<li data-target="#inSlider" data-slide-to="1"></li>
		</ol>
		<div class="carousel-inner" role="listbox">
			<div class="item active">
				<div class="container">
					<div class="carousel-caption blank">
						<h1>SLIDE 1</h1>
						<p>
							Text of<br> 
							slide 1.<br>
						</p>
					</div>
				</div>
				<div class="header-back one"></div>
			</div>
			<div class="item">
				<div class="container">
					<div class="carousel-caption blank">
						<h1>SLIDE 2</h1>
						<p>
							Text of<br> 
							slide 2.<br>
						</p>
					</div>
				</div>
				<div class="header-back two"></div>
			</div>
		</div>
		<a class="left carousel-control" href="#inSlider" role="button" data-slide="prev"> 
			<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> <span class="sr-only"><%= App.getMessage(locale, "prev") %></span>
		</a> 
		<a class="right carousel-control" href="#inSlider" role="button" data-slide="next"> 
			<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> <span class="sr-only"><%= App.getMessage(locale, "next") %></span>
		</a>
	</div>
	<section id="features" class="container services">
		<div class="row">
			<div class="col-md-9">
				<h2><i class="fa fa-cloud"></i> &nbsp;Title</h2>
				<p>Text text text text text text text.</p>
				<p>Text text text text text text text.</p>
				<p>Text text text text text text text.</p>
				<p>Text text text text text text text.</p>
				<p>Text text text text text text text.</p>
				<p>Text text text text text text text.</p>
				<p>Text text text text text text text.</p>
			</div>
			<div class="col-md-3">
<% if (user == null) { %>
				<h3><i class="fa fa-lock"></i> &nbsp;Reserved area:</h3>
				<form class="m-t" role="form" action="login" method="POST" id="loginForm">
					<div class="form-group">
						<input type="text" class="form-control" placeholder="Username" id="j_username" name="j_username" required autofocus>
					</div>
					<div class="form-group">
						<input type="password" class="form-control" placeholder="Password" name="j_password" id="j_password" required>
					</div>
					<% if(message != null) { %>
						<p style="text-align: center; color: #cc0000; font-weight: bold;"><%= message %></p>
					<% } %>
					<p><a href="#">Forgot password</a></p>
					<button type="submit" class="btn btn-primary block full-width m-b"><i class="fa fa-sign-in"></i> <%= App.getMessage(locale, "login") %></button>
				</form>
<% } else { %>
				<h3><%= App.getMessage(locale, "welcome") %>,</h3>
				<p>now, you can <a href="home.jsp">access</a>.</p>
<% } %>
			</div>
		</div>
	</section>
	<section id="contact" class="gray-section contact">
		<div class="container">
			<div class="row m-b-lg">
				<div class="col-lg-12 text-center">
					<div class="navy-line"></div>
					<h1>Contacts</h1>
				</div>
			</div>
			<div class="row m-b-lg">
				<div class="col-lg-3 col-lg-offset-3">
					<address>
						<strong><span class="navy">dew.org</span></strong><br />
						<strong><abbr title="Phone">Tel:</abbr> +39 00 0000000</strong><br />
					</address>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-8 col-lg-offset-2 text-center m-t-lg m-b-lg">
					<p><strong>&copy; dew.org</strong></p>
				</div>
			</div>
		</div>
	</section>
	
	<%@ include file="_imp_footer.jsp" %>
	
	<script>
		$(document).ready(function(){
			$('body').scrollspy({
				target:'.navbar-fixed-top',
				offset:80
			});
			// Page scrolling feature
			$('a.page-scroll').bind('click',function(event){
				var link = $(this);
				$('html, body').stop().animate({scrollTop: $(link.attr('href')).offset().top - 50}, 500);
				event.preventDefault();
				$("#navbar").collapse('hide');
			});
		});
		var cbpAnimatedHeader=(function(){
			var docElem = document.documentElement, header = document.querySelector('.navbar-default'), didScroll = false, changeHeaderOn = 200;
			function init(){
				window.addEventListener('scroll', function(event){
					if (!didScroll){
						didScroll = true;
						setTimeout(scrollPage, 250);
					}
				}, false);
			}
			function scrollPage(){
				var sy=scrollY();
				if(sy >= changeHeaderOn){
					$(header).addClass('navbar-scroll')
				}else{
					$(header).removeClass('navbar-scroll')
				}
				didScroll=false;
			}
			function scrollY(){
				return window.pageYOffset || docElem.scrollTop;
			}
			init();
		})();
	</script>
</body>
</html>