import { FormEvent, useMemo, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import { definitions } from './types/api';

const AUTH_STORAGE_KEY = 'auth-user';

export default function LoginRegister() {
    const history = useHistory();
    const storedUser = useMemo(() => localStorage.getItem(AUTH_STORAGE_KEY), []);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email.trim() || !password.trim()) {
            setError('Email and password are required.');
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch('http://localhost:3000/api/users/login', {
                body: JSON.stringify({
                    user: {
                        email: email.trim(),
                        password
                    }
                } as definitions['LoginUserRequest']),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            });

            if (!response.ok) {
                throw new Error('Invalid email or password');
            }

            const data: definitions['UserResponse'] = await response.json();
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data.user));
            history.push('/');
        } catch {
            setError('Invalid email or password.');
        } finally {
            setIsLoading(false);
        }
    };

    if (storedUser) {
        return <Redirect to="/" />;
    }

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign in</h1>
                        <p className="text-xs-center">Use alice@example.com or bob@example.com credentials.</p>

                        {error && (
                            <ul className="error-messages">
                                <li>{error}</li>
                            </ul>
                        )}

                        <form onSubmit={handleSubmit}>
                            <fieldset className="form-group">
                                <input
                                    className="form-control form-control-lg"
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="Email"
                                    type="email"
                                    value={email}
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    className="form-control form-control-lg"
                                    onChange={(event) => setPassword(event.target.value)}
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                />
                            </fieldset>
                            <button className="btn btn-lg btn-primary pull-xs-right" disabled={isLoading} type="submit">
                                {isLoading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
