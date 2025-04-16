
# Hackathon Team Finder

A platform for connecting developers, designers, and innovators looking to form teams for hackathons and projects.

## Project Overview

Hackathon Team Finder allows users to:
- Browse profiles of potential teammates
- Filter profiles by skills, location, and hackathon interests
- View upcoming hackathons
- Create their own profile to showcase skills and interests

## Setup Instructions

### Prerequisites
- Node.js & npm - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Local Development

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The application will be available at http://localhost:8080

## Usage Guide

### Navigation
- **Home Page**: Overview of the platform features
- **Find Teammates**: Browse and filter user profiles by skills, location, and hackathon interests
- **Hackathons**: View upcoming hackathon events
- **Messages**: Connect with potential teammates (requires authentication)

### Filtering Profiles
1. Navigate to the "Find Teammates" page
2. Use the search bar to find teammates by name or bio
3. Filter by location using the dropdown menu
4. Filter by hackathon interest using the dropdown menu
5. Click the "Skills" button to select specific skills you're looking for
6. Use the "Clear filters" button to reset all filters

### Creating Your Profile
1. Sign in to your account
2. Navigate to the "Create Profile" page
3. Fill in your details, skills, and interests
4. Submit your profile to make it visible to other users

## Deployment

This project is hosted on Lovable. To deploy changes:

1. Open [Lovable](https://lovable.dev/projects/12817f37-a042-40c3-96ab-0b316932f0d6)
2. Click on Share -> Publish
3. Follow the prompts to deploy your application

### Custom Domain Setup

To connect a custom domain to your Lovable project:
1. Navigate to Project > Settings > Domains
2. Click "Connect Domain"
3. Follow the instructions to configure your DNS settings

## Technologies

- React with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- shadcn/ui for UI components
- React Router for navigation
- Tanstack React Query for data fetching (ready for future API integration)

## Contributing

Contributions are welcome! Push your changes to this repository, and they will be reflected in Lovable.
