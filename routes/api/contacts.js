const express = require("express");

const router = express.Router();

const contactController = require("../../controllers/contacts");

const { schemas } = require("../../models/contact");

const { validateBody, isValidId } = require("../../middlewares");

router.get("/", contactController.listContacts);

router.get("/:id", isValidId, contactController.getContactById);

router.post(
  "/",
  validateBody(schemas.contactAddScheme),
  contactController.addContact
);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.contactAddScheme),
  contactController.updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteScheme),
  contactController.updateStatusContact
);

router.delete("/:id", isValidId, contactController.removeContact);

module.exports = router;
