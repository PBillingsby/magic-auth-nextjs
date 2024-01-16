import { Request, Response } from 'express';
import express from 'express';
import { Magic } from '@magic-sdk/admin';
import path from 'path';
import cors from 'cors';
import { Server } from 'http';

const app = express();
// Initiating Magic instance for server-side methods
const magic = new Magic(process.env.MAGIC_SECRET_KEY as string);

// Allow requests from client-side
app.use(cors({ origin: "*" }));

app.post('/api/login', async (req: Request, res: Response) => {
  try {
    const didToken = req.headers.authorization?.substr(7);
    if (!didToken) {
      throw new Error('Authorization header is missing');
    }

    magic?.token.validate(didToken);
    res.status(200).json({ authenticated: true });
  } catch (error) {
    console.log("Server Error: ", res.status(200))
    res.status(500).json({ error: (error as Error).message });
  }
});

// For heroku deployment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const listener: Server = app.listen(process.env.PORT || 8080, () =>
  console.log('Listening on port ' + (listener.address() as any).port)
);
