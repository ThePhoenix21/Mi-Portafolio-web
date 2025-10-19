# Modern Portfolio with Dynamic Text Effect

A sleek, modern portfolio website featuring a stunning dynamic text decryption effect, built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- **Dynamic Decrypting Text Effect**: Matrix-style text animation that cycles through rotating phrases
- **Modern Design**: Dark theme with Matrix-inspired green accents and glass morphism effects
- **Fully Responsive**: Optimized for all device sizes
- **Smooth Animations**: Beautiful hover effects and transitions
- **Clean Code**: Modular component architecture
- **SEO Optimized**: Proper meta tags and semantic HTML

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 🎨 Customization

### Personalizing the Content

1. **Update personal information** in the components:
   - `src/components/HeroSection.tsx` - Name and title
   - `src/components/AboutSection.tsx` - Personal description
   - `src/components/ContactSection.tsx` - Contact details

2. **Modify the decrypting text phrases** in `HeroSection.tsx`:
   ```typescript
   const phrases = [
     'Full Stack Developer',
     'Problem Solver',
     'Code Architect',
     // Add your own phrases here
   ];
   ```

### Customizing the Text Effect

The `DecryptingText` component accepts several props for customization:

```typescript
<DecryptingText 
  phrases={phrases}           // Array of phrases to cycle through
  speed={60}                 // Speed of character revelation (ms)
  decryptSpeed={40}          // Speed of random character scrambling (ms)
  pauseDuration={3000}       // Pause between phrases (ms)
  className="text-primary-glow"
/>
```

### Styling and Colors

The design system is defined in:
- `src/index.css` - CSS custom properties and animations
- `tailwind.config.ts` - Extended Tailwind configuration

Key color variables you can modify:
```css
--primary: 142 76% 36%;        /* Main green accent */
--primary-glow: 142 76% 50%;   /* Brighter green for glow effects */
--tech-blue: 217 91% 60%;      /* Tech blue accent */
--tech-purple: 262 83% 58%;    /* Tech purple accent */
```

### Projects Section

Update the projects array in `src/components/ProjectsSection.tsx`:

```typescript
const projects = [
  {
    title: 'Your Project Name',
    description: 'Project description...',
    technologies: ['React', 'Node.js', 'MongoDB'],
    liveUrl: 'https://your-project.com',
    githubUrl: 'https://github.com/you/project',
  },
  // Add more projects...
];
```

### Skills Section

Modify the skill categories in `src/components/SkillsSection.tsx`:

```typescript
const skillCategories = [
  {
    title: 'Frontend',
    icon: '🎨',
    skills: ['React', 'Vue.js', 'TypeScript'], // Update with your skills
  },
  // Add more categories...
];
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── DecryptingText.tsx    # Dynamic text effect component
│   ├── Navigation.tsx        # Header navigation
│   ├── HeroSection.tsx       # Hero section with text effect
│   ├── AboutSection.tsx      # About section
│   ├── ProjectsSection.tsx   # Projects showcase
│   ├── SkillsSection.tsx     # Skills grid
│   ├── ContactSection.tsx    # Contact form
│   └── Footer.tsx           # Footer component
├── pages/
│   └── Index.tsx            # Main page
├── index.css                # Design system and animations
└── main.tsx                 # App entry point
```

## 🎯 Component Details

### DecryptingText Component

The core component that creates the Matrix-style decryption effect:

- **Character Scrambling**: Uses random characters before revealing the target
- **Phrase Rotation**: Automatically cycles through an array of phrases
- **Customizable Timing**: Adjustable speeds for different parts of the animation
- **TypeScript Support**: Fully typed for better development experience

### Design System

The project uses a comprehensive design system with:
- **Semantic Color Tokens**: Consistent color usage throughout
- **Glass Morphism**: Modern frosted glass effects
- **Glow Effects**: Dynamic glowing elements
- **Smooth Transitions**: Carefully crafted animations

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

## 🚀 Deployment

### Despliegue Manual

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider:
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3
   - Any static hosting service

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **shadcn/ui** - Accessible component library
- **Lucide React** - Beautiful icons

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

If you have any questions or need help customizing the portfolio, feel free to reach out or open an issue.

---

Built with ❤️ using React and TypeScript
