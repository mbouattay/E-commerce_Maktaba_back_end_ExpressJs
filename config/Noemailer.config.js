const nodemailer = require("nodemailer");
const user = "mahmoudbouattay178@gmail.com"; // hedhi t7ot feha l email 
const pass = "soyiabmwlaqkrlav"; // houni lazmek ta3mel generation lel code hedha gmail apps 

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});
module.exports.sendEmailVerification = (email, link) => {
  // transport houwa jesr from chkoun to amal  html body message chnouwa f wostou
  transport
    .sendMail({
      from: 000,
      to: email,
      subject: " verification Email Maktaba.tn  ",
      html: `
      <div>
      <h1>verification Email</h1>
      <a href="http://${link}"> click to verif your email</a>

        </div>`,
    })
    .catch((err) => console.log(err));
};
