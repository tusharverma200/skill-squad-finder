
import { Link } from "react-router-dom";
import { useProfiles } from "@/context/ProfilesContext";
import { Button } from "@/components/ui/button";
import ProfileCard from "@/components/ProfileCard";
import HackathonCard from "@/components/HackathonCard";
import { ArrowRight, Search, Users, Calendar } from "lucide-react";

const Index = () => {
  const { profiles, hackathons } = useProfiles();
  
  // Get the most recent profiles
  const recentProfiles = profiles.slice(0, 3);
  
  // Get the upcoming hackathons
  const upcomingHackathons = [...hackathons]
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    .filter(hackathon => hackathon.startDate > new Date())
    .slice(0, 3);
  
  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-10 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find Your Perfect Hackathon Team
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Connect with skilled developers, designers, and creators to build winning projects together.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/profiles">
              <Search className="mr-2 h-4 w-4" />
              Find Teammates
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/create-profile">
              Create Your Profile
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Recent Profiles */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Recent Profiles
            </h2>
            <p className="text-muted-foreground">
              Connect with talented individuals for your next hackathon
            </p>
          </div>
          <Button asChild variant="ghost" className="gap-1">
            <Link to="/profiles">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProfiles.map(profile => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </section>
      
      {/* Upcoming Hackathons */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Hackathons
            </h2>
            <p className="text-muted-foreground">
              Discover hackathons to participate in and build your team
            </p>
          </div>
          <Button asChild variant="ghost" className="gap-1">
            <Link to="/hackathons">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingHackathons.map(hackathon => (
            <HackathonCard key={hackathon.id} hackathon={hackathon} />
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary/5 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to find your squad?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Create your profile today and start connecting with other talented individuals for your next hackathon.
        </p>
        <Button asChild size="lg">
          <Link to="/create-profile">
            Create Your Profile
          </Link>
        </Button>
      </section>
    </div>
  );
};

export default Index;
