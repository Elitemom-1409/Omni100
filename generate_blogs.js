const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, 'blogs');
if (!fs.existsSync(blogsDir)) {
    fs.mkdirSync(blogsDir);
}

// 100 SEO keyword clusters
const keywords = [
    "best free base64 encoder", "how to minify css online", "free online json formatter", 
    "generate uuid v4 online", "celsius to fahrenheit converter free", "free lorem ipsum generator",
    "calculate prime numbers online", "online math logic tools", "free developer utilities",
    "fastest url encoder decode", "hex to decimal converter online", "online stopwatch timer free"
];
// Generate 100 titles based on tools and keywords
const blogs = [];
for (let i = 1; i <= 100; i++) {
    const kw = keywords[i % keywords.length];
    blogs.push({
        id: i,
        slug: `blog-${i}-${kw.replace(/\s+/g, '-')}`,
        title: `The Ultimate Guide to ${kw.replace(/\b\w/g, c=>c.toUpperCase())}`,
        keyword: kw,
        desc: `Learn everything about ${kw} and how Omni100's free developer and mathematical tools can save you hours of work every day. No signups required.`
    });
}

function generateBlogHTML(blog) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${blog.title} - Omni100 Blogs</title>
  <meta name="description" content="${blog.desc}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://omni100.com/blogs/${blog.slug}.html">
  
  <style>
    :root { --font: 'Space Grotesk', sans-serif; --bg: #030305; --text: #ffffff; --glass: rgba(255,255,255,0.05); }
    body { margin: 0; background: var(--bg); color: var(--text); font-family: var(--font); line-height: 1.6; }
    header { background: var(--glass); padding: 2rem; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); }
    main { max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
    h1 { color: #00d4ff; font-size: 2.5rem; margin-bottom: 0.5rem; }
    h2 { color: #b100ff; margin-top: 2rem; }
    a { color: #00d4ff; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .ad-space { background: var(--glass); border: 1px dashed rgba(255,255,255,0.2); padding: 1rem; text-align: center; margin: 2rem 0; min-height: 90px; }
    .cta-box { background: linear-gradient(135deg, rgba(0,212,255,0.1), rgba(177,0,255,0.1)); padding: 2rem; border-radius: 12px; margin-top: 3rem; text-align: center; border: 1px solid rgba(0,212,255,0.3); }
  </style>
</head>
<body>
  <header>
    <a href="../index.html">← Back to Omni100 Tools</a>
  </header>
  
  <main>
    <article>
      <h1>${blog.title}</h1>
      <p><em>Published for global audiences | Targeting SEO: ${blog.keyword}</em></p>
      
      <div class="ad-space">
        <!-- AdSense Placeholder -->
        <p>Sponsored Content Space</p>
      </div>

      <h2>Why You Need ${blog.title.replace('The Ultimate Guide to ', '')}</h2>
      <p>In today's fast-paced digital world, efficiency is everything. Whether you are a developer, a student, or a professional, finding the right tools for tasks like <strong>${blog.keyword}</strong> can save you countless hours.</p>
      
      <h2>How Omni100 Solves This</h2>
      <p>Omni100 is designed to be the ultimate time-traversal workspace. We provide over 100 free utilities directly in your browser. Our tools run securely on the client side, meaning your data never leaves your device when performing operations like text encoding or mathematical calculations.</p>
      
      <div class="cta-box">
        <h3>Ready to optimize your workflow?</h3>
        <p>Use our free <strong>${blog.keyword.split(' ')[2] || 'tool'}</strong> directly on our homepage.</p>
        <a href="../index.html" style="display:inline-block; margin-top:1rem; padding:10px 20px; background:#00d4ff; color:#000; border-radius:30px; font-weight:bold;">Try Omni100 Free Now</a>
      </div>
    </article>
  </main>
</body>
</html>`;
}

// Generate the 100 files
blogs.forEach(blog => {
    fs.writeFileSync(path.join(blogsDir, \`\${blog.slug}.html\`), generateBlogHTML(blog));
});

// Generate blogs index
let indexHTML = \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Omni100 - SEO Blog Hub</title>
  <style>
    body { background: #030305; color: #fff; font-family: sans-serif; max-width: 1000px; margin: 0 auto; padding: 2rem; }
    h1 { text-align: center; color: #00d4ff; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; }
    .card { background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); }
    .card a { color: #00d4ff; text-decoration: none; font-weight: bold; }
    .card a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <a href="../index.html">← Back to Tools</a>
  <h1>Omni100 SEO Content Silo</h1>
  <p>100 Contextual articles designed to rank #1 globally.</p>
  <div class="grid">
\`;

blogs.forEach(blog => {
    indexHTML += \`    <div class="card"><a href="\${blog.slug}.html">\${blog.title}</a><p style="font-size:0.8rem; color:#aaa;">\${blog.keyword}</p></div>\\n\`;
});
indexHTML += \`  </div></body></html>\`;

fs.writeFileSync(path.join(blogsDir, 'index.html'), indexHTML);

// Generate sitemap.xml
let sitemap = \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://omni100.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
\`;
blogs.forEach(b => {
    sitemap += \`  <url>\\n    <loc>https://omni100.com/blogs/\${b.slug}.html</loc>\\n    <changefreq>weekly</changefreq>\\n    <priority>0.8</priority>\\n  </url>\\n\`;
});
sitemap += \`</urlset>\`;
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap);

// Generate robots.txt
const robots = \`User-agent: *
Allow: /
Sitemap: https://omni100.com/sitemap.xml
\`;
fs.writeFileSync(path.join(__dirname, 'robots.txt'), robots);

console.log("Successfully generated 100 SEO blogs, sitemap.xml, and robots.txt");
