
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { LogIn, UserPlus, Users, Award, MessageSquare } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Find Your Perfect Hackathon Team
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect with talented developers, designers, and innovators to build amazing projects together.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          {user ? (
            <Button asChild size="lg">
              <Link to="/profiles">
                <Users className="mr-2 h-4 w-4" />
                Browse Profiles
              </Link>
            </Button>
          ) : (
            <>
              <Button asChild size="lg">
                <Link to="/auth/signin">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/auth/signup">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Account
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-card rounded-lg p-6 border shadow-sm">
          <Users className="h-10 w-10 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Find Teammates</h3>
          <p className="text-muted-foreground">
            Discover skilled teammates with the expertise you need for your next project or hackathon.
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 border shadow-sm">
          <MessageSquare className="h-10 w-10 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Connect Directly</h3>
          <p className="text-muted-foreground">
            Message potential teammates and discuss your ideas, skills, and project goals.
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 border shadow-sm">
          <Award className="h-10 w-10 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Join Hackathons</h3>
          <p className="text-muted-foreground">
            Find upcoming hackathons and build the perfect team to compete and win.
          </p>
        </div>
      </div>

      {user && (
        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/create-profile">
              <UserPlus className="mr-2 h-4 w-4" />
              Create Your Profile
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;
