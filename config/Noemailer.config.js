const nodemailer = require("nodemailer");
const user = "mahmoudbouattay178@gmail.com"; 
const pass = "soyiabmwlaqkrlav";  

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});
module.exports.sendEmailVerification = (email, link) => {
  transport
    .sendMail({
      from: 000,
      to: email,
      subject: " verification Email Maktaba.tn  ",
      html: `
      <div>
      <h1>verification Email</h1>
      <a href="${link}"> click to verif your email</a>

        </div>`,
    })
    .catch((err) => console.log(err));
};
module.exports.sendEmailToForgetPassword = (email , link )=>{
  transport
  .sendMail({
    from: 000,
    to: email,
    subject: " Forget password Maktba.tn  ",
    html: `
    <div>
    <h1> forget password </h1>
    <a href="${link}"> click to  forget your password </a>
    </div>`,
  })
  .catch((err) => console.log(err));
};
module.exports.sendContactEmail = (email,sujet,message, name)=>{
    transport
    .sendMail({
      from : email,
      to : "mahmoudbouattay178@gmail.com",
      subject : `message from  ${name} : ${sujet} `,
      text : message
    }).catch((err)=>console.log(err))
}
