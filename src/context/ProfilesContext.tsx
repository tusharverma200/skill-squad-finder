
import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  Profile, 
  FilterCriteria, 
  Message, 
  Conversation, 
  Hackathon, 
  SkillColor
} from '@/types/types';
import { mockProfiles } from '@/data/mockProfiles';
import { mockHackathons } from '@/data/mockHackathons';

interface ProfilesContextType {
  profiles: Profile[];
  hackathons: Hackathon[];
  currentUser: Profile | null;
  conversations: Conversation[];
  filteredProfiles: Profile[];
  filterCriteria: FilterCriteria;
  setFilterCriteria: (criteria: FilterCriteria) => void;
  addProfile: (profile: Profile) => void;
  getProfileById: (id: string) => Profile | undefined;
  sendMessage: (to: string, content: string) => void;
  getConversation: (profileId: string) => Message[];
  getAllSkills: () => string[];
  getAllLocations: () => string[];
  getSkillColor: (skill: string) => string;
}

const defaultFilterCriteria: FilterCriteria = {
  skills: [],
  location: '',
  hackathonInterests: '',
  searchTerm: ''
};

// Storage keys for localStorage
const STORAGE_KEYS = {
  CONVERSATIONS: 'hackathon_conversations'
};

const ProfilesContext = createContext<ProfilesContextType>({} as ProfilesContextType);

export const useProfiles = () => useContext(ProfilesContext);

