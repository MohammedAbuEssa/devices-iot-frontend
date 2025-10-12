import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deviceApi, sensorDataApi, analyticsApi } from './client';
import type {
  UpdateDeviceRequest,
  CreateSensorDataRequest,
  SensorDataQueryParams,
  DeviceFilters,
} from '../types';

// Device hooks
export const useDevices = (filters?: DeviceFilters) => {
  return useQuery({
    queryKey: ['devices', filters],
    queryFn: () => deviceApi.getDevices(filters),
  });
};

export const useDevice = (id: string) => {
  return useQuery({
    queryKey: ['devices', id],
    queryFn: () => deviceApi.getDevice(id),
    enabled: !!id,
  });
};

export const useCreateDevice = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deviceApi.createDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    },
  });
};

export const useUpdateDevice = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDeviceRequest }) =>
      deviceApi.updateDevice(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      queryClient.invalidateQueries({ queryKey: ['devices', id] });
    },
  });
};

export const useDeleteDevice = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deviceApi.deleteDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    },
  });
};

// Sensor Data hooks
export const useSensorData = (deviceId: string, params?: SensorDataQueryParams) => {
  return useQuery({
    queryKey: ['sensorData', deviceId, params],
    queryFn: () => sensorDataApi.getSensorData(deviceId, params),
    enabled: !!deviceId,
  });
};

export const useLatestReading = (deviceId: string) => {
  return useQuery({
    queryKey: ['latestReading', deviceId],
    queryFn: () => sensorDataApi.getLatestReading(deviceId),
    enabled: !!deviceId,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useDeviceStats = (deviceId: string, params?: SensorDataQueryParams) => {
  return useQuery({
    queryKey: ['deviceStats', deviceId, params],
    queryFn: () => sensorDataApi.getStats(deviceId, params),
    enabled: !!deviceId,
  });
};

export const useAddSensorData = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ deviceId, data }: { deviceId: string; data: CreateSensorDataRequest }) =>
      sensorDataApi.addSensorData(deviceId, data),
    onSuccess: (_, { deviceId }) => {
      queryClient.invalidateQueries({ queryKey: ['sensorData', deviceId] });
      queryClient.invalidateQueries({ queryKey: ['latestReading', deviceId] });
      queryClient.invalidateQueries({ queryKey: ['deviceStats', deviceId] });
    },
  });
};

// Analytics hooks
export const useAnalyticsOverview = () => {
  return useQuery({
    queryKey: ['analytics', 'overview'],
    queryFn: analyticsApi.getAnalyticsOverview,
    refetchInterval: 60000, // Refetch every minute
  });
};
