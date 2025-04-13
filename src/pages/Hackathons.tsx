
import { useState } from "react";
import { useProfiles } from "@/context/ProfilesContext";
import { Calendar, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HackathonCard from "@/components/HackathonCard";

const Hackathons = () => {
  const { hackathons } = useProfiles();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [locationType, setLocationType] = useState("all");
  
  // Filter hackathons based on search term and location type
  const filteredHackathons = hackathons.filter(hackathon => {
    const matchesSearch = 
      hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hackathon.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hackathon.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocationType = 
      locationType === "all" ||
      (locationType === "online" && hackathon.isOnline) ||
      (locationType === "onsite" && !hackathon.isOnline);
    
    return matchesSearch && matchesLocationType;
  });
  
  // Separate upcoming and past hackathons
  const today = new Date();
  const upcomingHackathons = filteredHackathons.filter(
    hackathon => hackathon.startDate > today
  );
  const pastHackathons = filteredHackathons.filter(
    hackathon => hackathon.startDate <= today
  );
  
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          Hackathons
        </h1>
        <p className="text-muted-foreground">
          Discover hackathons to participate in and build your team
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search hackathons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="sm:w-48 flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={locationType} onValueChange={setLocationType}>
            <SelectTrigger>
              <SelectValue placeholder="Location Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="online">Online Only</SelectItem>
              <SelectItem value="onsite">In-Person Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="upcoming" className="mt-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcomingHackathons.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastHackathons.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-6">
          {upcomingHackathons.length === 0 ? (
            <div className="text-center py-10 border rounded-lg bg-muted/30">
              <h3 className="text-xl font-medium mb-2">No upcoming hackathons found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or check back later
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingHackathons.map(hackathon => (
                <HackathonCard key={hackathon.id} hackathon={hackathon} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="mt-6">
          {pastHackathons.length === 0 ? (
            <div className="text-center py-10 border rounded-lg bg-muted/30">
              <h3 className="text-xl font-medium mb-2">No past hackathons found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastHackathons.map(hackathon => (
                <HackathonCard key={hackathon.id} hackathon={hackathon} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Hackathons;
