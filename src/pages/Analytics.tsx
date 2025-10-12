import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAnalyticsOverview } from '../api/hooks';
import type { 
  DeviceStatusChartProps, 
  DeviceTypeChartProps, 
  LocationChartProps
} from '../types';
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Thermometer, 
  Droplets, 
  Zap,
  Download,
  Clock,
  MapPin,
  Layers
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TIME_RANGES, 
  TIME_RANGE_LABELS, 
  DEVICE_STATUS_COLORS, 
  getDeviceTypeLabel,
  getLocationLabel,
  getMeasurementUnit
} from '../types/enums';

const TimeRangeSelector = ({ 
  value, 
  onChange 
}: { 
  value: string; 
  onChange: (value: string) => void 
}) => {
  const ranges = [
    { value: TIME_RANGES.LAST_24_HOURS, label: TIME_RANGE_LABELS.LAST_24_HOURS },
    { value: TIME_RANGES.LAST_7_DAYS, label: TIME_RANGE_LABELS.LAST_7_DAYS },
    { value: TIME_RANGES.LAST_30_DAYS, label: TIME_RANGE_LABELS.LAST_30_DAYS },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      {ranges.map((range) => (
        <Button
          key={range.value}
          variant={value === range.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange(range.value)}
          className="w-full sm:w-auto"
        >
          {range.label}
        </Button>
      ))}
    </div>
  );
};

const DeviceStatusChart = ({ analyticsData }: DeviceStatusChartProps) => {
  if (!analyticsData?.overview) {
    return (
      <div className="flex items-center justify-center h-64">
        <p style={{ color: 'hsl(var(--muted-foreground))' }}>No data available</p>
      </div>
    );
  }

  const { totalDevices, inactiveDevices } = analyticsData.overview;
  const activeDevices = totalDevices - inactiveDevices;

  const data = [
    {
      status: 'Active',
      count: activeDevices,
      color: DEVICE_STATUS_COLORS.ACTIVE
    },
    {
      status: 'Inactive',
      count: inactiveDevices,
      color: DEVICE_STATUS_COLORS.INACTIVE
    }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ status, count }) => `${status}: ${count}`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="count"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

