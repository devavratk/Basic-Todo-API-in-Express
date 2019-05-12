// Getting required modules
const express = require('express');
const router = express.Router();

// Data file on which we will perform operations
const data = [
    {id: 1, title: 'Finalize project', order: 1, completed: false, createdOn: new Date()},
    {id: 2, title: 'Book ticket to London', order: 2, completed: false, createdOn: new Date()},
    {id: 3, title: 'Finish last article', order: 3, completed: false, createdOn: new Date()},
    {id: 4, title: 'Get a new t-shirt', order: 4, completed: false, createdOn: new Date()},
    {id: 5, title: 'Create dinner reservation', order: 5, completed: false, createdOn: new Date()},
];

// Show all the items in data 
router.get('/', (req, res) => {
    res.status(200).json(data);
});

// Show specific id entry from data if present
router.get('/:id', (req, res) => {
    let found = data.find((item) => {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    };
});

// Add new record in data (provide "title" in body while sending this request)
router.post('/', (req, res) => {
    let allid = data.map(item => item.id);
    let allorder = data.map(item => item.order);
    let maxid = allid.length > 0 ? Math.max.apply(Math, allid)+1 : 1;
    let maxorder = allorder.length > 0 ? Math.max.apply(Math, allorder)+1 : 1;

    let newitem = {
        id: maxid, 
        title: req.body.title,
        order: maxorder,
        completed: false,
        createdOn: new Date()
    }
    
    data.push(newitem);
    res.status(201).json(newitem);
});

// Replace specified id's record with user given information (provide "title", "order" 
// and "completed" in body while sending this request)
router.put('/:id', (req, res) => {
    let found = data.find((item) => {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        let itemIndex = data.indexOf(found);
        let newitem = {
            id: found.id, 
            title: req.body.title,
            order: req.body.order,
            completed: req.body.completed,
        }
        data.splice(itemIndex, 1, newitem);
        res.sendStatus(204)
    } else {
        res.sendStatus(404);
    };
});

// Delete specified id's record if present
router.delete('/:id', (req, res) => {
    let found = data.find((item) => {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        let itemIndex = data.indexOf(found);
        data.splice(itemIndex, 1);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

// Exporting this router
module.exports = router;