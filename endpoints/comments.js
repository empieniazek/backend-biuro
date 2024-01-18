module.exports = function(app, db) {

    app.get('/comments/:id', async (req, res) => {
        const snapshot = await db.collection('comments').where('TourId', '==', req.params.id).get();

        const comments = [];
        snapshot.forEach(doc => {
            comments.push(doc.data());
        });
        res.send(comments);
    });

    app.post('/comments/', async (req, res) => {
        const snapshot = await db.collection('comments').add(req.body);
        res.send(snapshot.id);
    });

    app.delete('/comments/:id', async (req, res) => {
        const snapshot = await db.collection('comments').doc(req.params.id).delete();
        res.send(snapshot.id);
    });
};

