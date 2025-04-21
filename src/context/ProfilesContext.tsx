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
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Filter } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ProfilesContextType {
  profiles: Profile[];
  hackathons: Hackathon[];
  currentUser: Profile | null;
  conversations: Conversation[];
  filteredProfiles: Profile[];
  filterCriteria: FilterCriteria;
  setFilterCriteria: (criteria: FilterCriteria) => void;
  addProfile: (profile: Profile) => Promise<void>;
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
  const { user } = useAuth();
  const { toast } = useToast();

  const currentUser = mockProfiles[0];

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    const savedConversations = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    if (savedConversations) {
      try {
        const parsedConversations: Conversation[] = JSON.parse(savedConversations);

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

  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
    }
  }, [conversations]);

  const fetchProfiles = async () => {
    // try {
    // const { data, error } = await supabase
    //   .from('profiles')
    //   .select('*');

    // if (error) {
    //   console.error('Error fetching profiles:', error);
    //   return;
    // }

    const data = mockProfiles; // Replace with the above line to fetch from Supabase

    if (data) {
      const formattedProfiles: Profile[] = data.map(profile => ({
        id: profile.id,
        name: profile.name || 'Anonymous',
        avatar: profile.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        bio: profile.bio || '',
        skills: profile.skills || [],
        location: profile.location || 'Unknown',
        hackathonInterests: profile.hackathonInterests || [],
        email: profile.email || '',
        github: profile.github,
        linkedin: profile.linkedin
      }));

      setProfiles(formattedProfiles);
      setFilteredProfiles(formattedProfiles);
    }
    // } catch (error) {
    //   console.error('Error fetching profiles:', error);
    // }
  };

  const applyFilters = () => {
    let results = mockProfiles;

    if (filterCriteria.skills.length > 0) {
      results = results.filter(profile =>
        profile.skills.some(skill => filterCriteria.skills.includes(skill))
      );
      console.log("Results in skills", results);
    }

    if (filterCriteria.location) {
      results = results.filter(profile =>
        profile.location.toLowerCase().includes(filterCriteria.location.toLowerCase())
      );
      console.log("Results in location", results);
    }

    if (filterCriteria.hackathonInterests) {
      results = results.filter(profile =>
        profile.hackathonInterests.some(
          h => h.toLowerCase().includes(filterCriteria.hackathonInterests.toLowerCase())
        )
      );
      console.log("Results in Hackathons", results);
    }

    if (filterCriteria.searchTerm) {
      const searchLower = filterCriteria.searchTerm.toLowerCase();
      results = results.filter(profile =>
        profile.name.toLowerCase().includes(searchLower) ||
        profile.bio.toLowerCase().includes(searchLower) ||
        profile.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
      console.log("Results in searchTerm", results);
    }

    console.log(`Filtered from ${profiles.length} to ${results.length} profiles`);
    setFilteredProfiles(results);
  };

  const setFilterCriteria = (criteria: FilterCriteria) => {
    console.log("Setting filter criteria:", criteria);
    setFilterCriteriaState(criteria);

    setTimeout(() => {
      applyFilters();
    }, 0);
  };

  const addProfile = async (profile: Profile) => {
    try {
      const existingProfileIndex = profiles.findIndex(p => p.id === profile.id);

      const profileData = {
        id: profile.id,
        username: profile.name,
        avatar_url: profile.avatar,
        bio: profile.bio,
        location: profile.location,
        skills: profile.skills,
        hackathon_interests: profile.hackathonInterests,
        email: profile.email,
        github: profile.github,
        linkedin: profile.linkedin
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'id' });

      if (error) {
        console.error('Error saving profile to Supabase:', error);
        toast({
          title: "Error Saving Profile",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      if (existingProfileIndex >= 0) {
        const updatedProfiles = [...profiles];
        updatedProfiles[existingProfileIndex] = profile;
        setProfiles(updatedProfiles);
        applyFilters();
      } else {
        const newProfiles = [...profiles, profile];
        setProfiles(newProfiles);
        applyFilters();
      }

      toast({
        title: existingProfileIndex >= 0 ? "Profile Updated" : "Profile Created",
        description: existingProfileIndex >= 0
          ? "Your profile has been updated successfully."
          : "Your profile has been created successfully.",
      });

    } catch (error) {
      console.error('Error in addProfile:', error);
      toast({
        title: "Error Saving Profile",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
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

    const existingConvoIndex = conversations.findIndex(
      c => c.participants.includes(to) && c.participants.includes(currentUser.id)
    );

    if (existingConvoIndex >= 0) {
      const updatedConvo = {
        ...conversations[existingConvoIndex],
        messages: [...conversations[existingConvoIndex].messages, newMessage],
        lastMessageTime: timestamp
      };

      const updatedConvos = [...conversations];
      updatedConvos[existingConvoIndex] = updatedConvo;
      setConversations(updatedConvos);
    } else {
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
    const skillKeys = Object.keys(SkillColor);
    const matchingKey = skillKeys.find(key => normalizedSkill.includes(key.toLowerCase()));
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
