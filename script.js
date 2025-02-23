document.getElementById('fetchNews').addEventListener('click', fetchCybersecurityNews);

async function fetchCybersecurityNews() {
    const apiKey = '9c7d3100198f4ca9aee091ed1e09fe9b'; // Replace with your NewsAPI key
    const query = 'cybersecurity OR "cyber attack" OR hacking OR "data breach"';
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        // Process and filter the news articles
        const newsContainer = document.getElementById('newsContainer');
        newsContainer.innerHTML = ''; // Clear previous content

        const articles = data.articles.slice(0, 10); // Limit to 10 articles
        articles.forEach(article => {
            const newsItem = document.createElement('div');
            newsItem.classList.add('news-item');

            // Process the article data
            const title = article.title || 'No title available';
            const description = article.description || 'No description available';
            const source = article.source.name || 'Unknown source';
            const date = new Date(article.publishedAt).toLocaleDateString();
            const link = article.url || '#';

            newsItem.innerHTML = `
                <h2>${title}</h2>
                <p>${description}</p>
                <p><strong>Source:</strong> ${source} | <strong>Date:</strong> ${date}</p>
                <a href="${link}" target="_blank">Read more</a>
            `;

            newsContainer.appendChild(newsItem);
        });

        if (articles.length === 0) {
            newsContainer.innerHTML = '<p>No recent cybersecurity news found.</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        document.getElementById('newsContainer').innerHTML = '<p>Failed to load news. Please try again later.</p>';
    }
}