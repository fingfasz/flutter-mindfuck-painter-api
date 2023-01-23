const jwt = require('jsonwebtoken');

function checkToken(req, res) {
    // check token
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
        res.status(400).send({
            message: 'No bearer token'
        });

        return {
            check: false
        };
    } else {
        try {
            const token = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET)

            return {
                check: true,
                value: token
            };
        } catch (err) {
            if (err.name == 'JsonWebTokenError') {
                res.status(401).send({
                    message: `Not authorized`
                });

                return {
                    check: false
                };
            }
        }

        return {
            value: false
        };
    }
}

module.exports = { checkToken };