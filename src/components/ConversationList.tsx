
import { Link } from "react-router-dom";
import { useProfiles } from "@/context/ProfilesContext";
import { format } from "date-fns";

interface ConversationListProps {
  activeProfileId?: string;
}

const ConversationList = ({ activeProfileId }: ConversationListProps) => {
  const { conversations, currentUser, getProfileById } = useProfiles();
  
  if (conversations.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <p>No conversations yet</p>
        <p className="text-sm">
          <Link to="/profiles" className="text-primary hover:underline">
            Find teammates
          </Link>
          {" "}to start messaging
        </p>
      </div>
    );
  }
  
  // Sort conversations by most recent message
  const sortedConversations = [...conversations].sort(
    (a, b) => b.lastMessageTime.getTime() - a.lastMessageTime.getTime()
  );
  
  return (
    <div className="divide-y">
      {sortedConversations.map(conversation => {
        // Find the other participant (not the current user)
        const otherParticipantId = conversation.participants.find(
          id => id !== currentUser?.id
        );
        
        const profile = otherParticipantId ? getProfileById(otherParticipantId) : null;
        
        if (!profile) return null;
        
        const lastMessage = conversation.messages[conversation.messages.length - 1];
        const isActive = profile.id === activeProfileId;
        
        return (
          <Link
            key={conversation.id}
            to={`/messages?to=${profile.id}`}
            className={`flex items-center p-4 hover:bg-muted/50 transition-colors ${
              isActive ? 'bg-muted' : ''
            }`}
          >
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{profile.name}</h4>
                <span className="text-xs text-muted-foreground">
                  {format(lastMessage.timestamp, 'MMM d')}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {lastMessage.from === currentUser?.id ? 'You: ' : ''}
                {lastMessage.content}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ConversationList;
