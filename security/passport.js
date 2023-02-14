const Model = require("../Models/index");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PRIVATE_KEY;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      try{
        Model.user.findOne({where:{id:jwt_payload.id}}).then((user)=>{
            if(user!==null){
                return done(null, user);
            }else{
                return done(null, false);
            }
        })
      }catch(err){
        return done(err, false);
      }
    })
  );
};