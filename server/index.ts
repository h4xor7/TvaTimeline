import express from "express";
import http from "http"; // Import the http module
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";

const app = express();
const server = http.createServer(app); // Create the server instance here

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add a simple test route first
app.get('/test', (req, res) => {
  console.log('Test route accessed');
  res.json({ message: 'Server is working!' });
});

// Add a simple HTML test route
app.get('/simple', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head><title>Simple Test</title></head>
    <body>
      <h1>Simple HTML Test</h1>
      <p>If you see this, basic Express routing works!</p>
    </body>
    </html>
  `);
});


// Add a catch-all debug route
app.use('*', (req, res, next) => {
  console.log(`Request received: ${req.method} ${req.originalUrl}`);
  next();
});

/* (async () => {
  console.log('Starting server setup...');
  
  const server = await registerRoutes(app);
  console.log('Routes registered...');

  if (process.env.NODE_ENV === "development") {
    console.log('Setting up Vite for development...');
    try {
      await setupVite(app, server);
      console.log('Vite setup complete...');
    } catch (error) {
      console.error('Vite setup failed:', error);
    }
  } else {
    console.log('Setting up static files...');
    serveStatic(app);
  }

  const port = 5000;
  server.listen(port, "0.0.0.0", () => {
    console.log(`✅ Server running on http://localhost:${port}`);
    console.log(`✅ Test endpoint: http://localhost:${port}/test`);
    console.log(`✅ Simple HTML: http://localhost:${port}/simple`);
  });
})().catch(error => {
  console.error('❌ Server startup failed:', error);
}); */



// CORRECTED STARTUP LOGIC
(async () => {
  console.log('Starting server setup...');

  if (process.env.NODE_ENV === "development") {
    console.log('Setting up Vite for development...');
    // 1. SETUP VITE FIRST
    // This adds the Vite middleware to handle frontend requests.
    try {
      await setupVite(app, server);
      console.log('Vite setup complete...');
    } catch (error) {
      console.error('Vite setup failed:', error);
      process.exit(1); // Exit if Vite fails
    }
  } else {
    console.log('Setting up static files for production...');
    serveStatic(app);
  }

  // 2. REGISTER API ROUTES SECOND
  // Requests that are not handled by Vite (like /api/...) will fall through to here.
  registerRoutes(app); // This should just add routes to 'app', not return a server
  console.log('Routes registered...');


  const port = 5000;
  server.listen(port, "0.0.0.0", () => {
    console.log(`✅ Server running on http://localhost:${port}`);
    console.log(`✅ Test endpoint: http://localhost:${port}/test`);
    console.log(`✅ Simple HTML: http://localhost:${port}/simple`);
  });
})().catch(error => {
  console.error('❌ Server startup failed:', error);
  process.exit(1);
});