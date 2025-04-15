
import { useState } from "react";
import { useProfiles } from "@/context/ProfilesContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { format } from "date-fns";

interface MessageThreadProps {
  profileId: string;
}

const MessageThread = ({ profileId }: MessageThreadProps) => {
  const [messageText, setMessageText] = useState("");
  const { getProfileById, currentUser, getConversation, sendMessage } = useProfiles();
  
  const profile = getProfileById(profileId);
  const messages = getConversation(profileId);
  
  const handleSendMessage = () => {
    if (messageText.trim() && profile) {
      sendMessage(profile.id, messageText);
      setMessageText("");
    }
  };
  
  if (!profile || !currentUser) {
    return <div className="text-center py-4">User not found</div>;
  }
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b">
        <img 
          src={profile.avatar} 
          alt={profile.name} 
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="ml-3">
          <h3 className="font-medium">{profile.name}</h3>
          <p className="text-xs text-muted-foreground">{profile.location}</p>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <p>No messages yet</p>
            <p className="text-sm">Send a message to start the conversation</p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = message.from === currentUser.id;
            const sender = isOwn ? currentUser : profile;
            
            return (
              <div 
                key={message.id}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
                  <div 
                    className={`px-4 py-2 rounded-2xl ${
                      isOwn 
                        ? 'bg-primary text-primary-foreground rounded-tr-none' 
                        : 'bg-muted rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(message.timestamp, 'MMM d, h:mm a')}
                  </p>
                </div>
                
                {!isOwn && (
                  <img 
                    src={sender.avatar}
                    alt={sender.name}
                    className="h-8 w-8 rounded-full object-cover mr-2"
                  />
                )}
              </div>
            );
          })
        )}
      </div>
      
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder={`Send a message to ${profile.name}...`}
            className="min-h-[60px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageThread;
