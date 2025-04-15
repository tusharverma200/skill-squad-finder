
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfiles } from "@/context/ProfilesContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, UserCog, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Profile } from "@/types/types";

const CreateProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addProfile, hackathons, profiles, currentUser } = useProfiles();
  const { user } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [hackathonInterests, setHackathonInterests] = useState<string[]>([]);
  
  const [error, setError] = useState<string | null>(null);

  // Find existing profile for the current user
  useEffect(() => {
    if (user) {
      const existingProfile = profiles.find(p => 
        // In a real app, this would match user.id with profile.id
        // For this demo, we'll use the currentUser from the context
        currentUser && p.id === currentUser.id
      );

      if (existingProfile) {
        // Set form fields with existing profile data
        setName(existingProfile.name);
        setBio(existingProfile.bio);
        setLocation(existingProfile.location);
        setEmail(existingProfile.email);
        setGithub(existingProfile.github || "");
        setLinkedin(existingProfile.linkedin || "");
        setSkills([...existingProfile.skills]);
        setHackathonInterests([...existingProfile.hackathonInterests]);
      }
    }
  }, [user, profiles, currentUser]);
  
  const handleAddSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };
  
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };
  
  const toggleHackathonInterest = (hackathonTitle: string) => {
    if (hackathonInterests.includes(hackathonTitle)) {
      setHackathonInterests(
        hackathonInterests.filter(title => title !== hackathonTitle)
      );
    } else {
      setHackathonInterests([...hackathonInterests, hackathonTitle]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !bio || !location || !email || skills.length === 0) {
      setError("Please fill in all required fields and add at least one skill.");
      return;
    }
    
    const profileData: Omit<Profile, 'id'> = {
      name,
      avatar: currentUser?.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      bio,
      skills,
      location,
      hackathonInterests,
      email,
      github: github || undefined,
      linkedin: linkedin || undefined
    };
    
    if (isEditing && currentUser) {
      // Update existing profile
      addProfile({ ...profileData, id: currentUser.id });
      toast({
        title: "Profile updated!",
        description: "Your profile has been successfully updated.",
      });
    } else {
      // Create new profile
      addProfile({ ...profileData, id: `user-${Date.now()}` });
      toast({
        title: "Profile created!",
        description: "Your profile has been successfully created.",
      });
    }
    
    navigate("/profiles");
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };
  
  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            {isEditing ? (
              <>
                <UserCog className="h-6 w-6 text-primary" />
                Edit Your Profile
              </>
            ) : (
              <>
                <UserPlus className="h-6 w-6 text-primary" />
                {currentUser ? "Your Profile" : "Create Your Profile"}
              </>
            )}
          </h1>
          <p className="text-muted-foreground">
            {isEditing 
              ? "Update your information to better connect with potential teammates" 
              : "Share your skills and interests to connect with potential teammates"}
          </p>
        </div>
        
        {currentUser && (
          <Button 
            onClick={toggleEditMode} 
            variant={isEditing ? "outline" : "secondary"}
          >
            {isEditing ? "Cancel Editing" : "Edit Profile"}
          </Button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              disabled={!isEditing && currentUser !== null}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, Country or Remote"
              disabled={!isEditing && currentUser !== null}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bio">Bio *</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell others about yourself, your experience, and what you're looking for in a hackathon team"
            className="min-h-[120px]"
            disabled={!isEditing && currentUser !== null}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="skills">Skills *</Label>
          <div className="flex gap-2">
            <Input
              id="skills"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              placeholder="Add your technical skills"
              disabled={!isEditing && currentUser !== null}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (!isEditing && currentUser !== null) return;
                  handleAddSkill();
                }
              }}
            />
            <Button 
              type="button" 
              onClick={handleAddSkill} 
              disabled={(!isEditing && currentUser !== null) || !currentSkill.trim()}
            >
              Add
            </Button>
          </div>
          
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map(skill => (
                <div
                  key={skill}
                  className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center gap-1"
                >
                  <span>{skill}</span>
                  {(isEditing || !currentUser) && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:bg-primary/20 rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <Label>Hackathon Interests</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {hackathons.map(hackathon => (
              <label
                key={hackathon.id}
                className={`flex items-center p-3 rounded-md border ${
                  hackathonInterests.includes(hackathon.title)
                    ? 'border-primary bg-primary/5'
                    : 'hover:bg-muted/50'
                } ${(!isEditing && currentUser !== null) ? 'opacity-80 cursor-default' : 'cursor-pointer'}`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={hackathonInterests.includes(hackathon.title)}
                  onChange={() => (isEditing || !currentUser) && toggleHackathonInterest(hackathon.title)}
                  disabled={!isEditing && currentUser !== null}
                />
                <span className="text-sm">{hackathon.title}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                disabled={!isEditing && currentUser !== null}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="github">GitHub Username (optional)</Label>
              <Input
                id="github"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="Your GitHub username"
                disabled={!isEditing && currentUser !== null}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn Username (optional)</Label>
              <Input
                id="linkedin"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="Your LinkedIn username"
                disabled={!isEditing && currentUser !== null}
              />
            </div>
          </div>
        </div>
        
        {(isEditing || !currentUser) && (
          <div className="pt-4">
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              {isEditing ? "Update Profile" : "Create Profile"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateProfile;
