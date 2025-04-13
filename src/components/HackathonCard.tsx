
import { Hackathon } from "@/types/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { MapPin, Calendar, Globe, Trophy } from "lucide-react";

interface HackathonCardProps {
  hackathon: Hackathon;
}

const HackathonCard = ({ hackathon }: HackathonCardProps) => {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        {hackathon.logo ? (
          <img
            src={hackathon.logo}
            alt={`${hackathon.title} logo`}
            className="rounded-md h-12 w-12 object-cover border"
          />
        ) : (
          <div className="h-12 w-12 bg-primary/10 rounded-md flex items-center justify-center">
            <Trophy className="h-6 w-6 text-primary" />
          </div>
        )}
        <div className="flex flex-col">
          <h3 className="font-semibold">{hackathon.title}</h3>
          <p className="text-sm text-muted-foreground">{hackathon.organizerName}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-2 mb-3">{hackathon.description}</p>

        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              {format(hackathon.startDate, "MMM d")} - {format(hackathon.endDate, "MMM d, yyyy")}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {hackathon.isOnline ? (
              <>
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span>Online</span>
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{hackathon.location}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          {hackathon.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <a
          href={hackathon.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 text-center text-sm text-primary hover:underline"
        >
          Visit Website
        </a>
      </CardContent>
    </Card>
  );
};

export default HackathonCard;
