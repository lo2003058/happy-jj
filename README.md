# Period Tracking App

A modern, responsive web application for tracking menstrual cycles and calculating safe periods with personalized
experiences based on gender preferences.

## Deploy status

![Vercel Deploy](https://deploy-badge.vercel.app/vercel/happy-jj)

**Live demo:** [https://happy-jj.vercel.app/](https://happy-jj.vercel.app/)

## Development Roadmap

### Currently Implemented

- **Calendar Tracking**: Track menstruation dates with a full-featured calendar
- **Gender-Specific Experience**: Customize the app based on your gender preference
- **Safe Period Calculation**: Automatic calculation of safe periods based on tracked data
- **Dark/Light Mode**: Switch between themes for comfortable viewing in any environment
- **Multilingual Support**: Available in multiple languages:
    - English
    - French
    - Chinese (Hong Kong, Taiwan, and Mainland China variants)
- **Data Privacy**: All data is stored locally in your browser
- **AI Integration**:
    - Custom OpenAI API configuration
    - AI-powered recipe generation

### In Active Development

- **Cooking Advice Tool**: Advanced meal suggestions based on menstrual cycle phases
    - ✅ Modal interface with responsive grid layout
    - ✅ Default recipe database with multilingual support
    - ✅ Recipe filtering by type, difficulty, and preparation time
    - ✅ Personal preference system (favorite foods and foods to avoid)
    - ✅ AI-generated custom recipes through OpenAI integration
    - ✅ Recipe storage and management system
    - 🔄 Additional nutritional guidance tailored to cycle phases

### Planned Features

- **Mobile Application**: Native apps for iOS and Android with cross-platform data synchronization
- **Cloud Synchronization**: Optional cloud storage for accessing your data across multiple devices

## Technologies

- Vue 3 with Composition API
- Pinia for state management
- FullCalendar for calendar functionality
- Tailwind CSS for responsive design
- Vue I18n for internationalization
- Nuxt UI components
- Moment.js for date calculations

## Getting Started

### Prerequisites

- Node.js (version 16 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lo2003058/happy-jj.git
   cd happy-jj
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Access the app in your browser at `http://localhost:3000`

## Usage

1. Select your gender preference on first use
2. Use the calendar to track menstruation dates by clicking on the relevant days
3. View calculated safe periods directly on the calendar
4. Customize settings through the gear icon in the top-right corner
5. Access additional tools through the tools menu in the top-left corner

### Setting up AI Features

To use the AI-powered recipe generation:

1. Navigate to Settings (gear icon in top-right corner)
2. Configure your OpenAI-compatible API settings:
    - Enter your API model name (e.g., "gpt-4", "claude-3-opus-20240229", etc.)
    - Enter your API endpoint URL:
        - OpenAI: `https://api.openai.com/v1`
        - Anthropic: `https://api.anthropic.com/v1`
        - Mistral: `https://api.mistral.ai/v1`
        - Groq: `https://api.groq.com/openai/v1`
        - Self-hosted models: your custom endpoint URL
    - Enter your API secret key
3. Access the Cooking Advice tool (tools menu in top-left corner)
4. Toggle AI mode to enable custom recipe generation
5. Personalize your recipe requirements:
    - Add foods to avoid (up to 10 items)
    - Add favorite foods (up to 10 items) and select up to 5 preferences
    - Select recipe type, difficulty level, and preparation time
6. Click "Generate Recipe" to create a custom AI-powered recipe
7. Save recipes you like to your personal collection

> **Note**: This application supports any API service that follows the OpenAI-compatible API format, not just OpenAI's
> services. You can use various AI providers or self-hosted models as long as they implement the standard OpenAI API
> interface.

## Credits

Designed and developed by lo2003058
