const express = require('express');
const bodyParser = require('body-parser'); //pour rendre le corps de la requete en objet js utilisable 
const mongoose = require('mongoose');// base de donnée

const userRoutes = require('./routes/user'); //accès aux routes user
// const saucesRoutes = require('./routes/sauces'); //accès aux routes des sauces

//connexion à la base de donnée
mongoose.connect('mongodb+srv://AnnaE:CoquilleJ56!!@cluster0.eqcby.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// activer express
const app = express();

//Ajout des CORS dans le header
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/sauces', (req, res, next) => {
    const sauces = [
      {
        _id: 'oeihfzeoi',
        name: 'Mon premier objet',
        manufacturer: 'fabriquant',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        mainPepper: 'red pepper',
        heat: 9,
        likes: 2,
        dislikes: 1,
        usersLiked: ['qsomihvqiosfd', 'qsomihfdcosfd'],
        usersDisliked: ['qsomihvqfkspo'],
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzfdgfdfeoi',
        name: 'Mon deuxième objet',
        manufacturer: 'fabriquant',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        mainPepper: 'pink pepper',
        heat: 6,
        likes: 2,
        dislikes: 1,
        usersLiked: ['qsomihvqferfd', 'qsomihvgcosfd'],
        usersDisliked: ['qsymihvqfkspo'],
        userId: 'qsomihvbios',
      },
    ];
    res.status(200).json(sauces);
  });

// post => poster une sauce
app.post('/api/sauce', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({ message: 'Objet créé !' });
});

// sauces de base dans le site (temporaire)
app.use('/api/sauces', (req, res, next) => {
    const sauces = [
        {
            _id: 'oeihfzeoi',
            name: 'Mon premier objet',
            manufacturer: 'fabriquant',
            description: 'Les infos de mon premier objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            mainPepper: 'red pepper',
            heat: 9,
            likes: 2,
            dislikes: 1,
            usersLiked: ['qsomihvqiosfd', 'qsomihfdcosfd'],
            usersDisliked: ['qsomihvqfkspo'],
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzfdgfdfeoi',
            name: 'Mon deuxième objet',
            manufacturer: 'fabriquant',
            description: 'Les infos de mon premier objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            mainPepper: 'pink pepper',
            heat: 6,
            likes: 2,
            dislikes: 1,
            usersLiked: ['qsomihvqferfd', 'qsomihvgcosfd'],
            usersDisliked: ['qsymihvqfkspo'],
            userId: 'qsomihvbios',
        },
    ];
    res.status(200).json(sauces);
});

// app.use('/api/sauces', saucesRoutes); // appliquer les routes des sauces
app.use('/api/auth', userRoutes); // appliquer les routes user

//exportation de app.js
module.exports = app;