export const ProfilesProvider = ({ children }: { children: React.ReactNode }) => {
  const [profiles, setProfiles] = useState<Profile[]>(mockProfiles);
  const [hackathons] = useState<Hackathon[]>(mockHackathons);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>(mockProfiles);
  const [filterCriteria, setFilterCriteriaState] = useState<FilterCriteria>(defaultFilterCriteria);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  
  // Mock current user - in a real app this would be from auth
  const currentUser = mockProfiles[0];

  // Load conversations from localStorage on component mount
  useEffect(() => {
    const savedConversations = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    if (savedConversations) {
      try {
        // Parse the saved conversations and convert ISO date strings back to Date objects
        const parsedConversations: Conversation[] = JSON.parse(savedConversations);
        
        // Convert string dates back to Date objects
        const conversationsWithDates = parsedConversations.map(convo => ({
          ...convo,
          lastMessageTime: new Date(convo.lastMessageTime),
          messages: convo.messages.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        
        setConversations(conversationsWithDates);
      } catch (error) {
        console.error("Failed to parse saved conversations:", error);
      }
    }
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
    }
  }, [conversations]);

  const setFilterCriteria = (criteria: FilterCriteria) => {
    setFilterCriteriaState(criteria);
    
    // Apply filters
    let results = [...profiles];
    
    if (criteria.skills.length > 0) {
      results = results.filter(profile => 
        profile.skills.some(skill => criteria.skills.includes(skill))
      );
    }
    
    if (criteria.location && criteria.location !== '_any') {
      results = results.filter(profile => 
        profile.location.toLowerCase().includes(criteria.location.toLowerCase())
      );
    }
    
    if (criteria.hackathonInterests && criteria.hackathonInterests !== '_any') {
      results = results.filter(profile => 
        profile.hackathonInterests.some(
          h => h.toLowerCase().includes(criteria.hackathonInterests.toLowerCase())
        )
      );
    }
    
    if (criteria.searchTerm) {
      results = results.filter(profile => 
        profile.name.toLowerCase().includes(criteria.searchTerm.toLowerCase()) ||
        profile.bio.toLowerCase().includes(criteria.searchTerm.toLowerCase())
      );
    }
    
    setFilteredProfiles(results);
  };

  const addProfile = (profile: Profile) => {
    // Check if this is an update to an existing profile
    const existingProfileIndex = profiles.findIndex(p => p.id === profile.id);
    
    if (existingProfileIndex >= 0) {
      // Update existing profile
      const updatedProfiles = [...profiles];
      updatedProfiles[existingProfileIndex] = profile;
      setProfiles(updatedProfiles);
      setFilteredProfiles(updatedProfiles); // Re-apply filters
    } else {
      // Add new profile
      const newProfiles = [...profiles, profile];
      setProfiles(newProfiles);
      setFilteredProfiles(newProfiles);
    }
  };

  const getProfileById = (id: string) => {
    return profiles.find(profile => profile.id === id);
  };

  const sendMessage = (to: string, content: string) => {
    const timestamp = new Date();
    const newMessage = {
      id: `msg-${Date.now()}`,
      from: currentUser.id,
      content,
      timestamp
    };

    // Check if conversation exists
    const existingConvoIndex = conversations.findIndex(
      c => c.participants.includes(to) && c.participants.includes(currentUser.id)
    );

    if (existingConvoIndex >= 0) {
      // Add to existing conversation
      const updatedConvo = {
        ...conversations[existingConvoIndex],
        messages: [...conversations[existingConvoIndex].messages, newMessage],
        lastMessageTime: timestamp
      };
      
      const updatedConvos = [...conversations];
      updatedConvos[existingConvoIndex] = updatedConvo;
      setConversations(updatedConvos);
    } else {
      // Create new conversation
      const newConvo: Conversation = {
        id: `convo-${Date.now()}`,
        participants: [currentUser.id, to],
        messages: [newMessage],
        lastMessageTime: timestamp
      };
      
      setConversations([...conversations, newConvo]);
    }
  };

  const getConversation = (profileId: string): Message[] => {
    const convo = conversations.find(
      c => c.participants.includes(profileId) && c.participants.includes(currentUser.id)
    );
    
    return convo ? convo.messages : [];
  };
  
  const getAllSkills = (): string[] => {
    const allSkills = new Set<string>();
    profiles.forEach(profile => {
      profile.skills.forEach(skill => allSkills.add(skill));
    });
    return Array.from(allSkills).sort();
  };
  
  const getAllLocations = (): string[] => {
    const locations = new Set<string>();
    profiles.forEach(profile => {
      locations.add(profile.location);
    });
    return Array.from(locations).sort();
  };
  
  const getSkillColor = (skill: string): string => {
    const normalizedSkill = skill.toLowerCase();
    
    // Check if we have a specific color for this skill
    const skillKeys = Object.keys(SkillColor);
    const matchingKey = skillKeys.find(key => normalizedSkill.includes(key.toLowerCase()));
    
    if (matchingKey) {
      return `skill-${matchingKey.toLowerCase()}`;
    }
    
    // Generic colors based on categories
    if (normalizedSkill.includes('front') || normalizedSkill.includes('ui') || normalizedSkill.includes('ux')) {
      return 'skill-frontend';
    } else if (normalizedSkill.includes('back') || normalizedSkill.includes('server')) {
      return 'skill-backend';
    } else if (normalizedSkill.includes('design') || normalizedSkill.includes('figma')) {
      return 'skill-design';
    } else if (normalizedSkill.includes('mobile') || normalizedSkill.includes('app')) {
      return 'skill-mobile';
    } else if (normalizedSkill.includes('devops') || normalizedSkill.includes('cloud')) {
      return 'skill-devops';
    } else if (normalizedSkill.includes('ai') || normalizedSkill.includes('ml')) {
      return 'skill-ai';
    }
    
    // Default
    return 'bg-gray-500';
  };

  return (
    <ProfilesContext.Provider 
      value={{ 
        profiles,
        hackathons,
        currentUser,
        conversations,
        filteredProfiles, 
        filterCriteria,
        setFilterCriteria,
        addProfile,
        getProfileById,
        sendMessage,
        getConversation,
        getAllSkills,
        getAllLocations,
        getSkillColor
      }}
    >
      {children}
    </ProfilesContext.Provider>
  );
};
