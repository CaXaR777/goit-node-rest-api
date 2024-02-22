const express = require('express');

const authRouter = express.Router();
const { validateBody, authenticate } = require('../helpers');//y
const { userSchemas,  reVerificationSchema } = require('../models/user');
const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  reVerification,
} = require('../controllers/auth');
const {upload, resizeImage} = require('../helpers');

authRouter.post(
  '/register',
  validateBody(userSchemas.registerSchema),
  register
);
authRouter.post('/login', validateBody(userSchemas.logInSchema), login);
authRouter.get('/current', authenticate, getCurrent);
authRouter.post('/logout', authenticate, logout);
authRouter.patch('/subscription', authenticate, updateSubscription);
authRouter.patch(
    '/avatars',
    authenticate,
    upload.single('avatar'),
    resizeImage,
    updateAvatar
  );

authRouter.get("/verify/:verificationToken", verifyEmail);

authRouter.post("/verify", validateBody(reVerificationSchema), reVerification);


module.exports = authRouter;