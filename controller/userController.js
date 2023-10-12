const bcrypt = require('bcrypt')
const cache = require('memory-cache')
//const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')
const { JWT_SIGN } = require('../config/jwt.js')
const StandardError = require('../utils/standard-error.js')

const registerService = async (req, username, password, role) => {
  const user = await req.db.collection('users').findOne({ username })
    
  if (user) {
    throw new Error('Username already exists')
  } 
  
  const hashedPassword = await bcrypt.hash(password, 8) // return !@#123
  
  const newUser = await req.db.collection('users').insertOne({ username, password: hashedPassword, role })
  
  return newUser
}

const register = async (req, res, next) => {
  const { username, password } = req.body
  
  try {
    const newUser = await registerService(req, username, password)
    
    res.status(200).json({
      message: 'User successfully registered',
      data: newUser,
    })
  } catch (error) {
    const standardError = new StandardError({
      message: error.message || 'Error while registering user',
      status: 500
    })
    
    next(standardError)
  }
}

const login = async (req, res) => {
  const { username, password } = req.body
  const user = await req.db.collection('users').findOne({ username })
  
  /*const isPasswordCorrect = await bcrypt.compare(password, user.password) 
  
  if (isPasswordCorrect) {
    const token = jwt.sign({ username: user.username, id: user._id, role: user.role }, JWT_SIGN)
    res.status(200).json({
      message: 'User successfully logged in',
      data: token
    })
  } else {
    res.status(400).json({ error: 'Password is incorrect' })
  }
  
}*/
  const isAuth = await User.authenticate(user.username, password);
  if (!user || !isAuth) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }
  const { accesToken, expireAt, refreshToken } = User.generateToken(user);
  res.cookie('accesToken', accesToken, { httpOnly: true, expire: expireAt });
  res.cookie('refreshToken', refreshToken, { httpOnly: true, expire: expireAt });
  res.json();
  }


const logout = async (req, res) => {
  res.clearCookie('accesToken');
  res.clearCookie('refreshToken');
  res.json();
}

const passwordResetRequest = async (req, res) => {
      // untuk minta kunci reset password
      const { email } = req.body;
      const user = await User.get({ email: email });
      if (!user) {
        res.status(400).json({ error: "some error" });
        return;
      }
      const key = Math.random().toString(36).substring(2, 15);
      // set cache 5 minutes
      cache.put(key, user.email, 25 * 1 * 1000);
      sendEmail(user.email, key);
      res.json({ message: "Password reset email sent" });
}

const passwordReset = async (req, res) => {
  const { password } = req.body;
  const { key } = req.query;
  const email = cache.get(key); // if expired this is null
  console.log(key);
  console.log(email)
  console.log(cache.keys());
  if (!email) {
    res.status(400).json({ error: "Invalid token" });
    return;
  }
  const user = await User.get({ email: email });
  if (!user) {
    res.status(400).json({ error: "error" });
    return;
  }

  await user.updateOne({ password: User.make_password(password) });
  // jika sukses kunci dihapus
  cache.del(key);
  res.json({ message: "Password reset success" });
}


module.exports = {
  register,
  login,
  logout,
  passwordResetRequest,
  passwordReset
}