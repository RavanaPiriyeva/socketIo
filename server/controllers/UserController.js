
const { User } = require("../models/User");


const userController = {


    register: (req, res) => {

        User.findOne({ email: req.body.email })
            .then(data => {
                if (!data) {
                    var user = new User({
                        email: req.body.email,
                        password: req.body.password,
                        name: req.body.name,
                    });

                    user.save()
                        .then(saveRes => {
                            res.json(saveRes)
                        })
                        .catch(err => {
                            res.status(500).json(err)
                        })
                }
                else {
                    res.json({ "msg": "Bu email sisteme kayıtlı!" })
                }
            })

    },

    login: (req, res) => {
        User.findOne({ email: req.body.email, password: req.body.password })
            .then(data => {
                if (data) {
                    // data.socketId = req.body.socketId;
                    // console.log("socket user id" ,data.socketId)
                    // console.log("socket user id" ,req.body.socketId) // Socket ID değerini güncelle
                    // data.save() // Kullanıcıyı kaydet (socketId değerini güncellemek için)
                    //     .then(savedUser => {
                    //         res.json(savedUser);
                    //     })
                    //     .catch(err => {
                    //         res.status(500).json(err);
                    //     });
                    data.socketId = req.body.socketId
                    data.save()
                    res.json(data);

                }
                else {
                    res.status(404).json({ "msg": "Email or password error" });
                }
            });
    },
    getAll: (req, res) => {

        User.find()
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },

}


module.exports = {
    userController
}


//kullanıcı şifremi unuttum diyip email girdikten sonra 1 dk içerisinde code girmek zorunda!

//3 den fazla kodu yanlış giremez!
