# Hello World Front

This project is designed to work alongside the [Hello World API](https://github.com/ukhsa-collaboration/devops-hello-world-api) to demonstrate the [devops-terraform-example-project](https://github.com/ukhsa-collaboration/devops-terraform-example-project)

#### Running the applications with Docker Compose

To bring up both the API and the frontend locally, clone both repos into a the same parent directory and run `docker compose up` from inside the frontend's directory.

```bash
git clone git@github.com:ukhsa-collaboration/devops-hello-world-front.git
git clone git@github.com:ukhsa-collaboration/devops-hello-world-api.git
cd devops-hello-world-front
docker compose up --detach
```

The frontend will be available at https://hello.docker.localhost and the API at https://hello.docker.localhost/api. 

Traefik generates a self-signed certificate, so you will get a certificate warning in your browser.

#### Running integration tests

The integration suite expects a live server and the `API_BASE_URL` environment variable pointing at it. For example, with the Docker Compose stack running:

```
npm install vitest
FRONT_BASE_URL=https://hello.docker.localhost npm run test:integration
```

#### Running unit tests

```
npm install vitest
npm run test:unit
```