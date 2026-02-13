# 🎨 Sihem Hammoudi - Professional Portfolio

A beautiful, modern portfolio website with dark/light mode, dynamic project pages, admin panel, testimonials, and FAQ section.

## ✨ Features

### 🌓 **Dual Theme System**
- Dark mode (default)
- Light mode toggle
- Smooth transitions
- Theme preference saved

### 📱 **Fully Responsive**
- Mobile-first design
- Perfect on all screen sizes
- Adaptive layouts
- Touch-friendly

### 🎯 **Complete Sections**
1. **Hero** - Introduction with animated visual + stats
2. **About** - "Approach" & "What I love" info cards
3. **Skills & Services** - 4 service cards + tech stack
4. **Projects** - Grid with dynamic project pages
5. **Client Testimonials** - 3 testimonial cards
6. **FAQ** - 5 questions with accordion
7. **Contact** - Form + contact methods
8. **Footer** - Links and information

### 🚀 **Dynamic Project System**
- Click any project → Opens dedicated detail page
- Shows: Full description, images, tech stack, client info
- "View Live Project" button at bottom
- Clean URL: `project.html?id=1`

### 🔐 **Admin Panel**
- Floating button (bottom right)
- Password protected (default: `admin123`)
- Add/Edit/Delete projects
- Full project details form includes:
  - Title & Category
  - Short & detailed descriptions
  - Hero image URL
  - Project link
  - Tags & technologies
  - Year & client name

