# Tours and Travel 

Welcome to the Tours and Travel Website! This platform allows tour guide organizers to post their tours, and provides users with tools to compare different tours and get insightful analytics.

## Features

- **Tour Posting**: Tour guide organizers can create and manage their tour listings with detailed information and images.
- **Tour Comparison**: Users can compare various tours based on different criteria such as price, duration, and destination.
- **Analytics**: The system provides users with analytics and insights to help them make informed decisions about their travel plans.
- **Responsive Design**: Optimized for both desktop and mobile devices for a seamless user experience.

## Tech Stack

- **Frontend**: React, Tailwind
- **Backend**: Node js
- **Database**: MongoDB
- **Containerization**: Docker
- **Orchestration**: Kubernetes

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Docker
- Kubernetes
- Python 3.x
- MySQL

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/tours-and-travel-website.git
    cd tours-and-travel-website
    ```

2. Set up the virtual environment:
    ```sh
    python3 -m venv venv
    source venv/bin/activate
    ```

3. Install dependencies:
    ```sh
    pip install -r requirements.txt
    ```

4. Set up the database:
    ```sh
    python manage.py migrate
    ```

5. Run the development server:
    ```sh
    python manage.py runserver
    ```

### Docker Deployment

This project uses Docker for containerization and is deployed on Kubernetes clusters for scalability and high availability.

1. Build the Docker image:
    ```sh
    docker build -t tours-and-travel-website .
    ```

2. Run the Docker container:
    ```sh
    docker run -d -p 8000:8000 tours-and-travel-website
    ```

### Kubernetes Deployment

Ensure you have Kubernetes and `kubectl` installed and configured.

1. Create a namespace for the project:
    ```sh
    kubectl create namespace tours-travel
    ```

2. Deploy the application to the Kubernetes cluster:
    ```sh
    kubectl apply -f k8s/deployment.yaml -n tours-travel
    kubectl apply -f k8s/service.yaml -n tours-travel
    ```

3. Monitor the deployment:
    ```sh
    kubectl get pods -n tours-travel
    ```

## DevOps Skills Highlight

- **Containerization with Docker**: The application is containerized using Docker, ensuring consistency across different environments and simplifying the deployment process.
- **Orchestration with Kubernetes**: Deployed on Kubernetes clusters to achieve high availability, scalability, and efficient management of containerized applications.
- **CI/CD Pipelines**: Implemented continuous integration and continuous deployment pipelines to automate the testing and deployment process, ensuring rapid delivery of features and bug fixes.
- **Monitoring and Logging**: Integrated monitoring and logging tools to track the health and performance of the application, ensuring quick identification and resolution of issues.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
