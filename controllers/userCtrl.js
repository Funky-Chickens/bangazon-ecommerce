'use strict'

// updateUser

module.exports.getUserDetails = (req, res, next) => {
    const { User, PaymentOption, Order } = req.app.get('models');
    User.findAll(
      {
        include: [{
          all: true
        }],
        where: {
            id: req.session.passport.user.id
        }
      }) 
    .then( (user) => {
        let person = user[0].dataValues
        res.render('user_detail', {person,
        PaymentOption: person.PaymentOptions,
        Order: person.Orders});
    })
    .catch( (err) => {
      next(err); 
    });
  };

  module.exports.postPaymentOption = (req, res, next) => {
    const { PaymentOption } = req.app.get('models');
    PaymentOption.create({
      payment_name:req.body.payment_name,
      account:req.body.account,
      buyer_id: req.session.passport.user.id
    })
    .then( (result) => {
      res.status(200).redirect('/user');
    })
    .catch( (err) => {
       res.status(500).json(err)
    })
  }

  module.exports.removeUserPaymentOption = (req, res, next) => {
    const { User, PaymentOption } = req.app.get('models');
    console.log("test");
    PaymentOption.destroy({
      where: {
        id: req.body.id
      }
    })
    .then((result) => {
      res.redirect('/user');
    })
  }