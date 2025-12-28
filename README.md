# Emre Kahveci Portfolio

A modern, responsive one-page portfolio website built with Next.js 15, featuring:

- 🌐 **Bilingual Support** - English and Turkish (i18n)
- 🌙 **Dark/Light Mode** - System-aware theme switching
- ✨ **Smooth Animations** - Powered by Framer Motion
- 📱 **Fully Responsive** - Mobile-first design
- 🎨 **Premium UI** - Glassmorphism, gradients, and micro-animations
- 📧 **Contact Form** - Formspree integration

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Formspree (optional):**
   
   To enable the contact form:
   - Go to [Formspree](https://formspree.io)
   - Create a new form
   - Copy your form endpoint
   - Update `FORMSPREE_ENDPOINT` in `src/components/Contact.tsx`

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
portfolyo/
├── projects/              # Your project folders (data source)
├── src/
│   ├── app/
│   │   ├── layout.tsx     # Root layout with providers
│   │   ├── page.tsx       # Main single-page app
│   │   └── globals.css    # Global styles
│   ├── components/
│   │   ├── Hero.tsx       # Hero section
│   │   ├── About.tsx      # About section
│   │   ├── Projects.tsx   # Projects grid
│   │   ├── Skills.tsx     # Skills section
│   │   ├── Contact.tsx    # Contact form
│   │   ├── Navbar.tsx     # Navigation
│   │   ├── Footer.tsx     # Footer
│   │   └── Providers.tsx  # Theme & i18n providers
│   ├── lib/
│   │   ├── projects.ts    # Project data loader
│   │   └── i18n.ts        # i18n configuration
│   └── locales/
│       ├── en.json        # English translations
│       └── tr.json        # Turkish translations
├── next.config.mjs
├── tailwind.config.js
└── package.json
```

## Customization

### Adding/Editing Projects

Projects are automatically loaded from the `projects/` folder. Each project should have a `README.md` file with:

- A `# Title` heading
- Description paragraph
- `## Technologies` section

Featured projects are configured in `src/lib/projects.ts`.

### Updating Personal Info

- **Name/Bio**: Edit `src/locales/en.json` and `src/locales/tr.json`
- **Social Links**: Edit `src/components/Contact.tsx`
- **Skills**: Edit `src/components/Skills.tsx`

### Adding New Languages

1. Create a new translation file in `src/locales/`
2. Add the language in `src/lib/i18n.ts`
3. Update the language toggle in `src/components/Navbar.tsx`

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms

```bash
npm run build
```

The output will be in `.next/` folder.

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **i18n**: react-i18next
- **Theme**: next-themes
- **Forms**: Formspree

## License

MIT License - feel free to use this template for your own portfolio!
