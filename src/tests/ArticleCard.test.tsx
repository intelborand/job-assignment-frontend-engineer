import { render, screen } from '@testing-library/react';

import ArticleCard from '../components/ArticleCard';
import { definitions } from '../types/api';

const article: definitions['Article'] = {
    author: {
        bio: '',
        following: false,
        image: '',
        username: 'alice'
    },
    body: 'Body',
    createdAt: '2026-05-10T10:00:00.000Z',
    description: 'Article description',
    favorited: false,
    favoritesCount: 5,
    slug: 'test-article',
    tagList: [],
    title: 'Test Article',
    updatedAt: '2026-05-10T10:00:00.000Z'
};

test('renders article card with fallback avatar letter', () => {
    render(<ArticleCard article={article} />);

    expect(screen.getByText('Test Article')).toBeInTheDocument();
    expect(screen.getByText('Article description')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
});
