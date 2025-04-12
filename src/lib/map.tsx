import { Badge } from "~/components/ui/badge";

export const MapTemp = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  return (
    <div className="relative aspect-video overflow-hidden rounded-md border">
      <div className="bg-muted absolute inset-0">
        <iframe
          title="Property Location"
          width="100%"
          height="100%"
          src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
          className="absolute inset-0"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div className="absolute right-2 bottom-2">
        <Badge className="bg-background/80 backdrop-blur-sm">
          {latitude.toFixed(6)}, {longitude.toFixed(6)}
        </Badge>
      </div>
    </div>
  );
};
