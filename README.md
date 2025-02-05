# Hyder News App

A news aggregation application built with React, integrating The Guardian, News API, and New York Times APIs.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (16.x or higher)
- npm or yarn
- Docker

## Environment Variables

The application requires the following API keys:
```env
REACT_APP_GUARDIAN_API_KEY=your_guardian_api_key
REACT_APP_NEWS_API_KEY=your_news_api_key
REACT_APP_NYT_API_KEY=your_nyt_api_key
```

## Installation

### Local Development

1. Clone the repository:
```bash
git clone [your-repository-url]
cd hyder-news-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

The app will be available at `http://localhost:3000`

### Docker Setup

1. Build the Docker image:
```bash
docker build \
  --build-arg REACT_APP_GUARDIAN_API_KEY=your_guardian_api_key \
  --build-arg REACT_APP_NEWS_API_KEY=your_news_api_key \
  --build-arg REACT_APP_NYT_API_KEY=your_nyt_api_key \
  -t hyder-news-app .
```

2. Run the container:
```bash
docker run -p 80:80 hyder-news-app
```

The app will be available at `http://localhost`

Alternatively, if port 80 is in use:
```bash
docker run -p 8080:80 hyder-news-app
```

The app will then be available at `http://localhost:8080`

### Docker Commands Reference

Stop the container:
```bash
docker ps # get the container ID
docker stop <container-id>
```

View container logs:
```bash
docker logs <container-id>
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## Security Notes

- It's recommended to use environment variables for API keys rather than building them into the Docker image
- Consider using a secrets management system for production deployments
- API keys in Docker build arguments are visible in the image history

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
