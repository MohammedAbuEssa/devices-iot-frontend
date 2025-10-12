# IoT Devices Dashboard

A modern, responsive React dashboard for managing and monitoring IoT devices and their sensor data. Built with TypeScript, React Query, Shadcn UI, and containerized with Docker.

## Features

- **Device Management**: Register, view, edit, and delete IoT devices
- **Real-time Monitoring**: Live sensor data visualization with charts and graphs
- **Analytics Dashboard**: Comprehensive analytics and insights
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Built with Shadcn UI components and Tailwind CSS
- **Type Safety**: Full TypeScript support throughout the application
- **Containerized**: Docker and Docker Compose ready for easy deployment

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **UI Components**: Shadcn UI, Radix UI, Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Charts**: Recharts, Chart.js
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Containerization**: Docker, Docker Compose
- **Web Server**: Nginx

## Getting Started

### Prerequisites

- Node.js 18+ and Yarn
- Docker and Docker Compose (for containerized deployment)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd devices-iot-frontend
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Start the development server**
   ```bash
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   - Frontend: `http://localhost:3001`
   - Backend API: `http://localhost:3000` (your existing backend)

## Project Structure

```
src/
├── api/                 # API client and React Query hooks
│   ├── client.ts        # Axios client configuration
│   └── hooks.ts         # React Query hooks
├── components/          # Reusable UI components
│   └── ui/             # Shadcn UI components
├── lib/                 # Utility functions
├── pages/               # Page components
│   ├── Dashboard.tsx    # Main dashboard
│   ├── Devices.tsx      # Device management
│   ├── DeviceDetails.tsx # Individual device view
│   └── Analytics.tsx    # Analytics and insights
├── types/               # TypeScript type definitions
└── App.tsx             # Main application component
```

## API Integration

The application integrates with a backend API with the following endpoints:

### Devices
- `POST /devices` - Create device
- `GET /devices` - List all devices
- `GET /devices/:id` - Get device by ID
- `PATCH /devices/:id` - Update device
- `DELETE /devices/:id` - Delete device

### Sensor Data
- `POST /devices/:id/data` - Add sensor data
- `GET /devices/:id/data` - Get sensor data
- `GET /devices/:id/data/latest` - Get latest reading
- `GET /devices/:id/data/stats` - Get statistics

### Query Parameters
- `startDate` - Filter from date
- `endDate` - Filter to date
- `limit` - Max records (max 1000)

## Features Overview

### Dashboard
- Overview statistics (total devices, online/offline status)
- Recent devices with quick actions
- Real-time data visualization
- Quick action buttons

### Device Management
- Add new devices with form validation
- Search and filter devices
- Device status indicators
- Bulk operations support

### Device Details
- Individual device monitoring
- Real-time sensor data charts
- Historical data visualization
- Manual data entry
- Device statistics and metrics

### Analytics
- Comprehensive analytics dashboard
- Device status distribution
- Sensor data trends
- Performance metrics
- Export capabilities

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=IoT Devices Dashboard
```

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint

## Docker Commands

```bash
# Build the frontend image
docker build -t iot-dashboard-frontend .

# Run with Docker Compose
docker-compose up

# Run in detached mode
docker-compose up -d

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up --build --force-recreate
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the repository or contact the development team.