// report.js - Interactive Chart Initialization

Chart.defaults.color = '#fff';
Chart.defaults.font.family = "'Space Grotesk', sans-serif";

// 1. Projected Traffic Chart (Line)
const ctxTraffic = document.getElementById('trafficChart').getContext('2d');
new Chart(ctxTraffic, {
    type: 'line',
    data: {
        labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6 (Target)'],
        datasets: [{
            label: 'Projected Daily Clicks',
            data: [150, 800, 2500, 5000, 7500, 10000],
            borderColor: '#00d4ff',
            backgroundColor: 'rgba(0, 212, 255, 0.2)',
            borderWidth: 3,
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' } },
            x: { grid: { color: 'rgba(255,255,255,0.1)' } }
        }
    }
});

// 2. SEO Readiness Score (Radar)
const ctxSeo = document.getElementById('seoChart').getContext('2d');
new Chart(ctxSeo, {
    type: 'radar',
    data: {
        labels: ['Content Depth', 'Core Web Vitals', 'Schema Markup', 'Global Reach (Hreflang)', 'Internal Linking', 'User Dwell Time'],
        datasets: [{
            label: 'Before Optimization',
            data: [10, 60, 0, 0, 20, 40],
            borderColor: '#ff4d4d',
            backgroundColor: 'rgba(255, 77, 77, 0.2)',
            borderWidth: 2
        }, {
            label: 'After Optimization',
            data: [95, 90, 100, 95, 100, 85],
            borderColor: '#b100ff',
            backgroundColor: 'rgba(177, 0, 255, 0.3)',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        scales: {
            r: { 
                angleLines: { color: 'rgba(255,255,255,0.2)' },
                grid: { color: 'rgba(255,255,255,0.2)' },
                pointLabels: { color: '#fff', font: { size: 12 } },
                ticks: { display: false }
            }
        }
    }
});

// 3. Content Indexing (Doughnut)
const ctxContent = document.getElementById('contentChart').getContext('2d');
new Chart(ctxContent, {
    type: 'doughnut',
    data: {
        labels: ['Main Pages', 'Contextual SEO Blogs'],
        datasets: [{
            data: [1, 100],
            backgroundColor: ['#00d4ff', '#b100ff'],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        cutout: '70%',
        plugins: {
            legend: { position: 'bottom', labels: { padding: 20 } }
        }
    }
});
