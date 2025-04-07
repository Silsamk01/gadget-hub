# Gadget Hub

A modern e-commerce platform for gadgets and electronics, built with Node.js, Express, and MySQL.

## Features

- User authentication and session management
- Product catalog with search functionality
- Vendor management system
- Shopping cart functionality
- Secure payment processing
- Responsive design with Bootstrap

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL with Sequelize ORM
- **Frontend**: EJS templates, Bootstrap 5
- **Authentication**: Express Session
- **Security**: CSRF protection, rate limiting
- **Maps Integration**: Google Maps API

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- Google Maps API Key (for location features)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gadget-hub.git
cd gadget-hub
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=gadget_hub
SESSION_SECRET=your_session_secret
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NODE_ENV=development
```

4. Initialize the database:
```bash
mysql -u your_mysql_username -p < database/schema.sql
```

5. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
gadget-hub/
├── backend/
│   ├── models/         # Database models
│   ├── routes/         # Express routes
│   └── controllers/    # Business logic
├── public/             # Static assets
├── views/              # EJS templates
├── server.js           # Main application file
└── package.json        # Project dependencies
```

## Security Features

- CSRF protection
- Rate limiting
- Secure session management
- Password hashing with bcrypt
- Environment variable configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@gadgethub.com or create an issue in the repository. 