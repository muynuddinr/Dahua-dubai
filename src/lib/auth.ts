import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface AdminPayload {
  email: string;
  id: string;
}

export const generateToken = (payload: AdminPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

export const verifyToken = (token: string): AdminPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};

export const decodeToken = (token: string): AdminPayload | null => {
  try {
    const decoded = jwt.decode(token) as AdminPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};
