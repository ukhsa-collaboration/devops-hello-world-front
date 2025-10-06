# Hello World Front

This is a Next.js project used to demo the Terraform example project

#### Running the stack with Docker Compose

To bring up both the API and the frontend, clone both repos into a single directory and run `docker compose`.

```
git clone git@github.com:ukhsa-collaboration/devops-hello-world-front.git
git clone git@github.com:ukhsa-collaboration/devops-hello-world-api.git
cd devops-hello-world-front
docker compose up
```

The API is available on http://localhost:8000 and the frontend on http://localhost:3000.

#### Running integration tests

The integration suite expects a live server and the `API_BASE_URL` environment variable pointing at it. For example, with the Docker Compose stack running:

```
FRONT_BASE_URL=http://localhost:3000 npm run test:integration
```

#### Running unit tests

```
npm run test:unit
```