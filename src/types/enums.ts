// Device Types
export const DEVICE_TYPES = {
  TEMPERATURE: "temperature",
  HUMIDITY: "humidity",
  PRESSURE: "pressure",
  MOTION: "motion",
  LIGHT: "light",
  VOLTAGE: "voltage",
  CURRENT: "current",
  AIR_QUALITY: "air_quality",
  SMOKE: "smoke",
  WATER_LEVEL: "water_level",
  DOOR_SENSOR: "door_sensor",
  WINDOW_SENSOR: "window_sensor",
  CARBON_MONOXIDE: "carbon_monoxide",
  NOISE: "noise",
  VIBRATION: "vibration"
} as const;

export const DEVICE_TYPE_LABELS = {
  TEMPERATURE: "Temperature Sensor",
  HUMIDITY: "Humidity Sensor",
  PRESSURE: "Pressure Sensor",
  MOTION: "Motion Sensor",
  LIGHT: "Light Sensor",
  VOLTAGE: "Voltage Sensor",
  CURRENT: "Current Sensor",
  AIR_QUALITY: "Air Quality Sensor",
  SMOKE: "Smoke Detector",
  WATER_LEVEL: "Water Level Sensor",
  DOOR_SENSOR: "Door Sensor",
  WINDOW_SENSOR: "Window Sensor",
  CARBON_MONOXIDE: "Carbon Monoxide Detector",
  NOISE: "Noise Sensor",
  VIBRATION: "Vibration Sensor"
} as const;

export const DEVICE_TYPE_ICONS = {
  TEMPERATURE: "thermometer-half",
  HUMIDITY: "tint",
  PRESSURE: "compress",
  MOTION: "walking",
  LIGHT: "lightbulb",
  VOLTAGE: "bolt",
  CURRENT: "flash",
  AIR_QUALITY: "wind",
  SMOKE: "smoke",
  WATER_LEVEL: "water",
  DOOR_SENSOR: "door-open",
  WINDOW_SENSOR: "window-maximize",
  CARBON_MONOXIDE: "skull-crossbones",
  NOISE: "volume-up",
  VIBRATION: "mobile-alt"
} as const;

// Locations
export const LOCATIONS = {
  LIVING_ROOM: "living_room",
  KITCHEN: "kitchen",
  BEDROOM: "bedroom",
  BATHROOM: "bathroom",
  GARAGE: "garage",
  BASEMENT: "basement",
  ATTIC: "attic",
  HALLWAY: "hallway",
  DINING_ROOM: "dining_room",
  OFFICE: "office",
  GARDEN: "garden",
  BALCONY: "balcony",
  LAUNDRY_ROOM: "laundry_room",
  STORAGE_ROOM: "storage_room",
  OUTDOOR: "outdoor",
  ROOFTOP: "rooftop",
  POOL_AREA: "pool_area",
  GYM: "gym",
  LIBRARY: "library",
  GUEST_ROOM: "guest_room"
} as const;

export const LOCATION_LABELS = {
  LIVING_ROOM: "Living Room",
  KITCHEN: "Kitchen",
  BEDROOM: "Bedroom",
  BATHROOM: "Bathroom",
  GARAGE: "Garage",
  BASEMENT: "Basement",
  ATTIC: "Attic",
  HALLWAY: "Hallway",
  DINING_ROOM: "Dining Room",
  OFFICE: "Office",
  GARDEN: "Garden",
  BALCONY: "Balcony",
  LAUNDRY_ROOM: "Laundry Room",
  STORAGE_ROOM: "Storage Room",
  OUTDOOR: "Outdoor",
  ROOFTOP: "Rooftop",
  POOL_AREA: "Pool Area",
  GYM: "Gym",
  LIBRARY: "Library",
  GUEST_ROOM: "Guest Room"
} as const;

// Device Status
export const DEVICE_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  MAINTENANCE: "maintenance",
  ERROR: "error",
  OFFLINE: "offline"
} as const;

export const DEVICE_STATUS_LABELS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  MAINTENANCE: "Maintenance",
  ERROR: "Error",
  OFFLINE: "Offline"
} as const;

export const DEVICE_STATUS_COLORS = {
  ACTIVE: "#28a745",
  INACTIVE: "#6c757d",
  MAINTENANCE: "#ffc107",
  ERROR: "#dc3545",
  OFFLINE: "#6c757d"
} as const;

// Measurement Units
export const MEASUREMENT_UNITS = {
  TEMPERATURE: "°C",
  HUMIDITY: "%",
  PRESSURE: "hPa",
  VOLTAGE: "V",
  CURRENT: "A",
  LIGHT: "lux",
  AIR_QUALITY: "AQI",
  WATER_LEVEL: "cm",
  NOISE: "dB",
  VIBRATION: "Hz",
  MOTION: "detected",
  SMOKE: "ppm",
  CARBON_MONOXIDE: "ppm",
  DOOR_SENSOR: "open/closed",
  WINDOW_SENSOR: "open/closed"
} as const;

