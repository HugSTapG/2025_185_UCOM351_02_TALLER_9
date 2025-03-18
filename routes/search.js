const express = require('express');
const router = express.Router();

// @ts-ignore
const { Sequelize, Op } = require('sequelize');
const Foto = require('../models').foto;
const Etiqueta = require('../models').etiqueta;

// @ts-ignore
router.get('/findAll/json', function (req, res, next) {

    Foto.findAll({
        attributes: { exclude: ["updatedAt"] },
        include: [{
            model: Etiqueta,
            attributes: ['texto'],
            through: { attributes: [] }
        }],
    })
        .then(fotos => {
            res.json(fotos);
        })
        .catch(error =>
            res.status(400).send(error))
});

// @ts-ignore
router.get('/findAll/view', function (req, res, next) {
    // @ts-ignore
    const baja = parseFloat(req.query.c_baja);
    // @ts-ignore
    const alta = parseFloat(req.query.c_alta);

    Foto.findAll({
        attributes: { exclude: ["updatedAt"] },
        include: [{
            model: Etiqueta,
            attributes: ['texto'],
            through: { attributes: [] }
        }],
        where: {
            calificacion: {
                [Op.between]: [baja, alta]
            }
        }
    })
        .then(fotos => {
            res.render('search', { title: 'Search', arrFotos: fotos });
        })
        .catch(error =>
            res.status(400).send(error))
});

// @ts-ignore
router.get('/findAllByRate/json', function (req, res, next) {
    // @ts-ignore
    let lower = parseFloat(req.query.lower);
    // @ts-ignore
    let higher = parseFloat(req.query.higher);

    Foto.findAll({
        attributes: {
            exclude:
                ["updatedAt"]
        },
        include: [{
            model: Etiqueta,
            attributes: ['texto'],
            through: { attributes: [] }
        }],
        where: {
            calificacion: {
                [Op.between]: [lower, higher]
            }
        }
    })
        .then(fotos => {
            res.json(fotos);
        })
        .catch(error =>
            res.status(400).send(error))
});

// @ts-ignore
router.get('/findAllById/:id/json', function (req, res, next) {

    let id = parseInt(req.params.id);

    Foto.findAll({
        attributes: {
            exclude: ["updatedAt"]
        },
        include: [{
            model: Etiqueta,
            attributes: ['texto'],
            through: { attributes: [] }
        }],
        where: {
            [Op.and]: [
                { id: id }
            ]
        }
    })
        .then(fotos => {
            res.json(fotos);
        })
        .catch(error =>
            res.status(400).send(error))

});

module.exports = router;
