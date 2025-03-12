# Period Tracking App

A modern, responsive web application for tracking menstrual cycles and calculating safe periods with personalized
experiences based on gender preferences.

## Deploy status

![Vercel Deploy](https://deploy-badge.vercel.app/vercel/happy-jj)

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

### In Active Development

- **Cooking Advice Tool**: Providing meal suggestions based on menstrual cycle phases
    - Default recipes and nutritional guidance for each phase
    - Modal interface structure created
    - Integration with tools menu implemented
    - Recipe database and filtering system in progress
    - Nutritional guidance tailored to cycle phases pending implementation

### Planned Features

- **Mobile Application**: Native apps for iOS and Android with cross-platform data synchronization
- **Cloud Synchronization**: Optional cloud storage for accessing your data across multiple devices
- **AI-Powered Features**:
    - Personalized recommendations using AI services (OpenAI standard API)

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

## Credits

Designed and developed with ❤️ by lo2003058
