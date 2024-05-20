const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const connection = require('./db');

app.use(bodyParser.json());
app.use(cors());

// Müşteri ekleme
app.post('/customers', (req, res) => {
    const { name_surname, phone_number, order_date, address } = req.body;

    const newCustomer = {
        name_surname,
        order_date,
        address,
        phone_number
    };

    const sql = 'INSERT INTO customer SET ?';
    connection.query(sql, newCustomer, (err, result) => {
        if (err) {
            console.error('MySQL query error:', err);
            res.status(500).send('Internal server error');
            return;
        }
        res.status(200).json(newCustomer);
    });
});

// Müşteri arama ve listeleme
app.get('/customers', (req, res) => {
    const { name_surname } = req.query;
    let sql = 'SELECT * FROM customer';
    
    if (name_surname) {
        sql += ' WHERE name_surname LIKE ?';
    }

    connection.query(sql, [`%${name_surname}%`], (err, results) => {
        if (err) {
            console.error('MySQL query error:', err);
            res.status(500).send('Internal server error');
            return;
        }
        res.json(results);
    });
});

// Müşteri silme
app.delete('/customers/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM customer WHERE customer_id = ?';

    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error('MySQL query error:', err);
            res.status(500).send('Internal server error');
            return;
        }
        res.status(200).send('Customer deleted successfully');
    });
});

// Tüm müşterileri silme
app.delete('/customers', (req, res) => {
    const sql = 'DELETE FROM customer';

    connection.query(sql, (err, result) => {
        if (err) {
            console.error('MySQL query error:', err);
            res.status(500).send('Internal server error');
            return;
        }
        res.status(200).send('All customers deleted successfully');
    });
});

app.get('/api', (req, res) => {
    res.send('Api standing!');
});

app.listen(3000, () => console.log('API çalışıyor...'));
