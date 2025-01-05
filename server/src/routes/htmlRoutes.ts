import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// TODO: Define route to serve index.html
    //defines the route to serve the index.html file
export default router;
router.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});