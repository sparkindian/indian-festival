# Indian Festival Wishes Website 🎉

A beautiful, production-ready static website for creating and sharing personalized Indian festival greetings. Built with HTML5, CSS3, and Vanilla JavaScript - no backend required!

## Features ✨

- **Multiple Festival Support**: Diwali, Holi, Raksha Bandhan, Dussehra, New Year, and Janmashtami
- **Personalized Greetings**: Enter your name to generate custom messages
- **Shareable URLs**: Generate unique links for each greeting
- **WhatsApp Integration**: One-click sharing to WhatsApp
- **Copy Link Feature**: Easy link copying for sharing on any platform
- **Festival-Specific Themes**: Unique colors, animations, and emojis for each festival
- **Mobile-First Design**: Fully responsive for all devices
- **SEO Optimized**: Dynamic meta tags and Open Graph support
- **Smooth Animations**: Modern UI with beautiful transitions
- **Zero Backend Cost**: 100% static, can be hosted for free

## Project Structure 📁

```
indian-festival-wishes/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Stylesheet with festival themes
├── js/
│   └── app.js             # JavaScript application logic
├── assets/
│   ├── images/            # Place for custom images
│   └── icons/             # Place for custom icons
└── README.md              # This file
```

## How to Run Locally 🖥️

### Option 1: Using Python (Recommended)

1. Make sure you have Python installed
2. Open terminal/command prompt in the project directory
3. Run the following command:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

4. Open your browser and navigate to: `http://localhost:8000`

### Option 2: Using Node.js

1. Install Node.js if not already installed
2. Install http-server globally:

```bash
npm install -g http-server
```

3. Run the server in the project directory:

```bash
http-server -p 8000
```

4. Open your browser and navigate to: `http://localhost:8000`

### Option 3: Using VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 4: Direct File Open

Simply double-click `index.html` to open it in your browser. Note that some features may not work perfectly due to browser security restrictions.

## Deployment 🚀

### Deploy on GitHub Pages

#### Prerequisites:
- GitHub account
- Git installed on your machine

#### Steps:

1. **Initialize Git Repository**

```bash
cd indian-festival-wishes
git init
git add .
git commit -m "Initial commit - Indian Festival Wishes Website"
```

2. **Create GitHub Repository**

