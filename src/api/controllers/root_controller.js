const heartbeat = async (req, res) => {
    try {
        res.status(200).send();
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = { heartbeat };