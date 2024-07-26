# Weather App

## Project Overview
This Node.js application uses TypeScript to interact with a weather API and fetch temperature data based on user-provided date and location parameters. It handles API rate limits, data formatting, and ensures data persistence using SQLite for caching.

## Requirements
- Node.js
- Docker
- SQLite

## Setup and Run
1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd weather-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Build the application:
   ```sh
   npm run build
   ```

4. Run the application:
   ```sh
   npm start
   ```

5. Run tests:
   ```sh
   npm test
   ```

## Docker
To run the application using Docker:
1. Build the Docker image:
   ```sh
   docker build -t weather-app .
   ```

2. Run the Docker container:
   ```sh
   docker run -p 3000:3000 weather-app
   ```

## API Endpoint
- `GET /weather?city=<city>&date=<date>`
  - Parameters:
    - `city`: The city for which to fetch the weather data.
    - `date`: The date for which to fetch the weather data (in ISO 8601 format).
  - Example:
    ```
    http://localhost:3000/weather?city=London&date=2024-07-20
    ```

## Approach
### Caching
- **SQLite:** Used SQLite to cache weather data to avoid hitting the API rate limit. Cached data expires appropriately to ensure freshness.
- **Initialization:** The database and table are created if they do not exist.

### Error Handling
- **API Limits:** Implemented robust error handling for API rate limits, random errors, and data format issues.
- **Retries:** Retries on transient errors to handle temporary issues with the API.

### Testing
- **Jest:** Comprehensive tests for API integration, data conversion, caching mechanism, and error handling using Jest.
- **Coverage:** Ensures that the application works as expected and handles edge cases.

## Assumptions
- The weather API endpoint and documentation are accurate and reliable.
- The cache expiration is handled within the scope of this task, and no external cache expiration policy is applied.

## Environment Variables
- `PORT`: The port on which the application will run (default is 3000).

## Additional Notes
- Ensure SQLite is installed and accessible in your environment.
- Ensure that the `.env` file is properly configured with the required environment variables if any.

## Example Response
```json
{
  "city": "London",
  "date": "2024-07-20",
  "temperatureCelsius": 20,
  "temperatureFahrenheit": 68
}
```

## Directory Structure
```
weather-app/
├── src/
│   ├── index.ts
│   ├── server.ts
│   ├── weatherService.ts
│   ├── cache.ts
│   ├── types.ts
│   ├── utils.ts
├── tests/
│   ├── weatherService.test.ts
│   ├── cache.test.ts
├── .env
├── Dockerfile
├── jest.config.js
├── package.json
├── README.md
├── tsconfig.json
```
