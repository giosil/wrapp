# Dossier module

Demo web module that implements a simple health record.

## Dependencies

**multi-rpc 2.0.0**

- `git clone https://github.com/giosil/multi-rpc.git` 
- `mvn clean install` - this will publish `multi-rpc-2.0.0.jar` in Maven local repository

**nosql-tools 1.0.0**

- `git clone https://github.com/giosil/nosql-tools.git` 
- `mvn clean install` - this will publish `nosql-tools-1.0.0.jar` in Maven local repository

## Build and deploy web application with Wrapp

- Create if not exists `$HOME/cfg` directory
- Copy json files from `cfg` to `$HOME/cfg`
- Copy `nosqlmock.json` file from `data` to `$HOME`
- Deploy `wrapp.war` in your application server
- `mvn clean install` - this will produce `dossier.war` in `target` directory
- Deploy `dossier.war` in your application server
- Launch `http://localhost:8080/wrapp` 
- Enter (whatever) credentials on the login page (no check done in dev configuration)

## Contributors

* [Giorgio Silvestris](https://github.com/giosil)
