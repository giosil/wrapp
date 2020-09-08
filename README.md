# Wrapp

There are aspects of a web application that are transversal with respect to the GUI implemented in the individual pages as:

* Theme (css, scripts, header, footer, etc.);
* User access (login, logout, etc.);
* Configuration (locale, parameters, etc.);
* Log management;
* Menu management;
* Auditing and monitoring (accesses, visited pages, etc.).

**Wrapp** is a web application that allows you to easily implement all the aspects listed above in a structured way.

With **Wrapp** you can **WR**ap your web **APP**lication and deploy your services separately in independent modules (for example war, but also modules written in other languages).

**Wrapp** is configurable via the "wrapp_config.json" file in {user.home}/cfg or in resources folder.

In that you can configure:

* "locale": language-country-variant;
* "app": implementation of *org.dew.wrapp.mgr.IAppManager*;
* "login": implementation of *org.dew.wrapp.mgr.ILoginManager*;
* "log": implementation of *org.dew.wrapp.mgr.ILogger*;
* "menu": implementation of *org.dew.wrapp.mgr.AMenuManager*.

In **Wrapp** each page is mapped by the *Page* object and can be called up from the URL page/{id}.

*Page* object has the following fields:

```json
{
	"id": "hello",         // -> page/hello 
	"title": "Hello page",
	"description": "This is an example of Wrapp page",
	"layout": "default",   // -> src/main/webapp/layouts/default.jsp
	"modifier": "public",  // private: check user logger
	"header": "",
	"content": "",
	"footer": "",
	"script": "WuxDOM.render(new HelloWorld(), 'view-root');",
	"css": [
		"/hello/css/main.css"
	],
	"scripts": [
		"/hello/js/wux.min.js",
		"/hello/js/hello.js"
	],
	"attributes": {
		"align": "center"
	}
}
```

## Contributors

* [Giorgio Silvestris](https://github.com/giosil)