### 🎨 **Design System**
- Google Material Symbols icons
- Teal/cyan accent color (#2dd4bf)
- 8pt grid spacing system
- Professional typography (Poppins)
- Smooth animations

## 🚀 Quick Start

### Super Simple Setup:

1. **Download all files:**
   - `index.html`
   - `project.html`
   - `style.css`
   - `script.js`
   - `project.js`

2. **Put them in one folder**

3. **Double-click `index.html`**

**That's it!** ✅ Your portfolio opens in your browser!

## 🔑 Admin Panel

### How to Access:
1. Click the floating admin button (bottom right - gear icon)
2. Enter password: `admin123`
3. Admin panel appears at top of Projects section

### Adding a Project:
1. Login as admin
2. Fill in the form:
   - **Project Title*** (required)
   - **Category** - e.g., "UI Design", "Frontend"
   - **Short Description*** (shows on card)
   - **Full Project Details** (shows on detail page)
   - **Hero Image URL*** (project screenshot)
   - **Project Link** (live website URL)
   - **Tags** - comma separated (UI Design, Frontend)
   - **Technologies** - comma separated (React, Tailwind)
   - **Year** - e.g., 2024
   - **Client/Company** - who it was for
3. Click "Save Project"

### Editing a Project:
1. Login as admin
2. Click edit icon on any project card
3. Form fills with current data
4. Make changes and save

### Deleting a Project:
1. Login as admin
2. Click delete icon on project card
3. Confirm deletion

## 🎯 How Project Pages Work

### User Experience:
1. User clicks "projects.viewProject" on any project card
2. Opens `project.html?id=X` with that project's ID
3. Page shows:
   - Category & year badges
   - Project title & description
   - Large hero image
   - Full project overview
   - Sidebar with: Client, Technologies, Skills
   - "View Live Project" button (if link provided)
   - "Back to All Projects" button

### For You (Admin):
- Just add projects via admin panel
- System automatically creates detail pages
- No need to create separate HTML files!
- Everything stored in browser localStorage

## 🎨 Customization

### Change Colors:
Edit `style.css` - Find these variables:
```css
:root {
    --accent: #2dd4bf;        /* Teal - Change this */
    --accent-hover: #14b8a6;  /* Darker teal */
}
```

### Change Admin Password:
Edit `script.js` - Line ~142:
```javascript
if (password === 'admin123') {  // Change 'admin123'
```

### Update Your Info:
Edit `index.html` - Search for:
- Email: `sihemuiuxengineer@gmail.com`
- WhatsApp: `213542198069`
- Instagram: `@sihem.web`

### Edit Testimonials:
Edit `index.html` - Find `<!-- Client Testimonials -->` section
Change names, companies, and testimonial text

### Edit FAQ:
Edit `index.html` - Find `<!-- FAQ -->` section
Modify questions and answers

## 📱 Sections Breakdown

### Hero Section:
- Badge: "AVAILABLE FOR NEW PROJECTS"
- Title with your name
- Description
- Two CTAs: "View Projects" + "Contact Me"
- Stats: Experience, Projects, Satisfaction
- Animated circular visual

### About Section:
- Main heading: "I bridge the gap between design and development."
- Two paragraphs about your work
- Two info cards:
  - **Approach**: Research, Communication, Collaboration
  - **What I love**: Design systems, Interactions, Code

### Skills & Services:
- 4 service cards:
  1. UI Design
  2. UX Research
  3. Wireframing & Prototyping
  4. Frontend Development
- Tech stack tags below (HTML5, CSS3, JavaScript, etc.)

### Projects:
- Grid of project cards
- Each shows: Image, title, description, tags, "View Project" link
- Admin can see edit/delete buttons

### Testimonials:
- 3 client testimonials
- 5-star ratings
- Client names and companies

### FAQ:
- 5 common questions
- Click to expand/collapse
- Smooth accordion animation

### Contact:
- Left: Heading + description
- Right: Contact form (Name, Email, Message)
- Below: "Prefer another channel?" section
- 3 contact method cards: Email, WhatsApp, Instagram

### Footer:
- Logo + tagline
- Quick links
- Social links
- Copyright

## 🌐 Deploy Online (Free)

### Option 1: GitHub Pages
1. Create GitHub account
2. Create new repository
3. Upload all 5 files
4. Settings → Pages → Deploy from main branch
5. Live at: `https://yourusername.github.io/repo-name`

### Option 2: Netlify
1. Go to netlify.com
2. Drag and drop your folder
3. Instant deploy!
4. Get a free subdomain

### Option 3: Vercel
1. Go to vercel.com
2. Import from folder
3. Deploy with one click

## 💾 Data Storage

- **Method**: Browser localStorage
- **What's saved**: All projects you add
- **Pros**: Fast, free, no backend needed
- **Cons**: Only visible on your device
- **Note**: Clearing browser data will reset projects

### To Share Projects Across Devices:
You'll need to upgrade to a backend (Firebase, MongoDB, etc.) in the future. For now, localStorage is perfect for getting started!

## 📐 Technical Details

### Technologies:
- HTML5
- CSS3 (with CSS Variables)
- Vanilla JavaScript (no frameworks)
- Google Material Symbols icons
- Google Fonts (Poppins)

### Browser Support:
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

### Performance:
- Lightweight (no heavy frameworks)
- Fast loading
- Smooth animations
- Optimized images

## 🐛 Troubleshooting

### Projects not saving?
- Login as admin first
- Check browser allows localStorage
- Try incognito mode to test
- Try different browser

### Styles not loading?
- All files in same folder?
- File names exactly: `index.html`, `style.css`, etc.
- Try hard refresh (Ctrl+F5)

### Project page not opening?
- Make sure `project.html` and `project.js` are in same folder
- Check browser console for errors (F12)

### Icons not showing?
- Need internet connection for Google Material Symbols
- Check if fonts are loading

### Mobile menu not working?
- Clear browser cache
- Check JavaScript is enabled

## 🎯 Best Practices

### Adding Projects:
- Use high-quality images (1000x600px recommended)
- Write clear descriptions
- Include relevant tags
- Add project links when available

### Writing Content:
- Keep descriptions concise
- Use professional language
- Highlight key features
- Mention technologies used

### Images:
- Use professional screenshots
- Optimize for web (under 200KB if possible)
- Use services like TinyPNG to compress
- Host on Imgur, Cloudinary, or Unsplash

## 📧 Contact Info

Current contact methods in portfolio:
- **Email**: sihemuiuxengineer@gmail.com
- **WhatsApp**: +213 542 198 069
- **Instagram**: @sihem.web

## 🎉 You're All Set!

Your portfolio is ready to impress! 

**Next steps:**
1. Add your own projects via admin panel
2. Replace testimonials with real client feedback
3. Update FAQ with your specific questions
4. Deploy online for the world to see!

**Need help?** Contact sihemuiuxengineer@gmail.com

---

**Built with ❤️ for Sihem Hammoudi**
**Design inspired by modern portfolio trends**
**No frameworks, just clean code!**