# just-task-it

A simple personal task and todo manager.

-------------------------------------------

# Development

To run the application locally copy `env.sample` into `.env` and add values for
blank variables, i.e secrets, and override any defaults you would like to
change and then run `npm start`.

Please ensure that you have `docker` installed and that there are no containers, either running or stopped, that have the same name or use the same ports as the database docker container.

```bash
cp env.sample .env
# add secrets and override defaults
npm start
```

