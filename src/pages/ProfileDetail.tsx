
import { useParams, Link } from "react-router-dom";
import { useProfiles } from "@/context/ProfilesContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Github, Linkedin, Mail, MessageSquare } from "lucide-react";

const ProfileDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getProfileById, getSkillColor } = useProfiles();
  
  const profile = id ? getProfileById(id) : null;
  
  if (!profile) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-3">Profile Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The profile you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/profiles">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profiles
          </Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div className="flex items-center space-x-2">
        <Button asChild variant="ghost" size="sm">
          <Link to="/profiles">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Profiles
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={profile.avatar}
              alt={`${profile.name}'s avatar`}
              className="rounded-lg h-32 w-32 object-cover"
            />
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{profile.name}</h1>
                  <p className="text-muted-foreground">{profile.location}</p>
                </div>
                
                <Button asChild>
                  <Link to={`/messages?to=${profile.id}`} className="flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message
                  </Link>
                </Button>
              </div>
              
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">About</h2>
                <p className="text-muted-foreground">{profile.bio}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div>
              <h2 className="text-lg font-semibold mb-3">Skills</h2>
              <div className="flex flex-wrap">
                {profile.skills.map((skill) => (
                  <span key={skill} className={`skill-tag ${getSkillColor(skill)}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-3">Hackathon Interests</h2>
              {profile.hackathonInterests.length > 0 ? (
                <ul className="space-y-1">
                  {profile.hackathonInterests.map((hackathon) => (
                    <li key={hackathon} className="text-muted-foreground">
                      • {hackathon}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No hackathon interests listed</p>
              )}
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-3">Contact</h2>
              <div className="space-y-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                  {profile.email}
                </a>
                
                {profile.github && (
                  <a
                    href={`https://github.com/${profile.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                  >
                    <Github className="h-4 w-4" />
                    {profile.github}
                  </a>
                )}
                
                {profile.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${profile.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                  >
                    <Linkedin className="h-4 w-4" />
                    {profile.linkedin}
                  </a>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDetail;
