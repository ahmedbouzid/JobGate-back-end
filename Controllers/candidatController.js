const candidatModel = require("../Models/candidatModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const { randomBytes } = require("crypto");
const multer = require("multer");
var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c33de12665e6a4",
    pass: "daa90134f3b182",
  },
});
const DOMAIN = process.env.DOMAIN;

module.exports = {
  registre: async (req, res) => {
    console.log(req);
    try {
      if (req.files) {
        console.log(req.files , '22');
        req.body["cv"] = req.files.cv[0].filename;
        req.body["image"] = req.files.image[0].filename;
      }

      //image
      //req.body["image"]=!req.file ? null  :req.file.filename;

      //nombre decyptage
      const salt = bcrypt.genSalt(30);
      const hash = await bcrypt.hashSync(req.body.password, parseInt(salt));

      const candidat = new candidatModel({
        ...req.body,
        password: hash,
        verificationCode: randomBytes(6).toString("hex"),
      });
      console.log(candidat);
      await candidat.save(candidat,
        (err, item) => {
          if (err) {
            console.log(err);
            res.status(400).json({ success: false, message: "failed", err });
          } else {
            transport.sendMail({
              form: "myname@gmail.com",
              to: item.email,
              subject: "Welcom " + item.name,
              html: `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Document</title>
                        </head>
                        <body>
                            <h1>bonjour ${item.firstname} </h1>
                            <h3>email ${item.email}</h3>
                       <a href="${DOMAIN}/auth/verify/${item.verificationCode}">Verify-now</a>
                        
                        </body>
                        </html>`,
            });
            res
              .status(201)
              .json({ success: true, message: "success", data: item });
          }
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "failed", error });
    }
  },
  getAll : async (req, res) => {
    try {
      const listCandidat = await candidatModel.find({}).populate('commentaire')
      res.status(200).json({
        message: "list of candidat",
        data: listCandidat,
      });
    } catch (error) {
      res.status(400).json({
        msg: "error" + error.message,
      });
    }
  },
  update: async (req, res) => {
    try {
      await candidatModel
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .exec((err, item) => {
          if (err) {
            res
              .status(400)
              .json({ success: false, message: "Failed to update", err });
          } else {
            res
              .status(200)
              .json({
                success: true,
                message: "upadte succefully",
                data: item,
              });
          }
        });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to update", err });
    }
  },
  delete: async (req, res) => {
    try {
      await candidatModel.findByIdAndDelete(req.params.id).exec((err) => {
        if (err) {
          res
            .status(400)
            .json({ success: false, message: "failed to delete", err });
        } else {
          res.status(200).json({ success: true, message: "delete succufully" });
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "error", error });
    }
  },
  getById: async (req, res) => {
    try {
      await candidatModel.findById(req.params.id).exec((err, item) => {
        if (err) {
          res.status(400).json({ success: false, message: "failed", err });
        } else {
          res
            .status(200)
            .json({ success: true, message: "success", data: item });
        }
      });
    } catch (error) {
      res.status(400).json({ success: false, message: "failed", err });
    }
  },
  getByName: async (req, res) => {
    try {
      await candidatModel
        .find({ firstname: req.query.firstname })
        .exec((err, item) => {
          if (err) {
            res
              .status(400)
              .json({ success: false, message: "failed to get name", err });
          } else {
            res
              .status(200)
              .json({
                success: true,
                message: "getting by name succufully",
                data: item,
              });
          }
        });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "failed to get name", err });
    }
  },
};