// Chart Types
export const CHART_TYPES = {
  LINE: "line",
  BAR: "bar",
  PIE: "pie",
  AREA: "area",
  SCATTER: "scatter",
  GAUGE: "gauge",
  HEATMAP: "heatmap"
} as const;

// Time Ranges
export const TIME_RANGES = {
  LAST_HOUR: "last_hour",
  LAST_6_HOURS: "last_6_hours",
  LAST_24_HOURS: "last_24_hours",
  LAST_7_DAYS: "last_7_days",
  LAST_30_DAYS: "last_30_days",
  LAST_3_MONTHS: "last_3_months",
  LAST_YEAR: "last_year",
  CUSTOM: "custom"
} as const;

export const TIME_RANGE_LABELS = {
  LAST_HOUR: "Last Hour",
  LAST_6_HOURS: "Last 6 Hours",
  LAST_24_HOURS: "Last 24 Hours",
  LAST_7_DAYS: "Last 7 Days",
  LAST_30_DAYS: "Last 30 Days",
  LAST_3_MONTHS: "Last 3 Months",
  LAST_YEAR: "Last Year",
  CUSTOM: "Custom Range"
} as const;

// Alert Severity
export const ALERT_SEVERITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  CRITICAL: "critical"
} as const;

export const ALERT_SEVERITY_LABELS = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical"
} as const;

export const ALERT_SEVERITY_COLORS = {
  LOW: "#17a2b8",
  MEDIUM: "#ffc107",
  HIGH: "#fd7e14",
  CRITICAL: "#dc3545"
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error"
} as const;

// Widget Types
export const WIDGET_TYPES = {
  CHART: "chart",
  METRIC: "metric",
  TABLE: "table",
  GAUGE: "gauge",
  ALERT: "alert",
  MAP: "map"
} as const;

// API Status
export const API_STATUS = {
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading"
} as const;

// Sort Order
export const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc"
} as const;

export const SORT_ORDER_LABELS = {
  ASC: "Ascending",
  DESC: "Descending"
} as const;

// Pagination Size
export const PAGINATION_SIZE = {
  SMALL: 10,
  MEDIUM: 25,
  LARGE: 50,
  EXTRA_LARGE: 100
} as const;

export const PAGINATION_SIZE_LABELS = {
  SMALL: "10 per page",
  MEDIUM: "25 per page",
  LARGE: "50 per page",
  EXTRA_LARGE: "100 per page"
} as const;

// Theme Types
export const THEME_TYPES = {
  LIGHT: "light",
  DARK: "dark",
  AUTO: "auto"
} as const;

// Languages
export const LANGUAGES = {
  EN: "en",
  ES: "es",
  FR: "fr",
  DE: "de",
  IT: "it",
  PT: "pt",
  RU: "ru",
  ZH: "zh",
  JA: "ja",
  KO: "ko"
} as const;

export const LANGUAGE_LABELS = {
  EN: "English",
  ES: "Español",
  FR: "Français",
  DE: "Deutsch",
  IT: "Italiano",
  PT: "Português",
  RU: "Русский",
  ZH: "中文",
  JA: "日本語",
  KO: "한국어"
} as const;

// Type definitions for better TypeScript support
export type DeviceType = typeof DEVICE_TYPES[keyof typeof DEVICE_TYPES];
export type DeviceTypeLabel = typeof DEVICE_TYPE_LABELS[keyof typeof DEVICE_TYPE_LABELS];
export type DeviceTypeIcon = typeof DEVICE_TYPE_ICONS[keyof typeof DEVICE_TYPE_ICONS];

export type Location = typeof LOCATIONS[keyof typeof LOCATIONS];
export type LocationLabel = typeof LOCATION_LABELS[keyof typeof LOCATION_LABELS];

export type DeviceStatus = typeof DEVICE_STATUS[keyof typeof DEVICE_STATUS];
export type DeviceStatusLabel = typeof DEVICE_STATUS_LABELS[keyof typeof DEVICE_STATUS_LABELS];
export type DeviceStatusColor = typeof DEVICE_STATUS_COLORS[keyof typeof DEVICE_STATUS_COLORS];

export type MeasurementUnit = typeof MEASUREMENT_UNITS[keyof typeof MEASUREMENT_UNITS];
export type ChartType = typeof CHART_TYPES[keyof typeof CHART_TYPES];
export type TimeRange = typeof TIME_RANGES[keyof typeof TIME_RANGES];
export type TimeRangeLabel = typeof TIME_RANGE_LABELS[keyof typeof TIME_RANGE_LABELS];

export type AlertSeverity = typeof ALERT_SEVERITY[keyof typeof ALERT_SEVERITY];
export type AlertSeverityLabel = typeof ALERT_SEVERITY_LABELS[keyof typeof ALERT_SEVERITY_LABELS];
export type AlertSeverityColor = typeof ALERT_SEVERITY_COLORS[keyof typeof ALERT_SEVERITY_COLORS];

