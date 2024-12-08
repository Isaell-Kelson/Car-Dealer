# Vehicle Search Application

A modern web application for searching vehicle makes and models based on selected year and make. This project uses Next.js, React, and Tailwind CSS for building a sleek and responsive user interface.


https://github.com/user-attachments/assets/82001390-7fe3-41ca-a927-9266f6dda045


## Features

- Search for vehicle makes and models by year.
- Clean and modern UI with a beautiful background.
- Responsive design optimized for desktop and mobile devices.
- Data fetched from an external API (National Highway Traffic Safety Administration - NHTSA).

## Architecture

- **Frontend**: The frontend is built with React and Next.js, providing server-side rendering (SSR) capabilities.
- **Styling**: Tailwind CSS is used for rapid styling and creating a clean, modern design.
- **API**: Data is fetched from the NHTSA's public API to display vehicle makes and models.
- **Dynamic Routing**: Next.js dynamic routing is used to display vehicle models based on selected make and year.

## Installation

### Prerequisites

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 16 or higher)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)

### Steps to Run the Application

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/vehicle-search-app.git
    cd vehicle-search-app
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

   Your application will be running at [http://localhost:3000](http://localhost:3000).