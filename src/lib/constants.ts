import { dev } from '$app/environment';

export const SITE_URL = dev ? 'http://localhost:5173' : 'https://bearby.io';
export const API_URL = dev ? 'http://localhost:8080' : 'https://api.bearby.io';
