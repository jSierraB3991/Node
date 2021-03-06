const express = require('express');
const mysql = require('mysql');
const bodyparse = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express()

app.use(bodyparse.json());

const conection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node20_mysql'
});

conection.connect(error =>{
    if(error) throw error;
    console.log('Database connected');
})

app.get('/', (req, res)=>{
    res.json({isSucess: true, message: 'Welcome to My API'});
});
app.get('/api/user', (req, res) =>{
    const sql = "SELECT * FROM customers";
    conection.query(sql, (error, result)=>{
        if(error) throw error;
        if(result.length > 0){
            res.json(result);
        } else{
            res.json({isSucess: false, message: 'No results'});
        }
    })
});
app.get('/api/user/:id', (req, res) =>{
    const { id } = req.params;
    const sql = `SELECT * FROM customers WHERE customers.id = ${id}`;
    conection.query(sql, (error, result)=>{
        if(error) throw error;
        if(result.length > 0){
            res.json(result[0]);
        } else{
            res.json({isSucess: false, message: 'No results'});
        }
    })
});
app.post('/api/user', (req, res) =>{
    const sql = 'INSERT INTO customers SET ?';
    const customersO = {
        name: req.body.name,
        city: req.body.city
    }
    conection.query(sql, customersO, error => {
        if(error) throw error;
        res.json({ isSucess: true, message: 'Customers Create Successfull' });
    })
});
app.put('/api/user/:id', (req, res) =>{
    const { id } = req.params;
    const customersO = {
        name: req.body.name,
        city: req.body.city
    }
    const sql = `UPDATE customers SET name = '${customersO.name}', city = '${customersO.city}' WHERE id = ${id}`;
    conection.query(sql, customersO, error => {
        if(error) throw error;
        res.json({ isSucess: true, message: 'Customers Update Successfull' });
    })
});
app.delete('/api/user/:id', (req, res) =>{
    const { id } = req.params;
    const sql = `DELETE FROM customers WHERE id = ${id}`;
    conection.query(sql, error => {
        if(error) throw error;
        res.json({ isSucess: true, message: 'Customers Delete Successfull' });
    })
});

app.listen(PORT, ()=>{
    console.log(`Server On Port ${PORT}`);
});