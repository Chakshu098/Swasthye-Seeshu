# Swasthye Seeshu - Newborn Pneumonia Detection Platform

A comprehensive React TypeScript application designed to detect and manage newborn pneumonia in rural communities through AI-powered assessment tools and community healthcare support.

## 🚀 Features

### Core Functionality
- **AI-Powered Assessment**: Advanced machine learning algorithms analyze cough patterns and symptoms
- **Emergency Support**: Instant SOS features and connections to nearest healthcare facilities
- **Community Training**: Comprehensive training programs for ASHA workers
- **Multilingual Access**: Platform available in Hindi and regional languages
- **Real-time Chatbot**: Guardian AI assistant for immediate guidance

### Key Pages
- **Home**: Landing page with project overview and quick access
- **Assessment**: AI-powered pneumonia risk assessment tool
- **Consult**: Audio analysis for cough detection
- **Training**: Educational modules for healthcare workers
- **Emergency**: SOS features and facility locator
- **About**: Project information and team details
- **Contact**: Support and emergency contact information

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with Framer Motion animations
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Linting**: ESLint with TypeScript support

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── GuardianChatbot/
│   │   └── Chatbot.tsx          # AI chatbot component
│   └── Layout/
│       ├── Header.tsx           # Navigation header
│       └── Footer.tsx           # Site footer
├── contexts/
│   ├── AuthContext.tsx          # Authentication context
│   └── LanguageContext.tsx      # Multi-language support
├── pages/
│   ├── Home.tsx                 # Landing page
│   ├── Assessment.tsx           # Risk assessment tool
│   ├── Consult.tsx              # Audio analysis
│   ├── Training.tsx             # Educational modules
│   ├── Emergency.tsx            # SOS features
│   ├── About.tsx                # Project information
│   ├── Contact.tsx              # Contact form
│   └── Login.tsx                # Authentication
├── types/
│   └── index.ts                 # TypeScript type definitions
└── App.tsx                      # Main application component
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🎯 Key Features Implemented

### Assessment Tool
- Multi-step assessment process
- Symptom checklist with visual indicators
- AI-powered risk analysis
- Personalized recommendations

### Audio Analysis
- Real-time audio recording
- Cough pattern analysis
- AI-powered diagnosis
- Doctor connection features

### Training Platform
- Interactive learning modules
- Progress tracking
- Multi-language support
- Certification system

### Emergency Support
- One-tap SOS activation
- Nearby facility locator
- Emergency contact directory
- Real-time status updates

## 🌐 Multi-language Support

The platform supports multiple languages:
- English
- Hindi (हिंदी)
- Bengali (বাংলা)
- Tamil (தமிழ்)

## 🔒 Security Features

- Secure authentication system
- Role-based access control
- Data encryption for sensitive information
- HIPAA-compliant data handling

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices
- Low-bandwidth rural connections

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: support@swasthyeseeshu.org
- Emergency: 108 (India)
- Website: https://swasthyeseeshu.org

## 🙏 Acknowledgments

- AIIMS Delhi for medical expertise
- ASHA workers for community insights
- Rural healthcare communities
- Open source contributors

---

**Swasthye Seeshu** - Protecting every newborn's breath through early detection and community care. 