module.exports = function(app, db) {

    app.get('/history/:userId', async (req, res) => {
        const snapshot = await db.collection(`users/${req.params.userId}/boughtTours`).get();
        const tours = [];
        snapshot.forEach(doc => {
            tours.push(doc.data());
        });
        res.send(tours);
    });

    app.post('/history/:userId', async (req, res) => {
        console.log('called history add');
        console.log(req.body);
        const snapshot = await db.collection(`users/${req.params.userId}/boughtTours`).add(req.body);
        res.send(snapshot.id);
    });
};

