
import { useProfiles } from "@/context/ProfilesContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, Filter, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const ProfileFilter = () => {
  const { 
    filterCriteria, 
    setFilterCriteria, 
    getAllSkills,
    getAllLocations,
    hackathons
  } = useProfiles();
  
  const allSkills = getAllSkills();
  const allLocations = getAllLocations();

  //console.log(allLocations, allSkills, hackathons);
  
  const handleSkillToggle = (skill: string) => {
    console.log(`Toggling skill: ${skill}`);
    const updatedSkills = filterCriteria.skills.includes(skill)
      ? filterCriteria.skills.filter(s => s !== skill)
      : [...filterCriteria.skills, skill];
      
      filterCriteria.skills = updatedSkills
      setFilterCriteria(filterCriteria);
    
  };
  
  const handleLocationChange = (location: string) => {
    setFilterCriteria({
      ...filterCriteria,
      location
    });
  };
  
  const handleHackathonChange = (hackathonId: string) => {
    const hackathon = hackathons.find(h => h.id === hackathonId);
    
    setFilterCriteria({
      ...filterCriteria,
      hackathonInterests: hackathon ? hackathon.title : ''
    });
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterCriteria({
      ...filterCriteria,
      searchTerm: e.target.value
    });
  };
  
  const clearFilters = () => {
    console.log("Clearing all filters");
    setFilterCriteria({
      skills: [],
      location: "",
      hackathonInterests: "",
      searchTerm: ""
    });
  };
  
  const hasActiveFilters = filterCriteria.skills.length > 0 || 
    filterCriteria.location || 
    filterCriteria.hackathonInterests || 
    filterCriteria.searchTerm;
  
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-end mb-4">
        <div className="flex-1">
          <Label htmlFor="search" className="mb-2 block">
            Search by name or bio
          </Label>
          <Input
            id="search"
            placeholder="Search for teammates..."
            value={filterCriteria.searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="w-full md:w-64">
          <Label htmlFor="location-select" className="mb-2 block">
            Location
          </Label>
          <Select 
            value={filterCriteria.location || "_any"} 
            onValueChange={handleLocationChange}
          >
            <SelectTrigger id="location-select">
              <SelectValue placeholder="Any location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_any">Any location</SelectItem>
              {allLocations.map(location => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-64">
          <Label htmlFor="hackathon-select" className="mb-2 block">
            Hackathon Interest
          </Label>
          <Select 
            value={filterCriteria.hackathonInterests ? 
              hackathons.find(h => h.title === filterCriteria.hackathonInterests)?.id || "_any" : 
              "_any"} 
            onValueChange={handleHackathonChange}
          >
            <SelectTrigger id="hackathon-select">
              <SelectValue placeholder="Any hackathon" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_any">Any hackathon</SelectItem>
              {hackathons.map(hackathon => (
                <SelectItem key={hackathon.id} value={hackathon.title}>
                  {hackathon.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Skills</span>
              {filterCriteria.skills.length > 0 && (
                <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-primary-foreground">
                  {filterCriteria.skills.length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium">Filter by skills</h4>
              <div className="border rounded-md p-1">
                <div className="max-h-[200px] overflow-y-auto space-y-1">
                  {allSkills.map(skill => (
                    <label
                      key={skill}
                      className="flex items-center space-x-2 p-2 hover:bg-muted rounded-sm"
                    >
                      <Checkbox
                        checked={filterCriteria.skills.includes(skill)}
                        onCheckedChange={() => handleSkillToggle(skill)}
                        id={`skill-${skill}`}
                      />
                      <span className="text-sm">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            className="gap-1 text-muted-foreground" 
            onClick={clearFilters}
          >
            <X className="h-4 w-4" />
            Clear filters
          </Button>
        )}
      </div>
      
      {filterCriteria.skills.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {filterCriteria.skills.map(skill => (
            <div 
              key={skill}
              className="flex items-center gap-1 bg-primary/10 text-primary text-xs rounded-full px-2 py-1"
            >
              <span>{skill}</span>
              <button
                onClick={() => handleSkillToggle(skill)}
                className="h-3 w-3 rounded-full hover:bg-primary/20"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileFilter;
