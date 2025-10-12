import { DeviceType, Location, DeviceStatus } from './enums';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  location: Location;
  status?: DeviceStatus;
  created_at: string;
  updated_at: string;
  latestData?: {
    temperature?: number;
    humidity?: number;
    pressure?: number;
    voltage?: number;
    current?: number;
    light?: number;
    air_quality?: number;
    smoke?: number;
    water_level?: number;
    motion?: boolean;
    door_sensor?: boolean;
    window_sensor?: boolean;
    carbon_monoxide?: number;
    noise?: number;
    vibration?: number;
  };
  lastReading?: string;
  metadata?: Record<string, any>;
}

export interface SensorData {
  id: string;
  device_id: string;
  value: number;
  sensor_type: DeviceType;
  timestamp: string;
}

export interface DeviceStats {
  deviceId: string;
  totalReadings: number;
  temperature?: number;
  humidity?: number;
  pressure?: number;
  voltage?: number;
  current?: number;
  averageTemperature?: number;
  averageHumidity?: number;
  averagePressure?: number;
  averageVoltage?: number;
  averageCurrent?: number;
  lastReading?: SensorData;
  dateRange: {
    start: string;
    end: string;
  };
}

export interface CreateDeviceRequest {
  name: string;
  type: DeviceType;
  location: Location;
  metadata?: Record<string, any>;
}

export interface UpdateDeviceRequest {
  name?: string;
  type?: DeviceType;
  location?: Location;
  metadata?: Record<string, any>;
}

export interface CreateSensorDataRequest {
  temperature?: number;
  humidity?: number;
  pressure?: number;
  voltage?: number;
  current?: number;
  customData?: Record<string, any>;
}

export interface AnalyticsOverview {
  totalDevices: number;
  activeDevices24h: number;
  activeDevices7d: number;
  activeDevices30d: number;
  inactiveDevices: number;
}

export interface AnalyticsDataPoints {
  last24Hours: number;
  last7Days: number;
  last30Days: number;
  averagePerDay: number;
}

export interface DeviceTypeDistribution {
  type: DeviceType;
  count: number;
}

export interface LocationDistribution {
  location: Location;
  count: number;
}

export interface SensorTypeDistribution {
  sensor_type: DeviceType;
  count: number;
  average_value: number;
}

export interface AnalyticsDistributions {
  deviceTypes: DeviceTypeDistribution[];
  locations: LocationDistribution[];
  sensorTypes: SensorTypeDistribution[];
}

export interface RecentActivity {
  id: string;
  device_name: string;
  device_type: DeviceType;
  device_location: Location;
  sensor_type: DeviceType;
  value: number;
  timestamp: string;
}

export interface AnalyticsData {
  overview: AnalyticsOverview;
  dataPoints: AnalyticsDataPoints;
  distributions: AnalyticsDistributions;
  recentActivity: RecentActivity[];
}

// New API Filter Types
export interface DeviceFilters {
  page?: number;
  limit?: number;
  sortBy?: 'created_at' | 'updated_at' | 'name' | 'type' | 'location';
  sortOrder?: 'asc' | 'desc';
  type?: DeviceType;
  location?: Location;
  search?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}

export interface SensorDataQueryParams {
  startDate?: string;
  endDate?: string;
  limit?: number;
  sensorType?: DeviceType;
}

// Chart Data Types
export interface ChartDataPoint {
  time: string;
  value: number;
  timestamp: string;
}

export interface PieChartDataPoint {
  name: string;
  value: number;
  fill?: string;
}

export interface TransformedSensorData {
  [sensorType: string]: number | string;
  timestamp: string;
}

// Component Props Types
export interface DeviceCardProps {
  device: Device;
  onDelete?: (id: string) => void;
  onEdit?: (device: Device) => void;
}

export interface SensorDataChartProps {
  data: SensorData[];
  type: string;
}

export interface DeviceStatusChartProps {
  analyticsData: AnalyticsData;
}

export interface DeviceTypeChartProps {
  deviceTypes: DeviceTypeDistribution[];
}

export interface LocationChartProps {
  locations: LocationDistribution[];
}

export interface PaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
}
