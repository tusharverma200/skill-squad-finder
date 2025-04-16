import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfiles } from "@/context/ProfilesContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, UserCog, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Profile } from "@/types/types";

const CreateProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { hackathons} = useProfiles();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  useEffect(() => {
   
   const storedProfile = localStorage.getItem("profile");
    const isEditingStored = localStorage.getItem("isEditing");
    const isSubmittingStored = localStorage.getItem("isSubmitting");

    // if (isEditingStored) {
    //   setIsEditing(JSON.parse(isEditingStored));
    // }
    // if (isSubmittingStored) {
    //   setIsSubmitting(JSON.parse(isSubmittingStored));
    // }

    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile) as Profile;
      setName(parsedProfile.name);
      setBio(parsedProfile.bio);
      setLocation(parsedProfile.location);
      setEmail(parsedProfile.email);
      setSkills(parsedProfile.skills || []);
      setHackathonInterests(parsedProfile.hackathonInterests || []);
      setGithub(parsedProfile.github || "");
      setLinkedin(parsedProfile.linkedin || "");
    
    }
  }, []);


  
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !bio || !location || !email || skills.length === 0) {
      setError("Please fill in all required fields and add at least one skill.");
      return;
    }
    
    setIsSubmitting(true);
    setIsEditing(true);
    try {
     // const userId = user?.id || (name ? name.id : `user-${Date.now()}`);
      
      const profileData = {
        id: Date.now().toString(),
        name,
        bio,
        skills,
        location,
        hackathonInterests,
        email,
        github: github || undefined,
        linkedin: linkedin || undefined
      };
      
      localStorage.setItem("profile", JSON.stringify(profileData));
      localStorage.setItem("isEditing", JSON.stringify(isEditing));
      localStorage.setItem("isSubmitting", JSON.stringify(isSubmitting));
    //  await addProfile(profileData);
      
      toast({
        title: isEditing ? "Profile updated!" : "Profile created!",
        description: isEditing 
          ? "Your profile has been successfully updated."
          : "Your profile has been successfully created.",
      });
      
      navigate("/profiles");
    } catch (error) {
      console.error("Error saving profile:", error);
      setError("Failed to save profile. Please try again.");
    } finally {
      setIsSubmitting(true);
    }
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
                {name ? "Your Profile" : "Create Your Profile"}
              </>
            )}
          </h1>
          <p className="text-muted-foreground">
            {isEditing 
              ? "Update your information to better connect with potential teammates" 
              : "Share your skills and interests to connect with potential teammates"}
          </p>
        </div>
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
              disabled={isEditing && name !== null}
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
              disabled={isEditing && name !== null}
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
            disabled={isEditing && name !== null}
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
              disabled={isEditing && name !== null}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (!isEditing && name !== null) return;
                  handleAddSkill();
                }
              }}
            />
            <Button 
              type="button" 
              onClick={handleAddSkill} 
              disabled={(isEditing && name !== null) || !currentSkill.trim()}
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
                  {(isEditing || !name) && (
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
                } ${(isEditing && name !== null) ? 'opacity-80 cursor-default' : 'cursor-pointer'}`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={hackathonInterests.includes(hackathon.title)}
                  onChange={() => (!isEditing || !name) && toggleHackathonInterest(hackathon.title)}
                  disabled={isEditing && name !== null}
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
                disabled={isEditing && name !== null}
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
                disabled={isEditing && name !== null}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn Username (optional)</Label>
              <Input
                id="linkedin"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="Your LinkedIn username"
                disabled={isEditing && name !== null}
              />
            </div>
          </div>
        </div>
        
     
          <div className="pt-4">
            <Button 
              type="submit" 
              size="lg" 
              className="w-full sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : (
                name ? "Update Profile" : "Create Profile"
              )}
            </Button>
          </div>
   
      </form>
    </div>
  );
};

export default CreateProfile;