export type NotificationType = typeof NOTIFICATION_TYPES[keyof typeof NOTIFICATION_TYPES];
export type WidgetType = typeof WIDGET_TYPES[keyof typeof WIDGET_TYPES];
export type ApiStatus = typeof API_STATUS[keyof typeof API_STATUS];
export type SortOrder = typeof SORT_ORDER[keyof typeof SORT_ORDER];
export type SortOrderLabel = typeof SORT_ORDER_LABELS[keyof typeof SORT_ORDER_LABELS];
export type PaginationSize = typeof PAGINATION_SIZE[keyof typeof PAGINATION_SIZE];
export type PaginationSizeLabel = typeof PAGINATION_SIZE_LABELS[keyof typeof PAGINATION_SIZE_LABELS];
export type ThemeType = typeof THEME_TYPES[keyof typeof THEME_TYPES];
export type Language = typeof LANGUAGES[keyof typeof LANGUAGES];
export type LanguageLabel = typeof LANGUAGE_LABELS[keyof typeof LANGUAGE_LABELS];

// Helper functions
export const getDeviceTypeLabel = (type: string): string => {
  const key = Object.keys(DEVICE_TYPES).find(k => DEVICE_TYPES[k as keyof typeof DEVICE_TYPES] === type);
  return key ? DEVICE_TYPE_LABELS[key as keyof typeof DEVICE_TYPE_LABELS] : type;
};

export const getDeviceTypeIcon = (type: string): string => {
  const key = Object.keys(DEVICE_TYPES).find(k => DEVICE_TYPES[k as keyof typeof DEVICE_TYPES] === type);
  return key ? DEVICE_TYPE_ICONS[key as keyof typeof DEVICE_TYPE_ICONS] : "smartphone";
};

export const getLocationLabel = (location: string): string => {
  const key = Object.keys(LOCATIONS).find(k => LOCATIONS[k as keyof typeof LOCATIONS] === location);
  return key ? LOCATION_LABELS[key as keyof typeof LOCATION_LABELS] : location;
};

export const getDeviceStatusLabel = (status: string): string => {
  const key = Object.keys(DEVICE_STATUS).find(k => DEVICE_STATUS[k as keyof typeof DEVICE_STATUS] === status);
  return key ? DEVICE_STATUS_LABELS[key as keyof typeof DEVICE_STATUS_LABELS] : status;
};

export const getDeviceStatusColor = (status: string): string => {
  const key = Object.keys(DEVICE_STATUS).find(k => DEVICE_STATUS[k as keyof typeof DEVICE_STATUS] === status);
  return key ? DEVICE_STATUS_COLORS[key as keyof typeof DEVICE_STATUS_COLORS] : "#6c757d";
};

export const getMeasurementUnit = (sensorType: string): string => {
  const key = Object.keys(MEASUREMENT_UNITS).find(k => k.toLowerCase() === sensorType.toLowerCase());
  return key ? MEASUREMENT_UNITS[key as keyof typeof MEASUREMENT_UNITS] : "";
};

export const getTimeRangeLabel = (timeRange: string): string => {
  const key = Object.keys(TIME_RANGES).find(k => TIME_RANGES[k as keyof typeof TIME_RANGES] === timeRange);
  return key ? TIME_RANGE_LABELS[key as keyof typeof TIME_RANGE_LABELS] : timeRange;
};

export const getAlertSeverityLabel = (severity: string): string => {
  const key = Object.keys(ALERT_SEVERITY).find(k => ALERT_SEVERITY[k as keyof typeof ALERT_SEVERITY] === severity);
  return key ? ALERT_SEVERITY_LABELS[key as keyof typeof ALERT_SEVERITY_LABELS] : severity;
};

export const getAlertSeverityColor = (severity: string): string => {
  const key = Object.keys(ALERT_SEVERITY).find(k => ALERT_SEVERITY[k as keyof typeof ALERT_SEVERITY] === severity);
  return key ? ALERT_SEVERITY_COLORS[key as keyof typeof ALERT_SEVERITY_COLORS] : "#6c757d";
};

export const getSortOrderLabel = (order: string): string => {
  const key = Object.keys(SORT_ORDER).find(k => SORT_ORDER[k as keyof typeof SORT_ORDER] === order);
  return key ? SORT_ORDER_LABELS[key as keyof typeof SORT_ORDER_LABELS] : order;
};

export const getPaginationSizeLabel = (size: number): string => {
  const key = Object.keys(PAGINATION_SIZE).find(k => PAGINATION_SIZE[k as keyof typeof PAGINATION_SIZE] === size);
  return key ? PAGINATION_SIZE_LABELS[key as keyof typeof PAGINATION_SIZE_LABELS] : `${size} per page`;
};

export const getLanguageLabel = (language: string): string => {
  const key = Object.keys(LANGUAGES).find(k => LANGUAGES[k as keyof typeof LANGUAGES] === language);
  return key ? LANGUAGE_LABELS[key as keyof typeof LANGUAGE_LABELS] : language;
};