const DeviceTypeChart = ({ deviceTypes }: DeviceTypeChartProps) => {
  if (!deviceTypes || deviceTypes.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p style={{ color: 'hsl(var(--muted-foreground))' }}>No device types available</p>
      </div>
    );
  }

  const data = deviceTypes.map((item) => ({
    type: getDeviceTypeLabel(item.type),
    count: item.count
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const LocationChart = ({ locations }: LocationChartProps) => {
  if (!locations || locations.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p style={{ color: 'hsl(var(--muted-foreground))' }}>No location data available</p>
      </div>
    );
  }

  // Color palette for different locations
  const colors = [
    '#3b82f6', // blue-500
    '#10b981', // emerald-500
    '#f59e0b', // amber-500
    '#ef4444', // red-500
    '#8b5cf6', // violet-500
    '#06b6d4', // cyan-500
    '#84cc16', // lime-500
    '#f97316', // orange-500
    '#ec4899', // pink-500
    '#6366f1', // indigo-500
    '#14b8a6', // teal-500
    '#eab308', // yellow-500
    '#dc2626', // red-600
    '#7c3aed', // violet-600
    '#059669', // emerald-600
    '#0891b2', // cyan-600
    '#65a30d', // lime-600
    '#ea580c', // orange-600
    '#db2777', // pink-600
    '#4f46e5', // indigo-600
  ];

  const data = locations.map((item, index) => ({
    location: getLocationLabel(item.location),
    count: item.count,
    fill: colors[index % colors.length]
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="location" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default function Analytics() {
  const [timeRange, setTimeRange] = useState<string>(TIME_RANGES.LAST_7_DAYS);
  const { data: analyticsData, isLoading } = useAnalyticsOverview();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: 'hsl(var(--primary))' }}></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Comprehensive insights into your IoT ecosystem</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2">
          <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
            <Activity className="h-4 w-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData?.overview.totalDevices || 0}</div>
            <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {analyticsData?.overview.inactiveDevices || 0} inactive
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
            <TrendingUp className="h-4 w-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {timeRange === TIME_RANGES.LAST_24_HOURS ? analyticsData?.overview.activeDevices24h || 0 :
               timeRange === TIME_RANGES.LAST_7_DAYS ? analyticsData?.overview.activeDevices7d || 0 :
               analyticsData?.overview.activeDevices30d || 0}
            </div>
            <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Last {timeRange === TIME_RANGES.LAST_24_HOURS ? '24h' : 
                    timeRange === TIME_RANGES.LAST_7_DAYS ? '7d' : '30d'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Points</CardTitle>
            <BarChart3 className="h-4 w-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {timeRange === TIME_RANGES.LAST_24_HOURS ? analyticsData?.dataPoints.last24Hours.toLocaleString() || 0 :
               timeRange === TIME_RANGES.LAST_7_DAYS ? analyticsData?.dataPoints.last7Days.toLocaleString() || 0 :
               analyticsData?.dataPoints.last30Days.toLocaleString() || 0}
            </div>
            <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Avg {analyticsData?.dataPoints.averagePerDay || 0}/day
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sensor Types</CardTitle>
            <Layers className="h-4 w-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData?.distributions.sensorTypes.length || 0}</div>
            <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Different sensor types
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Device Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Device Status Distribution</CardTitle>
            <CardDescription>Current status of all devices</CardDescription>
          </CardHeader>
          <CardContent>
            <DeviceStatusChart analyticsData={analyticsData!} />
          </CardContent>
        </Card>

        {/* Device Types */}
        <Card>
          <CardHeader>
            <CardTitle>Device Types</CardTitle>
            <CardDescription>Distribution by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <DeviceTypeChart deviceTypes={analyticsData?.distributions.deviceTypes || []} />
          </CardContent>
        </Card>
      </div>

      {/* Location Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" style={{ color: 'hsl(var(--primary))' }} />
            Device Locations
          </CardTitle>
          <CardDescription>Distribution of devices across locations</CardDescription>
        </CardHeader>
        <CardContent>
          <LocationChart locations={analyticsData?.distributions.locations || []} />
        </CardContent>
      </Card>


      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5" style={{ color: 'hsl(var(--primary))' }} />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest sensor readings from all devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analyticsData?.recentActivity.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'hsl(var(--accent))' }}>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
                    <Activity className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.device_name}</p>
                    <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      {getLocationLabel(activity.device_location)} • {getDeviceTypeLabel(activity.sensor_type)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{activity.value}</p>
                  <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {analyticsData?.distributions.sensorTypes.slice(0, 3).map((sensor) => (
          <Card key={sensor.sensor_type}>
            <CardHeader>
              <CardTitle className="flex items-center">
                {sensor.sensor_type === 'temperature' && <Thermometer className="mr-2 h-5 w-5" style={{ color: 'hsl(var(--destructive))' }} />}
                {sensor.sensor_type === 'humidity' && <Droplets className="mr-2 h-5 w-5" style={{ color: 'hsl(var(--primary))' }} />}
                {sensor.sensor_type === 'voltage' && <Zap className="mr-2 h-5 w-5" style={{ color: 'hsl(var(--warning))' }} />}
                {sensor.sensor_type === 'pressure' && <Activity className="mr-2 h-5 w-5" style={{ color: 'hsl(var(--secondary))' }} />}
                {sensor.sensor_type === 'current' && <Zap className="mr-2 h-5 w-5" style={{ color: 'hsl(var(--accent))' }} />}
                {sensor.sensor_type === 'light' && <Activity className="mr-2 h-5 w-5" style={{ color: 'hsl(var(--warning))' }} />}
                {sensor.sensor_type === 'motion' && <Activity className="mr-2 h-5 w-5" style={{ color: 'hsl(var(--primary))' }} />}
                {!['temperature', 'humidity', 'voltage', 'pressure', 'current', 'light', 'motion'].includes(sensor.sensor_type) && 
                  <Activity className="mr-2 h-5 w-5" style={{ color: 'hsl(var(--muted-foreground))' }} />}
                {getDeviceTypeLabel(sensor.sensor_type)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Readings</span>
                  <span className="font-medium">{sensor.count.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Average</span>
                  <span className="font-medium">
                    {sensor.average_value.toFixed(2)}{getMeasurementUnit(sensor.sensor_type)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
