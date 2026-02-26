# 🎂 Happy Birthday Website

A modern, fully responsive birthday celebration microsite with neon glow effects, interactive features, and luxury premium design.

## ✨ Features

- 🔥 **Hero Section** - Animated neon gradient "Happy Birthday" text with particles
- 🖼️ **3D Card** - Interactive 3D tilt effect on birthday photo card with image upload
- ⏳ **Countdown Timer** - Live countdown to birthday with days, hours, minutes, seconds
- 💖 **Heart Explosions** - Click anywhere to trigger animated heart burst
- 🎞️ **Story Sections** - Instagram-style memory slides with parallax scrolling
- 🖼️ **Photo Gallery** - Interactive gallery with modal enlargement
- 💌 **Wishes Wall** - Send wishes that persist with localStorage
- 🎶 **Music Control** - Floating play/pause button for background music
- 🎁 **Surprise Button** - Trigger fireworks, confetti, and special popup message
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- 🌊 **Parallax Scrolling** - Background layers move at different speeds
- ✨ **Particle Effects** - Animated floating particles across the background

## 📂 Project Structure

```
birthday-website/
├── index.html          # Main HTML file
├── style.css           # All styling & animations
├── script.js           # JavaScript functionality
├── assets/
│   ├── images/         # Place your photos here
│   └── music.mp3       # Background birthday music (optional)
└── README.md           # This file
```

## 🚀 Quick Start

1. **Open in Browser** - Simply open `index.html` in any modern web browser
2. **No Installation Required** - Everything works out of the box
3. **No Server Needed** - This is a static website

## 🎨 Customization

### Update Birthday Date
Edit the target date in `script.js` (line ~37):
```javascript
const targetDate = new Date('2026-05-01T00:00:00').getTime();
// Change '2026-05-01' to your birthday date
```

### Add Your Photos
Place your images in `/assets/images/` and update the paths in `index.html`

### Add Background Music
1. Place a music file named `music.mp3` in `/assets/`
2. Click the music button to play/pause

### Customize Colors
Edit the CSS variables in `style.css`:
```css
:root {
  --accent-pink: #ff00cc;
  --accent-purple: #6600ff;
  --neon-glow: #ff00cc;
  /* ... more colors ... */
}
```

### Edit Target Person Name
Search and replace "Anudeep" with the birthday person's name throughout the files

## 💡 Features Explained

### Wishes Wall (localStorage)
- Type your message in the textarea
- Click "Send Wish ❤️" to add it to the wall
- Wishes persist even after page refresh (stored in browser localStorage)
- Maximum 50 wishes saved

### 3D Card Hover
- Move your mouse over the birthday photo card
- Card tilts in 3D perspective following mouse movement
- Works on desktop browsers

### Heart Burst
- Click anywhere on the page (except buttons/inputs)
- 5 animated hearts burst out in random directions
- Different colors and sizes for each burst

### Surprise Popup
- Click "Open Your Surprise" button
- Triggers fireworks, confetti, and a special popup message
- Close with the X button or by pressing Escape

### Photo Gallery
- Click on any gallery image
- Opens in a modal lightbox view
- Close with X button or by clicking outside the image

## 📱 Mobile Features

- Hamburger menu for navigation
- Touch swipe support for story sections
- Optimized font sizes for all screen sizes
- Responsive grid layouts
- Touch-friendly buttons
- No horizontal scrolling issues

## 🎵 Background Music

The website includes a music button in the top-right corner:
- Initially muted (browser autoplay restrictions)
- Click to play/pause
- Loops continuously
- Add your own music file as `assets/music.mp3`

## 🔧 Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📦 No Dependencies

This website uses **only**:
- HTML5
- CSS3 (no frameworks)
- Vanilla JavaScript (ES6+)
- Google Fonts (external CDN)
- Font Awesome Icons (external CDN)

No npm, no build tools, no frameworks required!

## 🎯 Special Effects

### Neon Glow Animation
The "Happy Birthday" text glows with an animated neon effect

### Glassmorphism Cards
Semi-transparent frosted glass effect on cards with blur backdrop

### Parallax Scrolling
Story sections move at different speeds while scrolling

### Floating Animations
Elements gently float up and down for premium feel

### Smooth Transitions
All interactions use smooth cubic-bezier animations

## 🛟 Troubleshooting

**Music not playing?**
- Browser may block autoplay. Click the music button manually
- Ensure `music.mp3` is in `/assets/` folder

**Images not showing?**
- Update image paths in HTML if using custom images
- Check browser console for file not found errors

**Wishes disappearing?**
- Browser localStorage may have limits
- Clear browser data will delete wishes
- Disable incognito/private mode

**3D Card effect not working?**
- Only works on desktop with mouse events
- Mobile doesn't support 3D tilt (fallback to regular card)

## 📝 License

Free to use and modify for personal birthday celebrations!

## 💖 Created with Love

Made with HTML, CSS, JavaScript, and lots of ✨ magic for birthday celebrations!

---

**Ready to celebrate? Open `index.html` in your browser and enjoy! 🎉**
