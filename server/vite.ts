/* import { Express } from "express";

import { createServer as createViteServer } from "vite";

import { Server } from "http";

import express from "express";

import path from "path";


export function log(message: string, source = "express") {

  const timestamp = new Date().toLocaleTimeString();

  console.log(`${timestamp} [${source}] ${message}`);

}


export async function setupVite(app: Express, server: Server) {

  const vite = await createViteServer({

    server: { middlewareMode: true },

    appType: "spa",

    root: path.resolve(process.cwd(), "client"),

  });


  app.use(vite.ssrFixStacktrace);

  app.use(vite.middlewares);

 

  // Fallback for SPA routing

  app.get('*', (req, res, next) => {

    if (req.path.startsWith('/api')) {

      return next();

    }

    // Let Vite handle the request

    vite.middlewares(req, res, next);

  });

}


export function serveStatic(app: Express) {

  app.use(express.static("dist/public"));

 

  // Fallback for SPA routing in production

  app.get('*', (req, res) => {

    if (!req.path.startsWith('/api')) {

      res.sendFile(path.resolve(process.cwd(), 'dist/public/index.html'));

    }

  });

} */



import { Express } from "express";

import { createServer as createViteServer } from "vite";

import { Server } from "http";

import express from "express";

import path from "path";


export function log(message: string, source = "express") {

  const timestamp = new Date().toLocaleTimeString();

  console.log(`${timestamp} [${source}] ${message}`);

}


export async function setupVite(app: Express, server: Server) {

  try {

    const vite = await createViteServer({

      server: { middlewareMode: true },

      appType: "spa",

      root: path.resolve(process.cwd(), "client"),

      configFile: path.resolve(process.cwd(), "vite.config.ts"),

    });


    console.log('Vite server created successfully');

   

    // Use Vite's built-in middleware

    app.use(vite.ssrFixStacktrace);

    app.use(vite.middlewares);

   

    console.log('Vite middleware applied');

   

  } catch (error) {

    console.error('Error setting up Vite:', error);

    throw error;

  }

}


export function serveStatic(app: Express) {

  app.use(express.static("dist/public"));

 

  app.get('*', (req, res) => {

    if (!req.path.startsWith('/api')) {

      res.sendFile(path.resolve(process.cwd(), 'dist/public/index.html'));

    }

  });

}