# Carbi - Cryptocurrency Arbitrage Dashboard

Carbi is a clean, purpose-built dashboard providing at-a-glance market conditions for cryptocurrency arbitrage available at [carbi.coolbeans.lol](https://carbi.coolbeans.lol). It is currently rustic themed because the author recently finished watching all of Anne with an E.

## Implementation

This is an implementation in React. Previous renditions were in [Ember.js](https://github.com/chroaster/carbi-ember) and [Svelte](https://github.com/chroaster/carbi-svelte).

## Running the Application

### Local Development

#### Option 1: Using Docker (Recommended)

The easiest way to run the app locally is using Docker Compose with the development service:

```bash
docker compose up dev
```

This will:
- Build the development Docker image
- Start the React development server with hot reload
- Mount your local code for live updates
- Expose the app on `http://localhost:3000`

To run in detached mode:
```bash
docker compose up -d dev
```

To stop the development server:
```bash
docker compose down
```

#### Option 2: Without Docker

If you prefer to run without Docker:

1. **Install Node.js 24** (check `.nvmrc` if available, or use Node.js 24)

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000` with hot reload enabled.

### Production

#### Using Docker

To run the production build:

```bash
docker compose up app
```

This will:
- Build the React app for production
- Serve it using nginx
- Expose the app on `http://localhost:3000`

To run in detached mode:
```bash
docker compose up -d app
```

To rebuild after code changes:
```bash
docker compose up --build app
```

#### Building and Running Manually

1. **Build the production bundle:**
   ```bash
   npm run build
   ```

2. **Serve the build directory** using any static file server:
   - Using `serve` (install with `npm install -g serve`):
     ```bash
     serve -s build
     ```
   - Using Python:
     ```bash
     cd build && python -m http.server 8000
     ```
   - Using Node.js `http-server`:
     ```bash
     npx http-server build -p 8000
     ```

### Docker Commands Reference

- **View running containers:**
  ```bash
  docker compose ps
  ```

- **View logs:**
  ```bash
  docker compose logs -f [service-name]
  ```

- **Stop all services:**
  ```bash
  docker compose down
  ```

- **Rebuild images:**
  ```bash
  docker compose build
  ```

## Improvements

Planned improvements:
  - Auto refresh data
  - Delete rows
  - Save watchlist
  - Stricter conditional rendering on initial load
  - Handle 3rd-party API errors and outages
  - Use arrows and carets to indicate favorable/unfavorable
  - Capture cursor focus after Add button click
