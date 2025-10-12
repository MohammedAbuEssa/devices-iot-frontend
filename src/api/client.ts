import axios from 'axios';
import type {
  Device,
  SensorData,
  DeviceStats,
  CreateDeviceRequest,
  UpdateDeviceRequest,
  CreateSensorDataRequest,
  SensorDataQueryParams,
  AnalyticsData,
  DeviceFilters,
  PaginatedResponse,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const deviceApi = {
  createDevice: async (data: CreateDeviceRequest): Promise<Device> => {
    const response = await apiClient.post('/devices', data);
    return response.data;
  },

  getDevices: async (filters?: DeviceFilters): Promise<PaginatedResponse<Device>> => {
    const response = await apiClient.get('/devices', { params: filters });
    return response.data;
  },

  getDevice: async (id: string): Promise<Device> => {
    const response = await apiClient.get(`/devices/${id}`);
    return response.data;
  },

  updateDevice: async (id: string, data: UpdateDeviceRequest): Promise<Device> => {
    const response = await apiClient.patch(`/devices/${id}`, data);
    return response.data;
  },

  deleteDevice: async (id: string): Promise<void> => {
    await apiClient.delete(`/devices/${id}`);
  },
};

export const sensorDataApi = {
  addSensorData: async (deviceId: string, data: CreateSensorDataRequest): Promise<SensorData> => {
    const response = await apiClient.post(`/devices/${deviceId}/data`, data);
    return response.data;
  },

  getSensorData: async (deviceId: string, params?: SensorDataQueryParams): Promise<SensorData[]> => {
    const response = await apiClient.get(`/devices/${deviceId}/data`, { params });
    return response.data;
  },

  getLatestReading: async (deviceId: string): Promise<SensorData> => {
    const response = await apiClient.get(`/devices/${deviceId}/data/latest`);
    return response.data;
  },

  getStats: async (deviceId: string, params?: SensorDataQueryParams): Promise<DeviceStats> => {
    const response = await apiClient.get(`/devices/${deviceId}/data/stats`, { params });
    return response.data;
  },
};

export const analyticsApi = {
  getAnalyticsOverview: async (): Promise<AnalyticsData> => {
    const response = await apiClient.get('/devices/analytics/overview');
    return response.data;
  },
};

export default apiClient;
