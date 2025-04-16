
import { useProfiles } from "@/context/ProfilesContext";
import ProfileCard from "@/components/ProfileCard";
import ProfileFilter from "@/components/ProfileFilter";
import { Users } from "lucide-react";
import { useEffect } from "react";

const Profiles = () => {
  const { filteredProfiles, profiles, setFilterCriteria } = useProfiles();

  if(filteredProfiles.length<10) {
    console.log("filteredProfiles",filteredProfiles);
  }
  
  // Reset filters when component mounts to ensure all profiles are shown
  useEffect(() => {
    console.log("Profiles component mounted, resetting filters");
    setFilterCriteria({
      skills: [],
      location: '',
      hackathonInterests: '',
      searchTerm: ''
    });
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          Find Teammates
        </h1>
        <p className="text-muted-foreground">
          Discover potential teammates with the skills and interests you need
        </p>
        <p className="text-sm text-muted-foreground">
          Showing {filteredProfiles.length} of {profiles.length} profiles
        </p>
      </div>
      
      <ProfileFilter />
      
      {filteredProfiles.length === 0 || filteredProfiles.every(profile => profile.id === '0') ? (
         <div className="text-center py-10 border rounded-lg bg-muted/30">
         <h3 className="text-xl font-medium mb-2">No profiles match your filters</h3>
         <p className="text-muted-foreground">
           Try adjusting your search criteria or clear the filters
         </p>
       </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles .filter(profile => profile.id !== '0').map(profile => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Profiles;
