import { useEffect, useState } from 'react';
import { definitions } from './types/api';
import './styles/ArticleList.css';
import ArticleCard from 'components/ArticleCard';

let cachedArticles: definitions['MultipleArticlesResponse']['articles'] | null = null;

export default function ArticleList() {
    const [articles, setArticles] = useState<definitions['MultipleArticlesResponse']['articles']>(cachedArticles ?? []);
    useEffect(() => {
        if (cachedArticles) {
            return;
        }

        const loadArticles = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/articles');
                const data: definitions['MultipleArticlesResponse'] = await response.json();
                setArticles(data.articles);
                cachedArticles = data.articles;
            } catch (error) {
                console.error('Failed to fetch data from localhost:3000', error);
            }
        };

        void loadArticles();
    }, []);

    return (
        <>
            <div className="home-page">
                <div className="banner">
                    <div className="container">
                        <h1 className="logo-font">conduit</h1>
                        <p>A place to share your knowledge.</p>
                    </div>
                </div>

                <div className="container page">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="feed-toggle">
                                <ul className="nav nav-pills outline-active">
                                    <li className="nav-item">
                                        <a className="nav-link disabled" href="">
                                            Your Feed
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="">
                                            Global Feed
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="article-grid">
                                {articles.length && articles.map((article) => (
                                    <ArticleCard article={article} key={article.slug} />
                                ))}
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="sidebar">
                                <p>Popular Tags</p>

                                <div className="tag-list">
                                    <a href="" className="tag-pill tag-default">
                                        programming
                                    </a>
                                    <a href="" className="tag-pill tag-default">
                                        javascript
                                    </a>
                                    <a href="" className="tag-pill tag-default">
                                        emberjs
                                    </a>
                                    <a href="" className="tag-pill tag-default">
                                        angularjs
                                    </a>
                                    <a href="" className="tag-pill tag-default">
                                        react
                                    </a>
                                    <a href="" className="tag-pill tag-default">
                                        mean
                                    </a>
                                    <a href="" className="tag-pill tag-default">
                                        node
                                    </a>
                                    <a href="" className="tag-pill tag-default">
                                        rails
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
