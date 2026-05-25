# Omni100 - Free Premium Utilities & APIs

Welcome to **Omni100**, the ultimate unified dashboard offering 100+ premium, free developer tools, text formatters, math calculators, and free API utilities.

## 🚀 Features

- **105 Fully Functional Tools:** Ranging from Base64 Encoders, UUID Generators, CSS Minifiers, to SHA-256 Hashing.
- **Client-Side Execution:** 95% of the tools run entirely in the browser using JavaScript and Web APIs (`crypto.subtle`), meaning zero server lag and maximum privacy for your data.
- **Massive SEO Content Silo:** Includes 100 programmatically generated contextual SEO blogs designed to capture long-tail keywords globally.
- **AdSense Ready:** Features strictly sized ad containers to prevent Cumulative Layout Shift (CLS) and ensure a perfect Core Web Vitals score.
- **Gemini AI Chatbot:** An integrated, floating AI chatbot powered by Google's Gemini 2.0 API. It stores API keys securely in `localStorage`.
- **Glassmorphic Aesthetic:** A beautiful, animated UI built with vanilla HTML/CSS and Lucide Icons.
- **Interactive Reporting:** A built-in `report.html` powered by Chart.js to visualize SEO readiness and traffic projections.

## 🛠 Deployment via Netlify Drop (Easiest Method)

Since Omni100 is entirely composed of static files (HTML, CSS, JS), you do not need Node.js, Git, or complex build steps to deploy it!

1. Open your web browser and go to: **[Netlify Drop](https://app.netlify.com/drop)**
2. Simply **drag and drop** the entire `omni100_website` folder into the designated circle on the screen.
3. Netlify will instantly host your website globally on a high-speed CDN and provide you with a live URL.
4. *(Optional)* Go to "Domain Management" in Netlify to link your custom domain (e.g., `omni100.com`).

## 📁 Project Structure

```text
omni100_website/
├── index.html           # Main application UI and 100-tool Bento grid
├── style.css            # Glassmorphism design and animations
├── script.js            # Tool logic, Gemini Chatbot, and DOM manipulation
├── report.html          # Interactive graphical SEO optimization report
├── report.js            # Chart.js logic for the report
├── sitemap.xml          # Dynamically generated sitemap for 100+ pages
├── robots.txt           # Crawl instructions for Googlebot
├── generate_blogs.ps1   # PowerShell script used to generate the blogs
└── blogs/               # The SEO content silo
    ├── index.html       # Blog hub
    └── blog-1-100.html  # 100 contextual long-tail articles
```

## 🤖 How the Gemini Chatbot Works

The chatbot prompts the user to securely paste their own free Gemini API key (from Google AI Studio). The key is stored in the browser's `localStorage` so it never hits our servers, keeping it 100% free for the site owner to host.

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.
