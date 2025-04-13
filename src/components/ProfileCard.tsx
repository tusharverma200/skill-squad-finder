
import { Link } from "react-router-dom";
import { Profile } from "@/types/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useProfiles } from "@/context/ProfilesContext";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface ProfileCardProps {
  profile: Profile;
  showActions?: boolean;
}

const ProfileCard = ({ profile, showActions = true }: ProfileCardProps) => {
  const { getSkillColor } = useProfiles();

  return (
    <Card className="h-full hover:shadow-md transition-shadow animate-fade-in">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <img 
          src={profile.avatar} 
          alt={`${profile.name}'s avatar`}
          className="rounded-full h-12 w-12 object-cover border"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{profile.name}</h3>
          <p className="text-sm text-muted-foreground">{profile.location}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-2 mb-3">{profile.bio}</p>
        
        <div className="flex flex-wrap mb-4">
          {profile.skills.slice(0, 4).map((skill) => (
            <span key={skill} className={`skill-tag ${getSkillColor(skill)}`}>
              {skill}
            </span>
          ))}
          {profile.skills.length > 4 && (
            <span className="text-xs text-muted-foreground mt-1 ml-1">
              +{profile.skills.length - 4} more
            </span>
          )}
        </div>
        
        {profile.hackathonInterests.length > 0 && (
          <div className="mt-2">
            <p className="text-xs font-medium text-muted-foreground mb-1">
              Hackathon Interests:
            </p>
            <p className="text-xs line-clamp-1">
              {profile.hackathonInterests.join(", ")}
            </p>
          </div>
        )}
        
        {showActions && (
          <div className="flex mt-4 pt-2 border-t gap-2">
            <Button asChild variant="outline" className="flex-1">
              <Link to={`/profiles/${profile.id}`}>
                View Profile
              </Link>
            </Button>
            <Button asChild variant="default" size="icon" className="flex-none">
              <Link to={`/messages?to=${profile.id}`}>
                <MessageSquare className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
