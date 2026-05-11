import { definitions } from 'types/api';
import '../styles/ArticleCard.css';

export default function ArticleCard({ article }: { article: definitions['Article'] }) {
    return (
        <div className="article-preview" key={article.slug}>
            <div className="article-meta">
                <a className="avatar" href={`/#/profile/${article.author.username}`}>
                    {article.author.image ? (
                        <img src={article.author.image} />
                    ) : (
                        <span className='avatarText'>{article.author.username?.charAt(0).toUpperCase()}</span>
                    )}
                </a>
                <div className="info">
                    <a href={`/#/profile/${article.author.username}`} className="author">
                        {article.author.username}
                    </a>
                    <span className="date">{new Date(article.createdAt).toDateString()}</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart" /> {article.favoritesCount}
                </button>
            </div>
            <a href={`/#/article/${article.slug}`} className="preview-link">
                <h1>{article.title}</h1>
                <p>{article.description}</p>
                <span>Read more...</span>
            </a>
        </div>
    );
}