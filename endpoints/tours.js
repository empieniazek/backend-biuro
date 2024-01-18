module.exports = function(app, db) {

    app.get('/tours', async (req, res) => {
        const snapshot = await db.collection('toursList').get();
        const tours = [];
        snapshot.forEach(doc => {
            tours.push(doc.data());
        });
        res.send(tours);
    });

    app.get('/tours/:id', async (req, res) => {
        const snapshot = await db.collection('toursList').doc(req.params.id).get();
        const tour = snapshot.data();
        res.send(tour);
    });

    app.post('/tours', async (req, res) => {
        const snapshot = await db.collection('toursList').add(req.body);
        res.send(snapshot.id);
    });

    app.put('/tours/:id', async (req, res) => {
        const snapshot = await db.collection('toursList').doc(req.params.id).update(req.body);
        res.send(snapshot.id);
    });

    app.delete('/tours/:id', async (req, res) => {
        const snapshot = await db.collection('toursList').doc(req.params.id).delete();
        res.send(snapshot.id);
    });
};

