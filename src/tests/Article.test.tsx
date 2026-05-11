import { render, screen, waitFor } from '@testing-library/react';
import { RouteComponentProps } from 'react-router-dom';

import Article from '../Article';

type ArticleRouteParams = {
    slug: string;
};

const routeProps = {
    history: {} as RouteComponentProps<ArticleRouteParams>['history'],
    location: {} as RouteComponentProps<ArticleRouteParams>['location'],
    match: {
        isExact: true,
        params: { slug: 'first-article' },
        path: '/article/:slug',
        url: '/article/first-article'
    }
} as RouteComponentProps<ArticleRouteParams>;

test('loads and renders article details by slug', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({
            article: {
                author: {
                    bio: '',
                    following: false,
                    image: '',
                    username: 'alice'
                },
                body: 'Rendered body text',
                createdAt: '2026-05-10T10:00:00.000Z',
                description: 'Article description',
                favorited: false,
                favoritesCount: 7,
                slug: 'first-article',
                tagList: [],
                title: 'Rendered Article Title',
                updatedAt: '2026-05-10T10:00:00.000Z'
            }
        }),
        ok: true
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    render(<Article {...routeProps} />);

    await waitFor(() => {
        expect(screen.getByText('Rendered Article Title')).toBeInTheDocument();
    });

    expect(screen.getByText('Rendered body text')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/api/articles/first-article');
});
