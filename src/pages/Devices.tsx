import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { DeviceActions } from '../components/DeviceActions';
import { useDevices, useCreateDevice, useUpdateDevice, useDeleteDevice } from '../api/hooks';
import { useToast } from '../hooks/use-toast';
import type { 
  CreateDeviceRequest, 
  UpdateDeviceRequest, 
  Device, 
  DeviceFilters, 
  DeviceCardProps, 
  PaginationProps 
} from '../types';
import { 
  Plus, 
  Search, 
  Smartphone,
  MapPin,
  Calendar,
  Activity,
  Filter,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { safeFormatDate } from '../lib/utils';
import { 
  DEVICE_TYPES, 
  LOCATIONS, 
  PAGINATION_SIZE,
  getDeviceTypeLabel, 
  getLocationLabel
} from '../types/enums';
import type { DeviceType, Location } from '../types/enums';

const DeviceCard = ({ device, onDelete, onEdit }: DeviceCardProps) => {

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'hsl(var(--accent))' }}>
              <Smartphone className="h-5 w-5" style={{ color: 'hsl(var(--primary))' }} />
            </div>
            <div>
              <CardTitle className="text-lg">{device.name}</CardTitle>
              <CardDescription>{getDeviceTypeLabel(device.type)}</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <DeviceActions deviceId={device.id} onDelete={onDelete!} onEdit={() => onEdit!(device)} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            <MapPin className="h-4 w-4 mr-2" />
            {getLocationLabel(device.location)}
          </div>
          <div className="flex items-center text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            <Calendar className="h-4 w-4 mr-2" />
            Created {safeFormatDate(device.created_at, 'MMM DD, YYYY')}
          </div>
          <div className="flex items-center text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            <Activity className="h-4 w-4 mr-2" />
            Last updated {safeFormatDate(device.updated_at, 'MMM DD, YYYY')}
          </div>
        </div>
        
      </CardContent>
    </Card>
  );
};

const AddDeviceDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const [formData, setFormData] = useState<CreateDeviceRequest>({
    name: '',
    type: '' as DeviceType,
    location: '' as Location,
  });
  const createDevice = useCreateDevice();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDevice.mutateAsync(formData);
      setFormData({ name: '', type: '' as DeviceType, location: '' as Location });
      onOpenChange(false);
      navigate('/devices');
      toast({
        title: "Device Added Successfully",
        description: `${formData.name} has been added to your device list.`,
        variant: "success",
      });
    } catch (error) {
      console.error('Failed to create device:', error);
      toast({
        title: "Failed to Add Device",
        description: "There was an error adding the device. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Device</DialogTitle>
          <DialogDescription>
            Register a new IoT device to start monitoring sensor data.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Device Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter device name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Device Type</Label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as DeviceType })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select device type</option>
              {Object.entries(DEVICE_TYPES).map(([key, value]) => (
                <option key={key} value={value}>
                  {getDeviceTypeLabel(value)}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <select
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value as Location })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select location</option>
              {Object.entries(LOCATIONS).map(([key, value]) => (
                <option key={key} value={value}>
                  {getLocationLabel(value)}
                </option>
              ))}
            </select>
          </div>
          <DialogFooter>
            <Button type="button" variant="noBg" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="outline" disabled={createDevice.isPending}>
              {createDevice.isPending ? 'Creating...' : 'Create Device'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const EditDeviceDialog = ({ 
  open, 
  onOpenChange, 
  device 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  device: Device | null;
}) => {
  const [formData, setFormData] = useState<UpdateDeviceRequest>({
    name: '',
    type: '' as DeviceType,
    location: '' as Location,
  });
  const updateDevice = useUpdateDevice();
  const { toast } = useToast();

  React.useEffect(() => {
    if (device) {
      setFormData({
        name: device.name,
        type: device.type,
        location: device.location,
      });
    }
  }, [device]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!device) return;
    
    try {
      await updateDevice.mutateAsync({ id: device.id, data: formData });
      onOpenChange(false);
      toast({
        title: "Device Updated Successfully",
        description: `${formData.name || device.name} has been updated.`,
        variant: "success",
      });
    } catch (error) {
      console.error('Failed to update device:', error);
      toast({
        title: "Failed to Update Device",
        description: "There was an error updating the device. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!device) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Device</DialogTitle>
          <DialogDescription>
            Update the device information and settings.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Device Name</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter device name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-type">Device Type</Label>
            <select
              id="edit-type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as DeviceType })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select device type</option>
              {Object.entries(DEVICE_TYPES).map(([key, value]) => (
                <option key={key} value={value}>
                  {getDeviceTypeLabel(value)}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-location">Location</Label>
            <select
              id="edit-location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value as Location })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select location</option>
              {Object.entries(LOCATIONS).map(([key, value]) => (
                <option key={key} value={value}>
                  {getLocationLabel(value)}
                </option>
              ))}
            </select>
          </div>
          <DialogFooter>
            <Button type="button" variant="noBg" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="outline" disabled={updateDevice.isPending}>
              {updateDevice.isPending ? 'Updating...' : 'Update Device'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const FilterControls = ({ 
  filters, 
  onFiltersChange 
}: { 
  filters: DeviceFilters; 
  onFiltersChange: (filters: DeviceFilters) => void;
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const clearFilters = () => {
    onFiltersChange({
      page: 1,
      limit: filters.limit || PAGINATION_SIZE.MEDIUM,
    });
  };

  const hasActiveFilters = filters.type || filters.location || filters.search || 
                          filters.sortBy || filters.sortOrder;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
                <Input
                  placeholder="Search devices..."
                  value={filters.search || ''}
                  onChange={(e) => onFiltersChange({ ...filters, search: e.target.value, page: 1 })}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <span className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                    {[filters.type, filters.location, filters.sortBy].filter(Boolean).length}
                  </span>
                )}
              </Button>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters} className="flex items-center gap-2">
                  <X className="h-4 w-4" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
              <div className="space-y-2">
                <Label htmlFor="device-type">Device Type</Label>
                <select
                  id="device-type"
                  value={filters.type || ''}
                  onChange={(e) => onFiltersChange({ 
                    ...filters, 
                    type: e.target.value as DeviceType || undefined, 
                    page: 1 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  {Object.entries(DEVICE_TYPES).map(([key, value]) => (
                    <option key={key} value={value}>
                      {getDeviceTypeLabel(value)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="device-location">Location</Label>
                <select
                  id="device-location"
                  value={filters.location || ''}
                  onChange={(e) => onFiltersChange({ 
                    ...filters, 
                    location: e.target.value as Location || undefined, 
                    page: 1 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Locations</option>
                  {Object.entries(LOCATIONS).map(([key, value]) => (
                    <option key={key} value={value}>
                      {getLocationLabel(value)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sort-by">Sort By</Label>
                <select
                  id="sort-by"
                  value={filters.sortBy || 'created_at'}
                  onChange={(e) => onFiltersChange({ 
                    ...filters, 
                    sortBy: e.target.value as 'created_at' | 'updated_at' | 'name' | 'type' | 'location', 
                    page: 1 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="created_at">Created Date</option>
                  <option value="updated_at">Updated Date</option>
                  <option value="name">Name</option>
                  <option value="type">Type</option>
                  <option value="location">Location</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sort-order">Sort Order</Label>
                <select
                  id="sort-order"
                  value={filters.sortOrder || 'desc'}
                  onChange={(e) => onFiltersChange({ 
                    ...filters, 
                    sortOrder: e.target.value as 'asc' | 'desc', 
                    page: 1 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const PaginationControls = ({ 
  pagination, 
  onPageChange 
}: PaginationProps) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} devices
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pagination.page - 1)}
          disabled={!pagination.hasPreviousPage}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
            const page = Math.max(1, Math.min(pagination.totalPages - 4, pagination.page - 2)) + i;
            if (page > pagination.totalPages) return null;
            return (
              <Button
                key={page}
                variant={page === pagination.page ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page)}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            );
          })}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pagination.page + 1)}
          disabled={!pagination.hasNextPage}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default function Devices() {
  const [filters, setFilters] = useState<DeviceFilters>({
    page: 1,
    limit: PAGINATION_SIZE.MEDIUM,
    sortBy: 'created_at',
    sortOrder: 'desc',
  });
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { data: devicesResponse, isLoading, error } = useDevices(filters);
  const deleteDevice = useDeleteDevice();
  const { toast } = useToast();

  useEffect(() => {
    if (location.pathname === '/devices/new') {
      setShowAddDialog(true);
    }
  }, [location.pathname]);

  const handleDialogClose = (open: boolean) => {
    setShowAddDialog(open);
    if (!open && location.pathname === '/devices/new') {
      navigate('/devices');
    }
  };

  const handleDelete = async (id: string) => {
    const deviceToDelete = devicesResponse?.data.find(device => device.id === id);
    const deviceName = deviceToDelete?.name || 'Device';
    
    if (window.confirm(`Are you sure you want to delete ${deviceName}?`)) {
      try {
        await deleteDevice.mutateAsync(id);
        toast({
          title: "Device Deleted Successfully",
          description: `${deviceName} has been removed from your device list.`,
          variant: "success",
        });
      } catch (error) {
        console.error('Failed to delete device:', error);
        toast({
          title: "Failed to Delete Device",
          description: "There was an error deleting the device. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleEdit = (device: Device) => {
    setEditingDevice(device);
    setShowEditDialog(true);
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
  };

  const devices = devicesResponse?.data || [];
  const pagination = devicesResponse?.pagination;

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
          <p style={{ color: 'hsl(var(--destructive))' }}>Failed to load devices</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Devices</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your IoT devices and sensors</p>
        </div>
        <Button variant="outline" onClick={() => setShowAddDialog(true)} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Device
        </Button>
      </div>

      <FilterControls filters={filters} onFiltersChange={setFilters} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {devices.map((device) => (
          <DeviceCard key={device.id} device={device} onDelete={handleDelete} onEdit={handleEdit} />
        ))}
      </div>

      <PaginationControls pagination={pagination!} onPageChange={handlePageChange} />

      {devices.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Smartphone className="h-12 w-12 mx-auto mb-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
            <h3 className="text-lg font-medium mb-2" style={{ color: 'hsl(var(--foreground))' }}>No devices found</h3>
            <p className="mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {filters.search || filters.type || filters.location
                ? 'Try adjusting your search criteria or filters.'
                : 'Get started by adding your first IoT device.'
              }
            </p>
            {!filters.search && !filters.type && !filters.location && (
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Device
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      <AddDeviceDialog open={showAddDialog} onOpenChange={handleDialogClose} />
      <EditDeviceDialog open={showEditDialog} onOpenChange={setShowEditDialog} device={editingDevice} />
    </div>
  );
}
