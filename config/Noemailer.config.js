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
      sender : email,
      to : "mahmoudbouattay178@gmail.com",
      subject : `message from  ${name} : ${sujet} ${email}`,
      text : message
    }).catch((err)=>console.log(err))
}
module.exports.acceptationDemendePartenariat = (email,password) => {
  transport
    .sendMail({
      from: 000,
      to: email,
      subject: " acceptation demende  de partenariat ",
      html: `
      <div>
      <h1> bienvenue chez maktba.tn </h1>
      <p> votre  username :${email}<br/> password : ${password}</p>

        </div>`,
    })
    .catch((err) => console.log(err));
};
module.exports.DemendePartenariatRejected = (email) => {
  transport
    .sendMail({
      from: 000,
      to: email,
      subject: " une demande de partenariat refuse ",
      html: `
      <div>
      <h1> bienvenue chez maktba.tn </h1>
      <p> votre email deja exist verifie votre demende </p>

        </div>`,
    })
    .catch((err) => console.log(err));
};