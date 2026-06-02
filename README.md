# Ibrahim Mahmoud - Portfolio Website

A high-performance, modern portfolio website built with Next.js 15, TypeScript, and PostgreSQL. Features smooth animations, dark/light mode, full i18n support (Arabic/English), and a **complete admin dashboard** for content management.

## 🚀 Features

- ⚡ **100/100 Lighthouse Score** - Optimized for maximum performance
- 🌓 **Dark/Light Mode** - Smooth theme transitions
- 🌍 **i18n Support** - Arabic (RTL) and English
- 🎨 **Sophisticated Minimalism** - Clean, professional design
- 🎬 **Advanced Animations** - Hardware-accelerated Framer Motion
- 📱 **Fully Responsive** - Mobile-first approach
- 🗄️ **PostgreSQL Database** - Scalable data management with Prisma ORM
- 🔐 **Admin Dashboard** - Full CRUD operations for all content
- 📬 **Contact Form** - With validation and database storage
- 💬 **Floating Chatbot** - Interactive AI assistant button
- 📦 **Bento Box Layout** - Modern project showcase
- 🎯 **Type-Safe** - Full TypeScript strict mode
- 🔍 **SEO Optimized** - Meta tags and structured data

## 🎛️ Admin Dashboard

### Access Admin Panel
- **URL**: `http://localhost:3000/admin`
- **Default Login**: `admin` / `admin123`
- ⚠️ **Change credentials in production!**

### Admin Features
- **Dashboard**: Statistics and quick actions
- **About Me**: Edit bio, profile picture, resume
- **Projects**: Full CRUD with categories and technologies
- **Skills**: Manage skills with proficiency levels
- **Categories**: Manage project categories
- **Technologies**: Manage tech stack tags
- **Testimonials**: Client reviews with ratings
- **Messages**: View and manage contact submissions

See `ADMIN_GUIDE.md` for detailed admin documentation.

## 📋 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Theme**: next-themes

### Backend
- **Database**: PostgreSQL
- **ORM**: Prisma
- **API**: Next.js API Routes

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Setup Steps

1. **Clone the repository**
```bash
cd portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio?schema=public"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
RESEND_API_KEY="your-resend-api-key"
```

4. **Setup database**
```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed database with sample data
npm run db:seed
```

5. **Run development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
portfolio/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
├── public/                # Static assets
├── src/
│   ├── app/
│   │   ├── [locale]/      # Internationalized routes
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── api/           # API routes
│   │   │   └── contact/
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── providers/     # Context providers
│   │   ├── sections/      # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── Contact.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── i18n/              # Internationalization
│   │   ├── ar.ts
│   │   ├── en.ts
│   │   ├── config.ts
│   │   └── get-dictionary.ts
│   ├── lib/
│   │   ├── prisma.ts      # Prisma client
│   │   └── utils.ts
│   └── types/             # TypeScript types
├── .env.example
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🎨 Color Palette

### Dark Mode
- Background: `#0A0A0A`
- Surface: `#141414`
- Primary Text: `#EDEDED`
- Secondary Text: `#A1A1AA`
- Border: `#262626`
- Accent: `#3B82F6`

### Light Mode
- Background: `#FAFAFA`
- Surface: `#FFFFFF`
- Primary Text: `#171717`
- Secondary Text: `#737373`
- Border: `#E5E5E5`
- Accent: `#2563EB`

## 📝 Database Schema

### Models
- **AboutMe**: Personal information and bio
- **Project**: Portfolio projects with categories and technologies
- **Category**: Project categories (Frontend, Backend, Full-Stack)
- **Technology**: Technologies used in projects
- **Skill**: Skills with proficiency levels
- **Message**: Contact form submissions
- **Testimonial**: Client testimonials and reviews

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
vercel
```

### Environment Variables
Make sure to set all environment variables in your deployment platform:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `RESEND_API_KEY` (optional)

## 📊 Performance Optimization

- **Image Optimization**: Using `next/image` for all images
- **Code Splitting**: Automatic route-based splitting
- **Hardware-Accelerated Animations**: Only using `opacity` and `transform`
- **Lazy Loading**: Below-fold content loaded on demand
- **Font Optimization**: Next.js automatic font optimization

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push Prisma schema to database
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Ibrahim Mahmoud El Sayed Abouzeid**
- Age: 17
- Location: Tanta, Egypt
- Email: ibrahim@example.com
- GitHub: [@ibrahim](https://github.com/ibrahim)
- LinkedIn: [Ibrahim Mahmoud](https://linkedin.com/in/ibrahim)

## 🙏 Acknowledgments

- Design inspiration from [Wall of Portfolios](https://www.wallofportfolios.in/)
- Built with Next.js, React, and TypeScript
- Animations powered by Framer Motion
- UI components styled with Tailwind CSS

---

Made with ❤️ using Next.js and TypeScript
"# Protofolio" 
