# Hello World Frontend

This is a simple "Hello World" frontend application written in Python using Flask. It retrieves a message from a Golang API and displays it in a web browser using Bootstrap.

## Getting Started

### Prerequisites

- Python 3.9 or later
- Docker (optional, for containerization)

### Running Locally

1. Clone the repository:

    ```sh
    git clone https://github.com/ntsedemoorg/hello-world-front.git
    cd hello-world-frontend
    ```

2. Create and activate a virtual environment:

    ```sh
    python3 -m venv venv
    source venv/bin/activate
    ```

3. Install the required packages:

    ```sh
    pip install -r requirements.txt
    ```

4. Run the application:

    ```sh
    python app.py
    ```

5. The frontend will be available at `http://localhost:5000`.

### Docker

1. Build the Docker image:

    ```sh
    docker build -t hello-world-frontend:latest .
    ```

2. Run the Docker container:

    ```sh
    docker run -p 5000:5000 hello-world-frontend:latest
    ```

3. The frontend will be available at `http://localhost:5000`.

### GitHub Actions

This repository includes a GitHub Actions workflow to build and push the Docker image to Docker Hub. Ensure you have the following GitHub secrets configured:

The workflow will trigger on pushes to the `main` branch.

## Frontend

- Access the frontend at `http://localhost:5000`.
- The frontend retrieves the message from the Golang API at `<API_URL>/api/hello` and displays it.
