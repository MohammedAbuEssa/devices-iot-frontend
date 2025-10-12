import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { useDevice, useSensorData, useAddSensorData } from '../api/hooks';
import type { CreateSensorDataRequest } from '../types';
import { 
  ArrowLeft, 
  Plus, 
  Thermometer, 
  Droplets, 
  Zap, 
  Activity,
  TrendingUp,
  Clock,
  MapPin,
  Calendar,
  BarChart3
} from 'lucide-react';
import { subDays } from 'date-fns';
import { safeFormatDate } from '../lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  getDeviceTypeLabel, 
  getLocationLabel, 
  getMeasurementUnit 
} from '../types/enums';
import type { 
  ChartDataPoint, 
  TransformedSensorData, 
  SensorDataChartProps,
  SensorData 
} from '../types';
import { useToast } from '../hooks/use-toast';

const SensorDataChart = ({ data, type }: SensorDataChartProps) => {
  // Filter data by sensor type and transform for chart
  const chartData: ChartDataPoint[] = data?.filter(item => item.sensor_type === type)
    .map(item => ({
      time: safeFormatDate(item.timestamp, 'HH:mm', '--:--'),
      value: item.value || 0,
      timestamp: item.timestamp
    })) || [];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip 
          labelFormatter={(value, payload) => {
            if (payload && payload[0]) {
              return safeFormatDate(payload[0].payload.timestamp, 'MMM DD, YYYY HH:mm', 'Invalid Date');
            }
            return value;
          }}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#3b82f6" 
          strokeWidth={2}
          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const AddSensorDataDialog = ({ 
  open, 
  onOpenChange, 
  deviceId 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  deviceId: string;
}) => {
  const [formData, setFormData] = useState<CreateSensorDataRequest>({
    temperature: undefined,
    humidity: undefined,
    pressure: undefined,
    voltage: undefined,
    current: undefined,
  });
  const addSensorData = useAddSensorData();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addSensorData.mutateAsync({ deviceId, data: formData });
      setFormData({
        temperature: undefined,
        humidity: undefined,
        pressure: undefined,
        voltage: undefined,
        current: undefined,
      });
      onOpenChange(false);
      toast({
        title: "Sensor Data Added Successfully",
        description: "New sensor readings have been recorded for this device.",
        variant: "success",
      });
    } catch (error) {
      console.error('Failed to add sensor data:', error);
      toast({
        title: "Failed to Add Sensor Data",
        description: "There was an error adding sensor data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Sensor Data</DialogTitle>
          <DialogDescription>
            Manually add sensor readings for this device.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature ({getMeasurementUnit('temperature')})</Label>
              <Input
                id="temperature"
                type="number"
                step="0.1"
                value={formData.temperature || ''}
                onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) || undefined })}
                placeholder="25.5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="humidity">Humidity ({getMeasurementUnit('humidity')})</Label>
              <Input
                id="humidity"
                type="number"
                step="0.1"
                value={formData.humidity || ''}
                onChange={(e) => setFormData({ ...formData, humidity: parseFloat(e.target.value) || undefined })}
                placeholder="60.0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pressure">Pressure ({getMeasurementUnit('pressure')})</Label>
              <Input
                id="pressure"
                type="number"
                step="0.1"
                value={formData.pressure || ''}
                onChange={(e) => setFormData({ ...formData, pressure: parseFloat(e.target.value) || undefined })}
                placeholder="1013.25"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="voltage">Voltage ({getMeasurementUnit('voltage')})</Label>
              <Input
                id="voltage"
                type="number"
                step="0.1"
                value={formData.voltage || ''}
                onChange={(e) => setFormData({ ...formData, voltage: parseFloat(e.target.value) || undefined })}
                placeholder="12.0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current">Current ({getMeasurementUnit('current')})</Label>
              <Input
                id="current"
                type="number"
                step="0.01"
                value={formData.current || ''}
                onChange={(e) => setFormData({ ...formData, current: parseFloat(e.target.value) || undefined })}
                placeholder="0.5"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="noBg" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="outline" disabled={addSensorData.isPending}>
              {addSensorData.isPending ? 'Adding...' : 'Add Data'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default function DeviceDetails() {
  const { id } = useParams<{ id: string }>();
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Memoize the start date to prevent infinite re-renders
  const startDate = useMemo(() => subDays(new Date(), 1).toISOString(), []);

  const { data: device, isLoading: deviceLoading } = useDevice(id!);
  const { data: sensorData } = useSensorData(id!, {
    startDate,
    limit: 100
  });

  // Transform sensor data array into object format for easier access
  const transformSensorData = (data: SensorData[]): TransformedSensorData => {
    if (!data || !Array.isArray(data)) return { timestamp: '' };
    
    const transformed: TransformedSensorData = { timestamp: '' };
    data.forEach(item => {
      if (item.sensor_type && item.value !== undefined) {
        transformed[item.sensor_type] = item.value;
        transformed.timestamp = item.timestamp; // Use the latest timestamp
      }
    });
    return transformed;
  };

  // Use sensorData (from /data endpoint) for current readings since we know it works
  const currentReadings = transformSensorData(sensorData || []);

  // Debug logging
  console.log('Sensor Data:', sensorData);
  console.log('Current Readings:', currentReadings);


  if (deviceLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!device) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600">Device not found</p>
          <Button asChild className="mt-4">
            <Link to="/devices">Back to Devices</Link>
          </Button>
        </div>
      </div>
    );
  }


  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row  sm:items-center gap-4">
          <Button variant="noBg" asChild className="w-full sm:w-auto bg-none justify-start">
            <Link to="/devices">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{device.name}</h1>
            <p className="text-sm sm:text-base text-muted-foreground">{getDeviceTypeLabel(device.type)} • {getLocationLabel(device.location)}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => setShowAddDialog(true)} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Data
          </Button>
        </div>
      </div>

      {/* Device Info */}
      <Card>
        <CardHeader>
          <CardTitle>Device Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-gray-600">{getLocationLabel(device.location)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium">Created</p>
                <p className="text-sm text-gray-600">{safeFormatDate(device.created_at, 'MMM DD, YYYY')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-sm text-gray-600">{safeFormatDate(device.updated_at, 'MMM DD, YYYY')}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Readings */}
      {Object.keys(currentReadings).length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {currentReadings.temperature && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                <Thermometer className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentReadings.temperature}{getMeasurementUnit('temperature')}</div>
                <p className="text-xs text-muted-foreground">
                  {safeFormatDate(currentReadings.timestamp, 'MMM DD, HH:mm')}
                </p>
              </CardContent>
            </Card>
          )}
          {currentReadings.humidity && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Humidity</CardTitle>
                <Droplets className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentReadings.humidity}{getMeasurementUnit('humidity')}</div>
                <p className="text-xs text-muted-foreground">
                  {safeFormatDate(currentReadings.timestamp, 'MMM DD, HH:mm')}
                </p>
              </CardContent>
            </Card>
          )}
          {currentReadings.voltage && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Voltage</CardTitle>
                <Zap className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentReadings.voltage}{getMeasurementUnit('voltage')}</div>
                <p className="text-xs text-muted-foreground">
                  {safeFormatDate(currentReadings.timestamp, 'MMM DD, HH:mm')}
                </p>
              </CardContent>
            </Card>
          )}
          {currentReadings.pressure && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pressure</CardTitle>
                <Activity className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentReadings.pressure}{getMeasurementUnit('pressure')}</div>
                <p className="text-xs text-muted-foreground">
                  {safeFormatDate(currentReadings.timestamp, 'MMM DD, HH:mm')}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {currentReadings.temperature && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Temperature Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SensorDataChart data={sensorData || []} type="temperature" />
            </CardContent>
          </Card>
        )}
        {currentReadings.humidity && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Humidity Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SensorDataChart data={sensorData || []} type="humidity" />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Statistics */}
   

      <AddSensorDataDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog} 
        deviceId={id!} 
      />
    </div>
  );
}
