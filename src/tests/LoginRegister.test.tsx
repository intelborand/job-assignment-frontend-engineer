import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import LoginRegister from '../LoginRegister';

beforeEach(() => {
    localStorage.clear();
});

test('submits login form and redirects to home on success', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({
            user: {
                bio: '',
                email: 'alice@example.com',
                image: '',
                token: 'token',
                username: 'alice'
            }
        }),
        ok: true
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    const history = createMemoryHistory({ initialEntries: ['/login'] });
    render(
        <Router history={history}>
            <LoginRegister />
        </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'I_<3-R0ber7' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
        expect(history.location.pathname).toBe('/');
    });

    expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:3000/api/users/login',
        expect.objectContaining({ method: 'POST' })
    );
    expect(localStorage.getItem('auth-user')).toContain('alice@example.com');
});
