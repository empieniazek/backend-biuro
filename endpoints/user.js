module.exports = function(app, db) {

    app.get('/users/:id', async (req, res) => {
        const snapshot = await db.collection('users').doc(req.params.id).get();
        const user = snapshot.data();
        res.send(user);
    });
};

