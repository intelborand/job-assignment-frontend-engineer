import { render, screen, waitFor } from '@testing-library/react';

import ArticleList from '../ArticleList';

const articlesResponse = {
    articles: [
        {
            author: {
                bio: '',
                following: false,
                image: '',
                username: 'alice'
            },
            body: 'Body',
            createdAt: '2026-05-10T10:00:00.000Z',
            description: 'First article description',
            favorited: false,
            favoritesCount: 2,
            slug: 'first-article',
            tagList: [],
            title: 'First Article',
            updatedAt: '2026-05-10T10:00:00.000Z'
        }
    ],
    articlesCount: 1
};

test('fetches and renders articles', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(articlesResponse),
        ok: true
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    render(<ArticleList />);

    await waitFor(() => {
        expect(screen.getByText('First Article')).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/api/articles');
});
