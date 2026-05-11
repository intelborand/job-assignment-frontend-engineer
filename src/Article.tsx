import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { definitions } from './types/api';

type ArticleRouteParams = {
    slug: string;
};

type ArticleProps = RouteComponentProps<ArticleRouteParams>;

export default function Article({ match }: ArticleProps) {
    const [article, setArticle] = useState<definitions['Article'] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadArticle = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(`http://localhost:3000/api/articles/${match.params.slug}`);

                if (!response.ok) {
                    throw new Error('Unable to load article');
                }

                const data: definitions['SingleArticleResponse'] = await response.json();
                setArticle(data.article);
            } catch {
                setError('Failed to load article.');
            } finally {
                setIsLoading(false);
            }
        };

        void loadArticle();
    }, [match.params.slug]);

    if (isLoading) {
        return (
            <div className="container page">
                <p>Loading article...</p>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="container page">
                <p>{error ?? 'Article not found.'}</p>
            </div>
        );
    }

    return (
        <>
            <div className="article-page">
                <div className="banner">
                    <div className="container">
                        <h1>{article.title}</h1>

                        <div className="article-meta">
                            <a href={`/#/profile/${article.author.username}`}>
                                <img src={article.author.image} />
                            </a>
                            <div className="info">
                                <a href={`/#/profile/${article.author.username}`} className="author">
                                    {article.author.username}
                                </a>
                                <span className="date">{new Date(article.createdAt).toDateString()}</span>
                            </div>
                            <button className="btn btn-sm btn-outline-secondary" type="button">
                                <i className="ion-plus-round" />
                                &nbsp; Follow {article.author.username}
                            </button>
                            &nbsp;&nbsp;
                            <button className="btn btn-sm btn-outline-primary" type="button">
                                <i className="ion-heart" />
                                &nbsp; Favorite Post <span className="counter">({article.favoritesCount})</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="container page">
                    <div className="row article-content">
                        <div className="col-md-12">
                            <p>{article.body}</p>
                        </div>
                    </div>

                    <hr />

                    <div className="article-actions">
                        <div className="article-meta">
                            <a href={`/#/profile/${article.author.username}`}>
                                <img src={article.author.image} />
                            </a>
                            <div className="info">
                                <a href={`/#/profile/${article.author.username}`} className="author">
                                    {article.author.username}
                                </a>
                                <span className="date">{new Date(article.createdAt).toDateString()}</span>
                            </div>
                            <button className="btn btn-sm btn-outline-secondary" type="button">
                                <i className="ion-plus-round" />
                                &nbsp; Follow {article.author.username}
                            </button>
                            &nbsp;
                            <button className="btn btn-sm btn-outline-primary" type="button">
                                <i className="ion-heart" />
                                &nbsp; Favorite Post <span className="counter">({article.favoritesCount})</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
