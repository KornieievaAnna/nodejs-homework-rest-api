const express = require("express");

const ctrl = require("../../controllers/users");

const {
  authenticate,
  validateBody,
  validateSubscription,
  upload,
} = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

//upload.fields([{name:"avatar", maxCount:1}, {name:"second-avatar", maxCount:2}]) - коли очікуємо файли в кількох полях
//upload.array("avatar", 8) - коли очікуємо в одному полі кілька файлів
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verify);

router.post(
  "/verify",
  validateBody(schemas.userEmailSchema),
  ctrl.resendVerifyEmail
);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  validateSubscription(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
