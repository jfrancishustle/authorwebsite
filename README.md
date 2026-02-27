# Author SaaS

A simple SaaS platform for authors to create their own blogs and websites.

## Features

- **User Authentication**: Secure registration and login.
- **Dashboard**: Manage your posts.
- **Public Author Sites**: Each author gets a unique public page at `/u/:username` displaying their bio and posts.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/jfrancishustle/authorwebsite.git
    cd authorwebsite
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Initialize the database:
    ```bash
    node database/init.js
    ```

### Running the Application

Start the server:

```bash
node server.js
```

The application will be available at `http://localhost:3000`.

### Usage

1.  **Register**: Go to `http://localhost:3000/register` to create an account.
2.  **Login**: Access your dashboard at `http://localhost:3000/login`.
3.  **Create Post**: Use the dashboard to write and publish new blog posts.
4.  **View Site**: Your public author site is available at `http://localhost:3000/u/YOUR_USERNAME`.

## Technologies Used

-   **Backend**: Node.js, Express
-   **Database**: SQLite3
-   **Templating**: EJS
-   **Authentication**: bcrypt, express-session
