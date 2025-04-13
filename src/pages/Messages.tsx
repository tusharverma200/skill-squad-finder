
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useProfiles } from "@/context/ProfilesContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Users } from "lucide-react";
import ConversationList from "@/components/ConversationList";
import MessageThread from "@/components/MessageThread";
import { Link } from "react-router-dom";

const Messages = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialProfileId = searchParams.get("to") || undefined;
  
  const [activeProfileId, setActiveProfileId] = useState<string | undefined>(initialProfileId);
  const { conversations, getProfileById } = useProfiles();
  
  // Update active profile ID when URL changes
  useEffect(() => {
    const profileId = searchParams.get("to") || undefined;
    setActiveProfileId(profileId);
  }, [location.search]);
  
  // Check if the activeProfileId exists
  const activeProfileExists = activeProfileId && getProfileById(activeProfileId);
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="space-y-1 mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          Messages
        </h1>
        <p className="text-muted-foreground">
          Connect and chat with potential teammates
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 border rounded-md overflow-hidden">
          <div className="bg-muted/30 p-3 border-b">
            <h2 className="font-medium">Conversations</h2>
          </div>
          <ScrollArea className="h-[600px]">
            <ConversationList activeProfileId={activeProfileId} />
          </ScrollArea>
        </div>
        
        <div className="lg:col-span-2 border rounded-md overflow-hidden">
          {activeProfileExists ? (
            <MessageThread profileId={activeProfileId} />
          ) : (
            <div className="flex flex-col items-center justify-center h-[600px] text-center px-4">
              <MessageSquare className="h-10 w-10 text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">No Conversation Selected</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                {conversations.length > 0 
                  ? "Select a conversation from the list or start a new one by finding teammates."
                  : "You haven't started any conversations yet. Find teammates to begin messaging."
                }
              </p>
              <Button asChild>
                <Link to="/profiles">
                  <Users className="mr-2 h-4 w-4" />
                  Find Teammates
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
