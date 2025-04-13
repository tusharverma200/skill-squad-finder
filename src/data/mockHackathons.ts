
import { Hackathon } from '@/types/types';

export const mockHackathons: Hackathon[] = [
  {
    id: '1',
    title: 'AI Hack 2025',
    description: 'A 48-hour global hackathon focused on artificial intelligence and machine learning solutions to real-world problems.',
    startDate: new Date('2025-06-15'),
    endDate: new Date('2025-06-17'),
    location: 'Online',
    isOnline: true,
    url: 'https://aihack2025.example.com',
    organizerName: 'Global AI Initiative',
    prizes: ['$10,000 Grand Prize', 'Cloud Credits', 'Mentorship Opportunities'],
    logo: 'https://i.pravatar.cc/150?img=55',
    tags: ['AI', 'Machine Learning', 'Data Science', 'Global']
  },
  {
    id: '2',
    title: 'Global Web Summit Hackathon',
    description: 'Build innovative web solutions using the latest technologies. Open to developers of all skill levels.',
    startDate: new Date('2025-04-22'),
    endDate: new Date('2025-04-24'),
    location: 'Lisbon, Portugal',
    isOnline: false,
    url: 'https://websummit.example.com/hackathon',
    organizerName: 'Web Summit',
    prizes: ['€5,000 Prize Pool', 'Conference Tickets', 'Investor Meetings'],
    logo: 'https://i.pravatar.cc/150?img=56',
    tags: ['Web Development', 'Frontend', 'Backend', 'Full Stack']
  },
  {
    id: '3',
    title: 'Health Hack 2025',
    description: 'Create solutions to improve healthcare accessibility, patient care, and medical technology.',
    startDate: new Date('2025-08-10'),
    endDate: new Date('2025-08-12'),
    location: 'Boston, MA',
    isOnline: false,
    url: 'https://healthhack2025.example.com',
    organizerName: 'MedTech Alliance',
    prizes: ['$15,000 in Prizes', 'Incubator Support', 'Hospital Partnerships'],
    logo: 'https://i.pravatar.cc/150?img=57',
    tags: ['Healthcare', 'MedTech', 'Patient Care', 'Accessibility']
  },
  {
    id: '4',
    title: 'Cloud Innovation Challenge',
    description: 'Harness the power of cloud technologies to solve business and infrastructure challenges.',
    startDate: new Date('2025-05-18'),
    endDate: new Date('2025-05-20'),
    location: 'Online',
    isOnline: true,
    url: 'https://cloudinnovation.example.com',
    organizerName: 'CloudTech Partners',
    prizes: ['$8,000 Prize Pool', 'Cloud Credits', 'Enterprise Contracts'],
    logo: 'https://i.pravatar.cc/150?img=58',
    tags: ['Cloud Computing', 'DevOps', 'Infrastructure', 'SaaS']
  },
  {
    id: '5',
    title: 'React Conf Hackathon',
    description: 'Build amazing applications with React and its ecosystem in this 24-hour coding challenge.',
    startDate: new Date('2025-10-05'),
    endDate: new Date('2025-10-06'),
    location: 'San Francisco, CA',
    isOnline: false,
    url: 'https://reactconf.example.com/hackathon',
    organizerName: 'React Community',
    prizes: ['$5,000 Prize', 'Conference Tickets', 'Developer Swag'],
    logo: 'https://i.pravatar.cc/150?img=59',
    tags: ['React', 'JavaScript', 'Frontend', 'UI/UX']
  },
  {
    id: '6',
    title: 'ETHGlobal',
    description: 'The world\'s largest Ethereum hackathon. Build the future of Web3 and decentralized applications.',
    startDate: new Date('2025-07-22'),
    endDate: new Date('2025-07-24'),
    location: 'Remote + Multiple Cities',
    isOnline: true,
    url: 'https://ethglobal.example.com',
    organizerName: 'ETHGlobal',
    prizes: ['$50,000 in Crypto Prizes', 'Protocol Grants', 'VC Connections'],
    logo: 'https://i.pravatar.cc/150?img=60',
    tags: ['Blockchain', 'Ethereum', 'Web3', 'DeFi']
  }
];
