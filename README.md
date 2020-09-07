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

* "locale" (language-country);
* "app": implementation of *org.dew.wrapp.mgr.IAppManager*;
* "login": implementation of *org.dew.wrapp.mgr.ILoginManager*;
* "log": implementation of *org.dew.wrapp.mgr.ILogger*;
* "menu": implementation of *org.dew.wrapp.mgr.AMenuManager*.

## Contributors

* [Giorgio Silvestris](https://github.com/giosil)
