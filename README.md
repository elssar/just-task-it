# just-task-it

A simple personal task and todo manager.

-------------------------------------------

## Quick start

To run the application locally copy `env.sample` into `.env` and add values for
blank variables, i.e secrets, and override any defaults you would like to
change and then run `npm start`.

Please ensure that you have `docker` installed and that there are no containers, either running or stopped, that have the same name or use the same ports as the database docker container.

```bash
cp env.sample .env
# add secrets and override defaults
npm install .
npm start

# on another terminal window
# to run tests
npm test
```
-------------------------------------------------

## Documentation

The service is documented using OpenAPI 3.1, and has a companion Postman collection which can also be used as API documentation.
All of the data models are present in the OpenAPI spec. It is recommended that the OpenAPI schema and Postman collection are both imported into Postman and explored in the Postman app.

To import the specs into Postman (this assumes you already have a Postman account and have the app installed)

1. Inside a workspace, [create a new API](https://learning.postman.com/docs/designing-and-developing-your-api/creating-an-api/), Just Task It.
2. In that API, [import](https://learning.postman.com/docs/designing-and-developing-your-api/importing-an-api/) `postman/schemas/just-task-it.openapi.yaml`.
3. Import [a collection](https://learning.postman.com/docs/designing-and-developing-your-api/testing-an-api/#adding-api-tests) into the API from `postman/collections/just-task-it.postman_collection.json`.

Now you can explore the API documentation and schema of the service inside Postman.

If you wish to run API tests from Postman, then you should [import the collection](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/#importing-postman-data) from `postman/collections/api-tests.postman_collection.json` into Postman, along with the environment at `postman/environments/api-tests.postman_environment.json`. Though this is not strictly necessary as these tests can also be run by the [`newman` cli](https://learning.postman.com/docs/collections/using-newman-cli/command-line-integration-with-newman/) as well. The `npm run test-api` command runs these API tests using `newman` under the hood.

### Clarifications, Missing features, improvements, and next steps

#### Testing and CI

Currently there is no CI environment setup for the application. And there are no list tests either. Both these need to be addressed.

There are two kinds of tests in the application

- unit tests: these are tests for the functional / non-side effect causing parts of the application that can be run independentally without needing to start the entire application.
- api tests: these test individual endpoints and their responses against the spec and are defined in a postman collection is run via newman.

#### Validation

A lot of end points have insufficient or non-existent validation. This was done due to time constraints and need to be addressed.

#### Database and data modelling

Postgres is the database used in the project, with Sequelize as the ORM. The database schema is available in `db/schemas/jti-schema.sql`, and the ORM models inside `src/models`.

The ORM is not used to create or update database schemas, and this is a deliberate choice. Having control of and visibility over the database schema is important, and is extremely useful when scaling - both for query performance and for sanely managing schema updates on large tables.

Another deliberate choice is to not use foreign keys to define relation ships between models in the database. These constraints can be managed on the application and reduces the headache of having to deal with FK contraints in future schema migrations.

One improvement for the future would be to wrap database calls within the same API in a transaction to make the operations atomic.

#### Pagination

Right now todos are not paginated and that can lead to issues in the future. Pagination support needs to be added soon.

#### External Integrations

External integrations could not be worked on due to time constraints and are the next thing that will be worked on.

The integrations will sync todos created in the external services and not todos created in JTI. That is, any todo created in a 3rd party service will be synced into JTI and a two way sync for that todo will be maintained. However all todos created inside JTI will not be synced to 3rd party services.

To accomplish this, we will first need APIs to add / update / delete external intergrations, and data models to store them.

##### External Integration data model

|column|type|description|
|------|----|-----------|
| id | BIGSERIAL | This is the auto increment integer primary key of the table |
| user | BIGINT | The id of the user who created the integration |
| integration_name | VARCHAR(16) | The name of the integration or 3rd party |
| webhook_identifier | VARCHAR(32) | A unique path parameter for the incomming webhook for the integration. |
| data | TEXT | JSON data stored as a blob. This would consist of any data we need to connect with the integration, for example url, api key, user id, etc. |

Once a integration is successfully added, a incoming webhook will be enabled to allow the external service to sync updates to JTI.

To keep track of which todos are linked with 3rd party todos, we need to create a table that will store the link between them

|column|type|description|
|------|----|-----------|
| id | BIGSERIAL | This is the auto increment integer primary key of the table |
| integration_id | BIGINT | This stores the id of the integration |
| external_todo_id | varchar(128) | This stores the id or primary key of the todo in the 3rd party service |
| todo_id | BIGSERIAL | Todo id in JTI |

Additionally we need to create a unique constraint on (integration_id, external_to_id, task_id), and have an additional index on task_it.

With this done, we can

1. Sync any updates made in JTI to todos with external integrations
2. Receive notifications of updates to a todo in a 3rd party service via a webhook
2.1 Using the webhook id, we can get the integration id
2.2 From the external_todo_id present in the webhook data, we can get the JTI todo_id
2.3 Fetch the latest state of the todo from the external service
2.4 Update the todo in JTI

