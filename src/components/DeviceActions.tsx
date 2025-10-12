import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2 
} from 'lucide-react';

interface DeviceActionsProps {
  deviceId: string;
  onDelete: (id: string) => void;
  onEdit: () => void;
}

export function DeviceActions({ deviceId, onDelete, onEdit }: DeviceActionsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          aria-label="Device actions menu"
        >
          <MoreVertical className="h-4 w-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="end" side="bottom">
        <div className="space-y-1">
          <Button 
            variant="outline" 
            size="sm" 
            asChild 
            className="w-full justify-start hover:bg-accent"
          >
            <Link to={`/devices/${deviceId}`}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Link>
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={onEdit}
            className="w-full justify-start hover:bg-accent"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Device
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => onDelete(deviceId)}
            className="w-full justify-start hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Device
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
