'use strict'

// updateUser

module.exports.getUserDetails = (req, res, next) => {
    const { User, PaymentOptions } = req.app.get('models');
    console.log('payment option?', PaymentOptions);
    User.findAll(
      {
        include: [{
          model: PaymentOptions
        }],
        where: {
            id: req.session.passport.user.id
        }
      }) 
    .then( (user) => {
        let person = user[0].dataValues
        res.render('user_detail', {person,
        PaymentOptions: person.PaymentOptions});
    })
    .catch( (err) => {
      next(err); 
    });
  };

  module.exports.postPaymentOption = (req, res, next) => {
    const { PaymentOptions } = req.app.get('models');
    PaymentOptions.create({
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