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
* "menu": implementation of *org.dew.wrapp.mgr.AMenuManager*.

In **Wrapp** each page is mapped by the *Page* object and can be called up from the URL page/{id}.

*Page* object has the following fields:

```json
{
  "id": "hello",
  "title": "en=Hello page^it=Pagina di saluto^fr=Salutation^es=Página de saludo",
  "description": "en=Example of Wrapp page^it=Esempio di pagina Wrapp^fr=Exemple de page Wrapp^es=Ejemplo de página Wrapp",
  "layout": "default",
  "modifier": "private",
  "header": "",
  "content": "",
  "footer": "",
  "script": "WuxDOM.render(new HelloWorld(), 'view-root');",
  "css": [
    "/hello/css/main.css"
  ],
  "scripts": [
    "/wrapp/wux/js/wux.min.js",
    "/hello/js/res-$language.min.js",
    "/hello/js/hello.min.js"
  ],
  "attributes": {
    "align": "center"
  }
}
```

The *hello* page has URL page/**hello** and the related jsp page is src/main/webapp/layouts/**default**.jsp (from *layout*).

When a module is deployed it should call the GET method *wrapp/api/update?module={moduleName}* of Wrapp REST API.

This call allows to append the correct timestamp to the css and imported scripts provided by that module.

As far as the menus are concerned, it is possible to define several hierarchical menus and make the items visible with respect to user authorizations.

Each menu is identified by an id and is made up of a list of MenuItem object.

Here is a sample menu.

```json
{
  "main": [
    { "id": "app",       "text": "en=Application^it=Applicazione^fr=Application^es=Aplicación", "icon": "fa-edit" },
    { "id": "app.hello", "text": "en=Hello^it=Saluto^fr=Salutation^es=saludo",                  "icon": null,     "link": "page/hello"}
  ]
}
```

You can implement your own org.dew.wrapp.mgr.IAppManager by loading menus and pages for example from a database or from a nosql.

## REST API 

### Reload
Reload Web App configuration, pages and menus.

Request:<br />
**GET** `http://localhost:8080/wrapp/api/reload`

Response:<br />
HTTP 204 No Content<br />

### Refresh
Update reference of a module appending timestamp in css and script imports.

Request:<br />
**GET** `http://localhost:8080/wrapp/api/refresh?module={moduleName}`

Response:<br />
HTTP 204 No Content<br />

### Update
Update password of legged user.

Request:<br />
**POST** `http://localhost:8080/wrapp/api/update`

`op=oldPassowrd&np=newPasswrd`

Response:<br />
HTTP 204 No Content<br />

Response: (if old password is incorrect, new password is invalid or user is not logged)<br />
HTTP 403 Forbidden<br />

## Contributors

* [Giorgio Silvestris](https://github.com/giosil)