- Go to [github.com](https://github.com) and create a new repository
- Name it something like `indian-festival-wishes`
- Don't initialize with README (we already have one)
- Copy the repository URL

3. **Push to GitHub**

```bash
git remote add origin https://github.com/YOUR_USERNAME/indian-festival-wishes.git
git branch -M main
git push -u origin main
```

4. **Enable GitHub Pages**

- Go to your repository on GitHub
- Click on **Settings** tab
- Scroll down to **Pages** section
- Under **Source**, select **Deploy from a branch**
- Select **main** branch and **/ (root)** folder
- Click **Save**

5. **Access Your Website**

- Wait 1-2 minutes for deployment
- Your website will be available at: `https://YOUR_USERNAME.github.io/indian-festival-wishes/`

6. **Update Meta Tags (Optional)**

- Update the following in `index.html`:
  - `og:url` meta tag with your GitHub Pages URL
  - `og:image` meta tag if you add custom images

### Deploy on Cloudflare Pages

#### Prerequisites:
- Cloudflare account (free)
- GitHub repository (created above)

#### Steps:

1. **Push Code to GitHub** (if not already done)

2. **Connect to Cloudflare Pages**

- Go to [Cloudflare Pages](https://pages.cloudflare.com)
- Click **Create a project**
- Select **Connect to Git**
- Authorize Cloudflare to access your GitHub account
- Select your `indian-festival-wishes` repository

3. **Configure Build Settings**

- **Project name**: `indian-festival-wishes` (or your preferred name)
- **Production branch**: `main`
- **Framework preset**: None
- **Build command**: Leave empty (static site)
- **Build output directory**: Leave empty (root directory)

4. **Deploy**

- Click **Save and Deploy**
- Wait for deployment to complete (usually takes 1-2 minutes)
- Your website will be available at: `https://your-project-name.pages.dev`

5. **Custom Domain (Optional)**

- Go to your project settings in Cloudflare Pages
- Click **Custom domains**
- Add your custom domain and follow the DNS instructions

### Deploy on Netlify

#### Prerequisites:
- Netlify account (free)
- Git installed on your machine

#### Steps:

1. **Install Netlify CLI**

```bash
npm install -g netlify-cli
```

2. **Login to Netlify**

```bash
netlify login
```

3. **Initialize Netlify**

```bash
cd indian-festival-wishes
netlify init
```

- Follow the prompts:
  - Choose **Create & deploy a new site**
  - Select your team
  - Enter a site name or leave blank for auto-generated
  - Choose **default** for build command
  - Enter `.` for publish directory

4. **Deploy**

```bash
netlify deploy --prod
```

5. **Access Your Website**

- Your website will be available at: `https://your-site-name.netlify.app`

#### Alternative: Drag and Drop

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag and drop the `indian-festival-wishes` folder
3. Wait for deployment
4. Your website will be live instantly

### Deploy on Vercel

#### Prerequisites:
- Vercel account (free)
- GitHub repository

#### Steps:

1. **Push Code to GitHub** (if not already done)

2. **Import to Vercel**

- Go to [Vercel](https://vercel.com)
- Click **Add New Project**
- Import your `indian-festival-wishes` repository

3. **Configure Project**

- **Framework Preset**: Other
- **Root Directory**: Leave as `./`
- **Build Command**: Leave empty
- **Output Directory**: Leave empty

4. **Deploy**

- Click **Deploy**
- Wait for deployment to complete
- Your website will be available at: `https://your-project.vercel.app`

## Customization 🎨

### Adding New Festivals

1. **Add to `js/app.js`**:

```javascript
const festivals = {
    // ... existing festivals
    'new-festival': {
        name: 'Happy New Festival',
        icon: '🎊',
        decoration: '🎉🎊🎉',
        theme: 'new-festival',
        title: 'Happy New Festival Wishes',
        description: 'Your festival description'
    }
};
```

2. **Add to `index.html`**:

```html
<option value="new-festival">🎊 Happy New Festival</option>
```

3. **Add to `css/style.css`**:

```css
[data-theme="new-festival"] {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    --accent-color: #your-color;
    --bg-gradient-1: #your-color;
    --bg-gradient-2: #your-color;
    --bg-gradient-3: #your-color;
}
```

### Changing Colors

Edit the CSS variables in `css/style.css` under each festival theme section.

### Adding Custom Images

1. Place your images in `assets/images/`
2. Reference them in `index.html` or `css/style.css`

### Updating Meta Tags

Edit the meta tags in `index.html` head section:
- Update `og:url` with your deployed URL
- Update `og:image` with your custom image URL
- Update Twitter Card tags similarly

## URL Parameters 🔗

The website supports the following URL parameters:

- `name`: The sender's name
- `festival`: The festival key (diwali, holi, raksha-bandhan, dussehra, new-year, janmashtami)

### Example URLs:

```
https://yourwebsite.com/?name=Manoj&festival=diwali
https://yourwebsite.com/?name=Priya&festival=holi
https://yourwebsite.com/?name=Rahul&festival=raksha-bandhan
```

## Browser Support 🌐

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance ⚡

- Lightweight: No external dependencies
- Fast loading: Minimal CSS and JavaScript
- Optimized animations: Hardware-accelerated CSS
- Responsive images: Uses system fonts (no additional requests)

## Security 🔒

- Input sanitization to prevent XSS attacks
- No backend required (reduced attack surface)
- No external dependencies (reduced vulnerability risk)

## Accessibility ♿

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Reduced motion support for users who prefer it
- High contrast colors
- Screen reader friendly

## Troubleshooting 🔧

### Issue: Styles not loading
- Ensure `css/style.css` path is correct in `index.html`
- Check browser console for errors

### Issue: JavaScript not working
- Ensure `js/app.js` path is correct in `index.html`
- Check browser console for errors
- Verify JavaScript is enabled in browser

### Issue: URL parameters not working
- Ensure parameters are correctly formatted
- Check browser console for errors
- Verify the festival key exists in the festivals object

### Issue: WhatsApp share not working
- Ensure WhatsApp is installed on the device
- Check that the URL is correctly formatted
- Some browsers may block popups - allow popups for your site

## Contributing 🤝

Contributions are welcome! Feel free to:
- Add new festivals
- Improve animations
- Fix bugs
- Enhance accessibility
- Add new features

## License 📄

This project is open source and available for personal and commercial use.

## Support 💬

If you encounter any issues or have questions:
- Check the troubleshooting section
- Open an issue on GitHub (if hosted there)
- Review the code comments for detailed explanations

## Credits 🙏

Built with ❤️ for spreading joy and happiness during Indian festivals.

---

**Happy Sharing! 🎉**
