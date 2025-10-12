import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useDevices, useAnalyticsOverview } from '../api/hooks';
import type { DeviceCardProps } from '../types';
import { 
  Smartphone, 
  Activity, 
  TrendingUp, 
  AlertTriangle,
  Thermometer,
  Droplets,
  Zap,
  BarChart3,
  Clock
} from 'lucide-react';
import { 
  getDeviceTypeLabel,
  getLocationLabel,
  getMeasurementUnit
} from '../types/enums';

const StatCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend 
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ComponentType<any>;
  trend?: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">
        {description}
        {trend && <span className="ml-1" style={{ color: 'hsl(var(--primary))' }}>{trend}</span>}
      </p>
    </CardContent>
  </Card>
);

const DeviceCard = ({ device }: DeviceCardProps) => {
  const latestData = device.latestData;

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{device.name}</CardTitle>
        </div>
        <CardDescription>{getDeviceTypeLabel(device.type)} • {getLocationLabel(device.location)}</CardDescription>
      </CardHeader>
      <CardContent>
        {latestData && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            {latestData.temperature && (
              <div className="flex items-center">
                <Thermometer className="h-4 w-4 mr-2" style={{ color: 'hsl(var(--destructive))' }} />
                <span>{latestData.temperature}{getMeasurementUnit('temperature')}</span>
              </div>
            )}
            {latestData.humidity && (
              <div className="flex items-center">
                <Droplets className="h-4 w-4 mr-2" style={{ color: 'hsl(var(--primary))' }} />
                <span>{latestData.humidity}{getMeasurementUnit('humidity')}</span>
              </div>
            )}
            {latestData.voltage && (
              <div className="flex items-center">
                <Zap className="h-4 w-4 mr-2" style={{ color: 'hsl(var(--warning))' }} />
                <span>{latestData.voltage}{getMeasurementUnit('voltage')}</span>
              </div>
            )}
            {latestData.pressure && (
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-2" style={{ color: 'hsl(var(--primary))' }} />
                <span>{latestData.pressure}{getMeasurementUnit('pressure')}</span>
              </div>
            )}
            {latestData.current && (
              <div className="flex items-center">
                <Zap className="h-4 w-4 mr-2" style={{ color: 'hsl(var(--primary))' }} />
                <span>{latestData.current}{getMeasurementUnit('current')}</span>
              </div>
            )}
            {latestData.light && (
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-2" style={{ color: 'hsl(var(--warning))' }} />
                <span>{latestData.light}{getMeasurementUnit('light')}</span>
              </div>
            )}
          </div>
        )}
        <div className="mt-4">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/devices/${device.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Dashboard() {
  const { data: devicesResponse, isLoading: devicesLoading, error: devicesError } = useDevices({ limit: 6 });
  const { data: analyticsData, isLoading: analyticsLoading, error: analyticsError } = useAnalyticsOverview();
  
  const devices = devicesResponse?.data || [];
  const isLoading = devicesLoading || analyticsLoading;
  const error = devicesError || analyticsError;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4" style={{ color: 'hsl(var(--destructive))' }} />
          <p style={{ color: 'hsl(var(--destructive))' }}>Failed to load dashboard data</p>
        </div>
      </div>
    );
  }

  const overview = analyticsData?.overview;
  const dataPoints = analyticsData?.dataPoints;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Monitor your IoT devices and sensor data</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Devices"
          value={overview?.totalDevices || 0}
          description="Registered devices"
          icon={Smartphone}
        />
        <StatCard
          title="Active Devices (24h)"
          value={overview?.activeDevices24h || 0}
          description="Data in last 24h"
          icon={Activity}
          trend="+12%"
        />
        <StatCard
          title="Inactive Devices"
          value={overview?.inactiveDevices || 0}
          description="No recent data"
          icon={AlertTriangle}
        />
        <StatCard
          title="Data Points (24h)"
          value={dataPoints?.last24Hours?.toLocaleString() || '0'}
          description="Last 24 hours"
          icon={TrendingUp}
          trend="+8%"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <StatCard
          title="Active Devices (7d)"
          value={overview?.activeDevices7d || 0}
          description="Data in last 7 days"
          icon={BarChart3}
        />
        <StatCard
          title="Active Devices (30d)"
          value={overview?.activeDevices30d || 0}
          description="Data in last 30 days"
          icon={Clock}
        />
        <StatCard
          title="Avg Data Points/Day"
          value={dataPoints?.averagePerDay?.toLocaleString() || '0'}
          description="Average daily readings"
          icon={TrendingUp}
        />
      </div>

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">Recent Devices</h2>
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link to="/devices">View All</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {devices.slice(0, 6).map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and device management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link to="/devices/new">
                <Smartphone className="mr-2 h-4 w-4" />
                Add New Device
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link to="/analytics">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Analytics
              </Link>
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <Activity className="mr-2 h-4 w-4" />
              Refresh All Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
