const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const connection = require('./db');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key'; // Bunu güvenli bir yerden alın

app.use(bodyParser.json());
app.use(cors());
//müşteri tarafında logout sayfası için
// Kullanıcı adı ve parolaya göre user_id döndüren endpoint
app.post('/getuserid', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT user_id FROM user WHERE username = ? AND password = ?';
  connection.query(sql, [username, password], (error, results) => {
      if (error) {
          console.error('Error fetching user:', error);
          res.status(500).json({ error: 'Database error' });
      } else if (results.length === 0) {
          res.status(404).json({ error: 'User not found' });
      } else {
          res.status(200).json({ user_id: results[0].user_id });
      }
  });
});
//logout sayfasında hesabı siler
app.post('/deleteuser', (req, res) => {
  const { user_id, password } = req.body;

  const sql = 'SELECT * FROM user WHERE user_id = ? AND password = ?';
  connection.query(sql, [user_id, password], (error, results) => {
      if (error) {
          console.error('Error fetching user:', error);
          res.status(500).json({ error: 'Database error' });
      } else if (results.length === 0) {
          res.status(404).json({ message: 'User not found or incorrect password' });
      } else {
          const deleteSql = 'DELETE FROM user WHERE user_id = ?';
          connection.query(deleteSql, [user_id], (deleteError) => {
              if (deleteError) {
                  console.error('Error deleting user:', deleteError);
                  res.status(500).json({ error: 'Database error' });
              } else {
                  res.status(200).json({ message: 'User deleted successfully' });
              }
          });
      }
  });
});

  // Siparişleri getirmek için endpoint
  app.get('/users', (req, res) => {
    let sql = `
      SELECT 
        user.*,
        IFNULL(SUM(customercarpet.carpet_count), 0) AS total_carpets,
        IFNULL(SUM(customerpilow.pilow_count), 0) AS total_pilows,
        IFNULL(SUM(customerrug.rug_count), 0) AS total_rugs,
        IFNULL(SUM(customerblanket.blanket_count), 0) AS total_blankets,
        orderdetails.date_want,
        orderdetails.time
      FROM 
        user
      LEFT JOIN customercarpet ON user.user_id = customercarpet.user_id
      LEFT JOIN customerpilow ON user.user_id = customerpilow.user_id
      LEFT JOIN customerrug ON user.user_id = customerrug.user_id
      LEFT JOIN customerblanket ON user.user_id = customerblanket.user_id
      LEFT JOIN orderdetails ON user.user_id = orderdetails.user_id
      WHERE orderdetails.date_want IS NOT NULL AND orderdetails.time IS NOT NULL
      GROUP BY user.user_id, orderdetails.date_want, orderdetails.time
    `;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


app.post('/update-status', (req, res) => {
  const { user_id, state } = req.body;
  const sql = `
    INSERT INTO status (user_id, state)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE state = VALUES(state)
  `;
  connection.query(sql, [user_id, state], (err, results) => {
      if (err) throw err;
      res.json({ success: true });
  });
});

//sipariş durumunu sorgulayan endpoind
app.get('/status/:user_id', (req, res) => {
  const userId = req.params.user_id;

  const sql = `SELECT state FROM status WHERE user_id = ? ORDER BY id DESC LIMIT 1`;
  connection.query(sql, [userId], (error, results) => {
      if (error) {
          console.error('Error fetching status:', error);
          res.status(500).json({ error: 'Database error' });
      } else if (results.length === 0) {
          res.status(404).json({ message: 'No status found for the given user_id' });
      } else {
          res.status(200).json({ state: results[0].state });
      }
  });
});

//kayıt ve giriş
app.post('/register', (req, res) => {
  const { username, password, adres } = req.body;
  const query = `INSERT INTO user (username, password, adres) VALUES (?, ?, ?)`;
  console.log('sfdg');
  connection.query(query, [username, password, adres], (err, result) => {
      if (err) {
          return res.status(500).send('Failed to register'+err);
      }
      res.send('User registered successfully');
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM user WHERE username = ? AND password = ?`;
  connection.query(query, [username, password], (err, results) => {
      if (err) {
          return res.status(500).send('Failed to authenticate');
      }
      if (results.length > 0) {
          const role = (username === 'Aktepe' && password === 'aktepe') ? 'admin' : 'customer';
          res.json({ success: true, role });
      } else {
          res.status(401).send('Invalid username or password');
      }
  });
});

//müşterinin sepetine halı eklemsi için endpoind
app.post('/customercarpets', (req, res) => {
  const { user_id, carpet_count } = req.body;
  const query = 'INSERT INTO customercarpet (user_id, carpet_count) VALUES (?, ?)';
  connection.query(query, [user_id, carpet_count], (err, result) => {
      if (err) {
          console.error('Error inserting data:', err);
          res.status(500).send('Failed to add carpet.');
      } else {
          res.status(200).send('Carpet added successfully.');
      }
  });
});

//müşterinin sepetine yorgan eklemsi için endpoind
app.post('/customerpilow', (req, res) => {
  const { user_id, pilow_count } = req.body;
  const query = 'INSERT INTO customerpilow (user_id, pilow_count) VALUES (?, ?)';
  connection.query(query, [user_id, pilow_count], (err, result) => {
      if (err) {
          console.error('Error inserting data:', err);
          res.status(500).send('Failed to add pilow.');
      } else {
          res.status(200).send('Pilow added successfully.');
      }
  });
});


//müşterinin sepetine kilim eklemsi için endpoind
app.post('/customerrug', (req, res) => {
  const { user_id, rug_count } = req.body;
  const query = 'INSERT INTO customerrug (user_id, rug_count) VALUES (?, ?)';
  connection.query(query, [user_id, rug_count], (err, result) => {
      if (err) {
          console.error('Error inserting data:', err);
          res.status(500).send('Failed to add rug.');
      } else {
          res.status(200).send('rug added successfully.');
      }
  });
});

//müşterinin sepetine battaniye eklemsi için endpoind
app.post('/customerblanket', (req, res) => {
  const { user_id, blanket_count } = req.body;
  const query = 'INSERT INTO customerblanket (user_id, blanket_count) VALUES (?, ?)';
  connection.query(query, [user_id, blanket_count], (err, result) => {
      if (err) {
          console.error('Error inserting data:', err);
          res.status(500).send('Failed to add blanket.');
      } else {
          res.status(200).send('blanket added successfully.');
      }
  });
});

//siparişi tamamlamak için endpoind
app.post('/orderdetails', (req, res) => {
  const { user_id, date_want, time } = req.body;
  const query = 'INSERT INTO orderdetails (user_id, date_want, time) VALUES (?, ?, ?)';
  connection.query(query, [user_id, date_want, time], (err, result) => {
      if (err) {
          console.error('Error inserting data:', err);
          res.status(500).send('Failed to add order details.');
      } else {
          res.status(200).send('Order details added successfully.');
      }
  });
});









//aşağısı admin tarafındaki işlemler için
app.get('/customers', (req, res) => {
    const { name_surname } = req.query;
  
    let sql = `
      SELECT 
        customer.*, 
        IFNULL(JSON_ARRAYAGG(
          IF(carpet.carpet_id IS NOT NULL, 
            JSON_OBJECT(
              'carpet_id', carpet.carpet_id, 
              'length', carpet.length, 
              'width', carpet.width, 
              'price_per_square_meter', carpet.price_per_square_meter
            ), NULL)
        ), '[]') AS carpets,
        IFNULL(JSON_ARRAYAGG(
          IF(rug.rug_id IS NOT NULL, 
            JSON_OBJECT(
              'rug_id', rug.rug_id, 
              'length', rug.length, 
              'width', rug.width, 
              'price_per_square_meter', rug.price_per_square_meter
            ), NULL)
        ), '[]') AS rugs,
        IFNULL(JSON_ARRAYAGG(
          IF(pillow.unit_number IS NOT NULL, 
            JSON_OBJECT(
              'unit_number', pillow.unit_number, 
              'price_per_square_meter', pillow.price_per_square_meter
            ), NULL)
        ), '[]') AS pillows,
        IFNULL(JSON_ARRAYAGG(
          IF(blanket.unit_number IS NOT NULL, 
            JSON_OBJECT(
              'unit_number', blanket.unit_number, 
              'price_per_square_meter', blanket.price_per_square_meter
            ), NULL)
        ), '[]') AS blankets
      FROM 
        customer
      LEFT JOIN carpet ON customer.customer_id = carpet.customer_id
      LEFT JOIN rug ON customer.customer_id = rug.customer_id
      LEFT JOIN pillow ON customer.customer_id = pillow.customer_id
      LEFT JOIN blanket ON customer.customer_id = blanket.customer_id
    `;


  
    // Eğer name_surname parametresi varsa, sorguyu filtrele
    if (name_surname) {
      sql += ` WHERE name_surname = '${name_surname}'`;
    }
  
    sql += ` GROUP BY customer.customer_id`;
  
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).send('Internal server error');
        return;
      }
  
      const formattedResults = results.map(customer => ({
        ...customer,
        carpets: customer.carpets ? JSON.parse(customer.carpets).filter(c => c !== null) : [],
        rugs: customer.rugs ? JSON.parse(customer.rugs).filter(r => r !== null) : [],
        pillows: customer.pillows ? JSON.parse(customer.pillows).filter(p => p !== null) : [],
        blankets: customer.blankets ? JSON.parse(customer.blankets).filter(b => b !== null) : []
      }));
  
      res.json(formattedResults);
    });
  });

  // Müşteri arama endpoint'i
app.get('/search', (req, res) => {
    const { name } = req.query;
    
    const sql = `
      SELECT 
        c.id AS customer_id, 
        c.name AS name_surname, 
        c.order_date, 
        c.address, 
        c.phone_number, 
        GROUP_CONCAT(DISTINCT CONCAT('Carpet: ', cr.length, 'x', cr.width) SEPARATOR ', ') AS carpet,
        GROUP_CONCAT(DISTINCT CONCAT('Rug: ', r.length, 'x', r.width) SEPARATOR ', ') AS rug,
        GROUP_CONCAT(DISTINCT CONCAT('Pillow: ', p.unit_number) SEPARATOR ', ') AS pillow,
        GROUP_CONCAT(DISTINCT CONCAT('Blanket: ', b.unit_number) SEPARATOR ', ') AS blanket
      FROM 
        customer c
      LEFT JOIN 
        carpet cr ON c.id = cr.customer_id
      LEFT JOIN 
        rugs r ON c.id = r.customer_id
      LEFT JOIN 
        pillow p ON c.id = p.customer_id
      LEFT JOIN 
        blanket b ON c.id = b.customer_id
      WHERE 
        c.name LIKE ? OR c.phone_number LIKE ?
      GROUP BY 
        c.id
    `;
    
    connection.query(sql, [`%${name}%`, `%${name}%`], (err, results) => {
      if (err) {
        console.error('Error searching customers:', err);
        res.status(500).send('Internal server error');
        return;
      }
  
      res.json(results);
    });
  });
  
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

  });
  
  
  


//müşteri ekleme
app.post('/customers', (req, res) => {
  const { name_surname, phone_number, order_date, address } = req.body;

  const newCustomer = {
    name_surname,
    order_date,
    address,
    phone_number,
  };

  const sql = 'INSERT INTO customer SET ?';
  connection.query(sql, newCustomer, (err, result) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).send('Internal server error');
      return;
    }
    res.status(200).json({ ...newCustomer, customer_id: result.insertId });
  });
});

//halı ekle
app.post('/carpets', (req, res) => {
  const { customer_id, length, width, price_per_square_meter } = req.body;

  const newCarpet = {
    customer_id,
    length,
    width,
    price_per_square_meter,
  };

  // Halı eklenirken, halının alanını hesapla
  const area = length * width;

  // Halının toplam fiyatını hesapla
  const totalPrice = area * price_per_square_meter;

  // Müşterinin toplam ödemesini güncelle
  const updatePaymentSql = `
    INSERT INTO payment (customer_id, total_price) 
    VALUES (?, ?) 
    ON DUPLICATE KEY UPDATE total_price = total_price + ?;
  `;
  connection.query(updatePaymentSql, [customer_id, totalPrice, totalPrice], (paymentErr, paymentResult) => {
    if (paymentErr) {
      console.error('MySQL query error:', paymentErr);
      res.status(500).send('Internal server error');
      return;
    }

    // Halı ekleme SQL sorgusu
    const sql = 'INSERT INTO carpet SET ?';
    connection.query(sql, newCarpet, (err, result) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).send('Internal server error');
        return;
      }
      
      // İşlem başarılı
      res.status(200).json({ ...newCarpet, total_price: totalPrice });
    });
  });
});

//kilim ekle
app.post('/rugs', (req, res) => {
  const { customer_id, length, width, price_per_square_meter } = req.body;

  const newRug = {
    customer_id,
    length,
    width,
    price_per_square_meter,
  };

  // Kilim eklenirken, kilimin alanını hesapla
  const area = length * width;

  // Kilimin toplam fiyatını hesapla
  const totalPrice = area * price_per_square_meter;

  // Müşterinin toplam ödemesini güncelle
  const updatePaymentSql = `
    INSERT INTO payment (customer_id, total_price) 
    VALUES (?, ?) 
    ON DUPLICATE KEY UPDATE total_price = total_price + ?;
  `;
  connection.query(updatePaymentSql, [customer_id, totalPrice, totalPrice], (paymentErr, paymentResult) => {
    if (paymentErr) {
      console.error('MySQL query error:', paymentErr);
      res.status(500).send('Internal server error');
      return;
    }

    // Kilim ekleme SQL sorgusu
    const sql = 'INSERT INTO rug SET ?';
    connection.query(sql, newRug, (err, result) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).send('Internal server error');
        return;
      }
      
      // İşlem başarılı
      res.status(200).json({ ...newRug, total_price: totalPrice });
    });
  });
});

//yorgan ekle
app.post('/pillows', (req, res) => {
  const { unit_number, price_per_square_meter, customer_id } = req.body;

  const newPillow = {
    unit_number,
    price_per_square_meter,
    customer_id,
  };

  // Yorganın toplam fiyatını hesapla
  const totalPrice = unit_number * price_per_square_meter;

  // Müşterinin toplam ödemesini güncelle
  const updatePaymentSql = `
    INSERT INTO payment (customer_id, total_price) 
    VALUES (?, ?) 
    ON DUPLICATE KEY UPDATE total_price = total_price + ?;
  `;
  connection.query(updatePaymentSql, [customer_id, totalPrice, totalPrice], (paymentErr, paymentResult) => {
    if (paymentErr) {
      console.error('MySQL query error:', paymentErr);
      res.status(500).send('Internal server error');
      return;
    }

    // Yorgan ekleme SQL sorgusu
    const sql = 'INSERT INTO pillow SET ?';
    connection.query(sql, newPillow, (err, result) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).send('Internal server error');
        return;
      }
      
      // İşlem başarılı
      res.status(200).json({ ...newPillow, total_price: totalPrice });
    });
  });
});


//battaniye ekle
app.post('/blankets', (req, res) => {
  const { customer_id, price_per_square_meter, unit_number } = req.body;

  const newBlanket = {
    customer_id,
    price_per_square_meter,
    unit_number,
    
  };

  // Battaniyenin toplam fiyatını hesapla
  const totalPrice = unit_number * price_per_square_meter;

  // Müşterinin toplam ödemesini güncelle
  const updatePaymentSql = `
    INSERT INTO payment (customer_id, total_price) 
    VALUES (?, ?) 
    ON DUPLICATE KEY UPDATE total_price = total_price + ?;
  `;
  connection.query(updatePaymentSql, [customer_id, totalPrice, totalPrice], (paymentErr, paymentResult) => {
    if (paymentErr) {
      console.error('MySQL query error:', paymentErr);
      res.status(500).send('Internal server error');
      return;
    }

    // Battaniye ekleme SQL sorgusu
    const sql = 'INSERT INTO blanket SET ?';
    connection.query(sql, newBlanket, (err, result) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).send('Internal server error');
        return;
      }
      
      // İşlem başarılı
      res.status(200).json({ ...newBlanket, total_price: totalPrice });
    });
  });
});
//müşteri  sil
app.delete('/customers/:id', (req, res) => {
    const { id } = req.params;
  
    const deleteCarpets = 'DELETE FROM carpet WHERE customer_id = ?';
    const deleteRugs = 'DELETE FROM rug WHERE customer_id = ?';
    const deletePillows = 'DELETE FROM pillow WHERE customer_id = ?';
    const deleteBlankets = 'DELETE FROM blanket WHERE customer_id = ?';
    const deleteCustomer = 'DELETE FROM customer WHERE customer_id = ?';
  
    connection.query(deleteCarpets, [id], (err, result) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).send('Internal server error');
        return;
      }
  
      connection.query(deleteRugs, [id], (err, result) => {
        if (err) {
          console.error('MySQL query error:', err);
          res.status(500).send('Internal server error');
          return;
        }
  
        connection.query(deletePillows, [id], (err, result) => {
          if (err) {
            console.error('MySQL query error:', err);
            res.status(500).send('Internal server error');
            return;
          }
  
          connection.query(deleteBlankets, [id], (err, result) => {
            if (err) {
              console.error('MySQL query error:', err);
              res.status(500).send('Internal server error');
              return;
            }
  
            connection.query(deleteCustomer, [id], (err, result) => {
              if (err) {
                console.error('MySQL query error:', err);
                res.status(500).send('Internal server error');
                return;
              }
              res.status(200).send('Customer and associated records deleted successfully');
            });
          });
        });
      });
    });
  });
  

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
  res.send('API is up and running!');
});

app.listen(3000, () => console.log('API is running...'));
