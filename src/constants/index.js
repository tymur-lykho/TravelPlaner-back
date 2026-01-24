import path from 'node:path';

export const ACCESS_TOKEN_LIFETIME = 15 * 60 * 1000; // 15 minutes
export const REFRESH_TOKEN_LIFETIME = 24 * 60 * 60 * 1000; // 1 day

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
