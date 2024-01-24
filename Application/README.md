


### .env
Create `.env` file from the `.dev.env-example` or `.prod.env-example`. It is needed to start the `docker-compose`. Then docker will copy needed variables from `.dev.env` or `.prod.env` (don't forget to create them!), depending on what you want to run: development or production.

When developing FE locally you will probably need to create `.env` with `REACT_APP_BE_PORT` set to the back end port. 