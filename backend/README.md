# Log Application Backend

## Running with Database and Front-end

- Install or launch [PostgreSQL](https://www.postgresql.org/) at port 5432 * using the root * password.
- Execute the <b>log.data.sql </b> located at [sql folder](https://github.com/williamdsw/log-application-backend/tree/master/sql) in PostgreSQL.
- Import and launch this <b> Spring Boot Application </b>
- Import and launch the [Front-end application](https://github.com/williamdsw/log-application-frontend) using NPM with command <b> ng-serve -o </b>.

- * You can use another port or password for PostgreSQL, but remember to reference them at 
[application.properties](https://github.com/williamdsw/log-application-backend/blob/master/src/main/resources/application.properties).

## Built With

* 	[Spring Tools 4](https://maven.apache.org/) - Eclipse-based development environment that is customized for developing Spring applications.
* 	[Maven](https://maven.apache.org/) - Dependency Management.
* 	[JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) - Java™ Platform, Standard Edition Development Kit 
* 	[Spring Boot](https://spring.io/projects/spring-boot) - Framework to ease the bootstrapping and development of new Spring Applications.
* 	[PostgreSQL](https://www.postgresql.org/) - Open-Source Relational Database Management System
* 	[git](https://git-scm.com/) - Free and Open-Source distributed version control system.

## External Tools Used

* [Postman](https://www.getpostman.com/) - API Development Environment (Testing Docmentation)

## To-Do

- [x] RESTful Web Service (CRUD)

## Running the application locally

There are several ways to run a Spring Boot application on your local machine. One way is to execute the `main` method in the `com.logapp.LogApplication` class from your IDE.

- Download the zip or clone the Git repository.
- Unzip the zip file (if you downloaded one)
- Open Command Prompt and Change directory (cd) to folder containing pom.xml
- Open Eclipse / STS 4 / Netbeans
   - File -> Import -> Existing Maven Project -> Navigate to the folder where you unzipped the zip
   - Select the project
- Choose the Spring Boot Application file (search for @SpringBootApplication)
- Right Click on the file and Run as Java Application

Alternatively you can use the [Spring Boot Maven plugin](https://docs.spring.io/spring-boot/docs/current/reference/html/build-tool-plugins-maven-plugin.html) like so:

```shell
mvn spring-boot:run
```

### URLs

|  URL |  Method |
|----------|--------------|
|`http://localhost:8080/api/logs`                                  | POST |
|`http://localhost:8080/api/logs/batch`                            | POST |
|`http://localhost:8080/api/logs`                                  | GET |
|`http://localhost:8080/api/logs/ip`                               | GET |
|`http://localhost:8080/api/logs/data`                             | GET |
|`http://localhost:8080/api/logs/ten-most-requests-by-ip`          | GET |
|`http://localhost:8080/api/logs/ten-most-requests-by-user-agent`  | GET |
|`http://localhost:8080/api/logs/ten-most-requests-by-data`        | GET |
|`http://localhost:8080/api/logs/number-of-requests-ip`            | GET |
|`http://localhost:8080/api/logs/number-of-requests-user-agent`    | GET |
|`http://localhost:8080/api/logs/number-of-requests-data`          | GET |

## Files and Directories

The project (a.k.a. project directory) has a particular directory structure. A representative project is shown below:

```
.
├── src
│   └── main
│       └── java
│           ├── com.logapp
│           ├── com.logapp.config
│           ├── com.logapp.domain
│           ├── com.logapp.domain.dto
│           ├── com.logapp.repositories
│           ├── com.logapp.resources
│           ├── com.logapp.resources.exceptions
│           ├── com.logapp.security
│           ├── com.logapp.security.filters
│           ├── com.logapp.services
│           ├── com.logapp.services.exceptions
├── src
│   └── main
│       └── resources
│           ├── static
│           ├── templates
│           ├── application.properties
├── src
│   └── test
│       └── java
│           ├── com.logapp
│           ├── com.logapp.resources
├── JRE System Library
├── Maven Dependencies
├── files
├── src
├── target
├── HELP.md
├── mvnw
├── mvnw.cmd
├── pom.xml
└── README.md
```
## packages

- `config` — to hold our configuration classes;
- `domain` — to hold our entities;
- `domain.dto` — to hold our DTO (Data Transfer Object) of our entities;
- `repositories` — to communicate with the database;
- `resources` — to listen to the client;
- `resources.exceptions` — to deal the exceptions of endpoints;
- `services` — to hold our business logic;
- `services.exceptions` — to deal the exceptions of services;

- `resources/application.properties` - It contains application-wide properties. Spring reads the properties defined in this file to configure your application. You can define server’s default port, server’s context path, database URLs etc, in this file.

- `test/` - contains unit and integration tests

- `pom.xml` - contains all the project dependencies

## Reporting Issues

This Project uses GitHub's integrated issue tracking system to record bugs and feature requests. If you want to raise an issue, please follow the recommendations below:

* Before you log a bug, please [https://github.com/williamdsw/log-application-backend/search?type=Issues](search the issue tracker)
  to see if someone has already reported the problem.
* If the issue doesn't already exist, [https://github.com/williamdsw/log-application-backend/issues/new] (create a new issue)
* Please provide as much information as possible with the issue report.
* If you need to paste code, or include a stack trace use Markdown +++```+++ escapes before and after your text. 