import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Valid if the token exists
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // Separate the token by taking only the second position
  const [, token] = authHeader.split(' ');

  try {
    // Performs token decoding
    const decoded = await promisify(jwt.verify)(
      token,
      'b40cf670270ea2471d60f046510ded3c'
    );

    // Leaves or user ID globally within the request
    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
