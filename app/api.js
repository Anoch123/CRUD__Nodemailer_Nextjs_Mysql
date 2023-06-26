const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');
const nodemailer = require('nodemailer');

const app = express();
const cors = require('cors');

app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/insertToTbl', (req, res) => {
    const requestData = JSON.parse(Object.keys(req.body)[0]);
    const { id, fullName, emailAddress, age, DOB, education, address, cityName, zipCode, job, note, gender, citizen, content } = requestData;

    let citizenDet = citizen === 'true' ? citizen : '';

    if(id == ''){
        connection.query(`SELECT COUNT(*) AS count FROM personstbl WHERE fullname = '${fullName}'`, (checkError, checkResult) => {
            if(checkResult){
                const recordCount = checkResult[0].count;
    
                if (recordCount > 0) {
                    res.status(201).json({ message: 'Full name already exists.Please try a something new!' });
                } else {
                    connection.query(`INSERT INTO personstbl (fullname, emial, age, dob, education, address, city, zipCode, job, note, gender, srilankan, desciption) 
                        VALUES ('${fullName}', '${emailAddress}', '${age}' , '${DOB}', '${education}', '${address}' ,'${cityName}' , '${zipCode}' , '${job}', '${note}', '${gender}', '${citizenDet}', '${content}')`, (error, result) => {
                        if(result){
                            res.status(200).json({ message: 'Data inserted successfully' });
                        } else {
                            console.error('Error executing MySQL query:', error);
                            res.status(500).json({ error });
                        }
                    });
                }
            } else {
                console.error('Error executing MySQL query:', checkError);
                res.status(500).json({ checkError });
            }
        });
    } else {
        
        connection.query(`UPDATE personstbl SET fullname= '${fullName}',emial= '${emailAddress}',age= '${age}',dob= '${DOB}',
                    education= '${education}',address='${address}',city='${cityName}',zipCode='${zipCode}', job='${job}', note='${note}', gender='${gender}', srilankan='${citizenDet}', desciption='${content}' WHERE ID = '${id}'`, (errorUpdate, resultUpdate) => {
            if(resultUpdate){
                res.status(200).json({ message: 'Data updated successfully' });
            } else {
                console.error('Error executing MySQL query:', errorUpdate);
                res.status(500).json({ errorUpdate });
            }
        });
    }
});

app.get('/api/getFromTbla', (req, res) => {

    connection.query('SELECT * FROM `personstbl` ORDER BY ID DESC', (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.sendStatus(500);
            return;
        }
        res.status(200).json({ data: results });
    });
});

app.post('/api/getDataAboutClients', (req, res) => {
    const requestData = JSON.parse(Object.keys(req.body)[0]);
    
    connection.query(`SELECT * FROM personstbl WHERE ID = ${requestData}`, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.sendStatus(500);
            return;
        }
        
        if (results.length > 0) {
            const data = results[0];
            res.status(200).json({ data });
        } else {
            res.status(200).json({ data: null });
        }
    });
});

app.post('/api/deleteClients', (req, res) => {
    const requestData = JSON.parse(Object.keys(req.body)[0]);
    
    connection.query(`DELETE FROM personstbl WHERE ID = ${requestData}`, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.sendStatus(500);
            return;
        }
        
        if (results.affectedRows > 0) {
            res.status(200).json({ message: 'Client Deleted Successfully!' });
        } else {
            res.status(200).json({ message: 'Something went wrong while deleting client. Please try again!' });
        }
    });
});

app.post('/api/send_email', (req, res) => {
    const { name, email, message } = req.body;
  
    // Create a transporter using your email service provider's SMTP settings
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'testemailofreactnative@gmail.com',
        pass: 'iokrpqydqfgelszg'
      }
    });
  
    // Configure the email options
    const mailOptions = {
      from: 'testemailofreactnative@gmail.com',
      to: email,
      subject: 'New Message Subject',
      text: `Hello ${name},\n\nThank you for your message. Here's a copy:\n\n${message}`
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(201).json({ message: 'Ooops! Something went wrong while sending email!' });
      } else {
        res.status(200).json({ message: 'Email sent successfully!' });
      }
    });
  });

// Start the server
app.listen(3200, () => {
console.log('Server is running on port 3000');
});