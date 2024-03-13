function basicAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('Unauthorized');
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    if (!username || !password) {
        return res.status(401).send('Unauthorized');
    }

    if (username === 'admin' && password === 'admin') {
        next();
    } else {
        return res.status(401).send('Unauthorized');
    }

    req.user = { username, password };
    next();
}

module.exports = basicAuth
