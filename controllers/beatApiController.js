const BeatModel = require('../models/beatModel')
const path = require("path");
const UserModel = require("../models/userModel");
//Create
exports.create = async (req, res) => {
    if (!req.body.title && !req.body.description) {
        res.status(400).send({ message: "Entered data is empty!" });
    }

    const beat = new BeatModel({
        title: req.body.title,
        author: req.body.author,
        music: req.body.music,
    });

    await beat.save().then(data => {
        res.send({
            message:"Beat added successfully!",
            beat:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while adding beat"
        });
    });
};
//FindAll
exports.findAll = async (req, res) => {
    try {
        const beats = await BeatModel.find();
        res.status(200).json(beats);
    } catch(error) {
        console.log(error.message)
        res.status(404).json({message: error.message});
    }
};
//FindById
exports.findOne = async (req, res) => {
    try {
        const beat = await BeatModel.findById(req.params.id);
        res.send({
            message:"Beat found successfully!",
            beat: beat
        })
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
//FindByTitle
exports.findByTitle = async (req, res) => {
    try {
        if (req.body.searchReq) {
            const beat = await BeatModel.find({ title: new RegExp('^'+req.body.searchReq+'$', "i")});
            res.send({
                message:"Beat found successfully!",
                beat: beat
            });
        }
        else{
            res.status(404).send({
                message: `Beat not found`
            });
        }
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
//Update
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content is empty!"
        });
    }

    const id = req.params.id;

    await BeatModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Beat not found`
            });
        }else{
            res.send({ message: "Beat data updated successfully!" })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
//Delete
exports.destroy = async (req, res) => {
    await BeatModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Beat not found`
            });
        } else {
            res.send({
                message: "Beat has been deleted!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};