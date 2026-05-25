$blogsDir = Join-Path $PSScriptRoot "blogs"
if (-Not (Test-Path -Path $blogsDir)) {
    New-Item -ItemType Directory -Path $blogsDir | Out-Null
}

$keywords = @(
    "best free base64 encoder", "how to minify css online", "free online json formatter", 
    "generate uuid v4 online", "celsius to fahrenheit converter free", "free lorem ipsum generator",
    "calculate prime numbers online", "online math logic tools", "free developer utilities",
    "fastest url encoder decode", "hex to decimal converter online", "online stopwatch timer free"
)

$blogs = @()
for ($i = 1; $i -le 100; $i++) {
    $kw = $keywords[$i % $keywords.Length]
    $slugKw = $kw -replace '\s+', '-'
    $titleKw = (Culture).TextInfo.ToTitleCase($kw)
    $blogs += [PSCustomObject]@{
        Id = $i
        Slug = "blog-$i-$slugKw"
        Title = "The Ultimate Guide to $titleKw"
        Keyword = $kw
        Desc = "Learn everything about $kw and how Omni100's free developer and mathematical tools can save you hours of work every day. No signups required."
    }
}

foreach ($blog in $blogs) {
    $title = $blog.Title
    $desc = $blog.Desc
    $slug = $blog.Slug
    $keyword = $blog.Keyword
    
    # We use a simple HTML string
    $html = @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$title - Omni100 Blogs</title>
  <meta name="description" content="$desc">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://omni100.com/blogs/$slug.html">
  
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
      <h1>$title</h1>
      <p><em>Published for global audiences | Targeting SEO: $keyword</em></p>
      
      <div class="ad-space">
        <p>Sponsored Content Space</p>
      </div>

      <h2>Why You Need a $keyword Tool in 2026</h2>
      <p>In modern development, utilizing a robust <strong>$keyword</strong> is critical. As APIs evolve and text manipulation becomes central to web apps, developers in 190 countries rely on Omni100 to execute these tasks instantly without server-side delays.</p>

      <h3>Key Benefits</h3>
      <ul>
        <li>100% Client-Side Execution for Maximum Privacy</li>
        <li>Zero Latency and Blazing Fast Performance</li>
        <li>Responsive Glassmorphic UI</li>
      </ul>
      
      <div class="cta-box">
        <h3>Ready to optimize your workflow?</h3>
        <p>Use our free tool directly on our homepage.</p>
        <a href="../index.html" style="display:inline-block; margin-top:1rem; padding:10px 20px; background:#00d4ff; color:#000; border-radius:30px; font-weight:bold;">Try Omni100 Free Now</a>
      </div>
    </article>
  </main>
</body>
</html>
"@
    Set-Content -Path (Join-Path $blogsDir "$slug.html") -Value $html -Encoding UTF8
}

# Generate index.html
$indexHTML = @"
<!DOCTYPE html>
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
"@

foreach ($blog in $blogs) {
    $slug = $blog.Slug
    $title = $blog.Title
    $keyword = $blog.Keyword
    $indexHTML += "    <div class='card'><a href='$slug.html'>$title</a><p style='font-size:0.8rem; color:#aaa;'>$keyword</p></div>`n"
}
$indexHTML += "  </div></body></html>"

Set-Content -Path (Join-Path $blogsDir "index.html") -Value $indexHTML -Encoding UTF8

# Generate sitemap.xml
$sitemap = @"
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://omni100.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
"@

foreach ($blog in $blogs) {
    $slug = $blog.Slug
    $sitemap += @"
  <url>
    <loc>https://omni100.com/blogs/$slug.html</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
"@
}
$sitemap += "</urlset>"
Set-Content -Path (Join-Path $PSScriptRoot "sitemap.xml") -Value $sitemap -Encoding UTF8

# Generate robots.txt
$robots = @"
User-agent: *
Allow: /
Sitemap: https://omni100.com/sitemap.xml
"@
Set-Content -Path (Join-Path $PSScriptRoot "robots.txt") -Value $robots -Encoding UTF8

Write-Host "Successfully generated 100 SEO blogs, sitemap.xml, and robots.txt via PowerShell"
