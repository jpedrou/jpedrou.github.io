import articles from "./data.js";

const searchTerm = document.querySelector(".search")
const wrapper = document.querySelector(".articles-wrapper");
const message = document.querySelector(".nofound");

function renderArticles(articles) {
    if (!wrapper) return;

    if (articles.length === 0) {
        wrapper.style.display = "none";
        return;
    }
    wrapper.style.display = "flex";
    wrapper.innerHTML = articles.map(article => {
        const tags = article.tags.map(tag => `<p class="tag">${tag}</p>`).join("");

        return `
            <div class="article-group">
                <p class="article-name">${article.name}</p>
                <p class="article-subtitle">${article.subtitle}</p>
                <div class="article-tags">${tags}</div>
                <hr>
                <div class="button-wrapper"><button onclick="window.location.href='${article.path}'">Go to article</button></div>
            </div>
        `;
    }).join("");

}

renderArticles(articles);

if (searchTerm) {
    searchTerm.addEventListener('input', function (event) {
        const value = event.target.value.toLowerCase();
        const filteredArticles = articles.filter(
        article => article.name.toLocaleLowerCase().includes(value) 
        || article.tags.some(tag => tag.toLowerCase().includes(value)) 
        || article.subtitle.toLowerCase().includes(value));

        if (filteredArticles.length === 0) {
            const strong = document.createElement("strong");
            strong.textContent = value;
            message.textContent = "No articles found for the";
            message.appendChild(strong)
            message.append(" term");

        } else {
            if (message) message.textContent = "";
        }

        renderArticles(filteredArticles);
    })
}




