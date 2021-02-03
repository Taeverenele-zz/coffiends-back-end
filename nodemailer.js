const nodemailer = require("nodemailer");

const sendEmail = (type, deets, addr) => {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'st.b.dev20@gmail.com',
        pass: 'yolccuxjddeihqfu',
    },
    secure: true, // upgrades later with STARTTLS -- change this based on the PORT
  });

  const mailDataUser = {
    from: 'orders@coffiends.com',
    to: addr,
    subject: "Order Placed!",
    text: "Order Placed. Pick up sson!",
    html: `<b>Thanks for the order!</b><br> Your ${deets.coffee} will be ready at ${deets.pickup_time}<br/>`,
  };

  const mailDataCafe = {
    from: 'orders@coffiends.com',
    to: addr,
    subject: "New Order!",
    text: "New order up. Hop to it.",
    html: `<b>You have a new order!</b><br> ${deets.coffee} to be ready by ${deets.pickup_time}<br/>`,
  };

  let mailData;
  if (type === "user") {
    mailData = mailDataUser;
  } else if (type === "cafe") {
    mailData = mailDataCafe;
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.status(200).send({ message: "Mail send", message_id: info.messageId });
  });
};

module.exports = { sendEmail };