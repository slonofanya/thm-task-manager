# Task management application

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Running Services with Docker Compose](#running-services-with-docker-compose)
  - [Running the Next.js Application](#running-the-nextjs-application)
- [Usage](#usage)
- [Additional comments](#additional-comments)
- [License](#license)

## Overview

This repository contains the source code for a web application that consists of multiple services started using Docker Compose and a Next.js application that can be started independently. This README provides instructions on how to set up and run the application.

## Prerequisites
  - docker version 23.0.5
  - npm version 18

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)

## Getting Started

### Running Services with Docker Compose

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

2. Run the docker-compose command


   ```bash
   docker compose up -d
   ```

3. Run the client application

   ```bash
   cd ./client
   npm install
   npm run dev
   ```

This will start the Next.js application locally, and you can access it in your web browser at http://localhost:3000.

# Usage

Navigate to the URL `http://localhost:3000` in your browser to see the dashboard with task management.

# Additional comments


## Added the features

### Task statuses

- In progress
- Completed

## Client:

In this application for client web app I used the [Next.js](https://nextjs.org/), which provides the necessary functionality and achieves:

- Server-Side Rendering (SSR)
- Routing
- Automatic Code Splitting
- Built-in CSS Support
- TypeScript Support
- Static Site Generation (SSG)
- API Routes and proxy server
- Automatic Code Reloading

## Server (API)

For server I used the [express](https://expressjs.com/) and [typeorm](https://typeorm.io/)
It provides the fast start and easy to maintain CRUD API web service

## Additional features that could be added to this application

### Authorization

Can be implemented by [passportjs](https://www.passportjs.org/) package that has a grate approaches to include the OAuth or any other option for manage the users.

### Collecting the user activity data

Here we could use the Google Analytics, Mixpanel, Heap Analyticsl, etc.

### Implement the sharing tasks between users

Users could in real-time collaborate via live chat or comments within shared tasks. Assign them to each other

### Task groups

Users can create new task groups to categorize and group related tasks together. Task groups can be given names or labels to reflect their purpose or category (e.g., "Work Projects," "Personal Tasks," "Shopping List").

# License
This project is licensed under the MIT License.
