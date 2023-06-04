const express = require("express");

const router = express.Router();

const contactController = require("../../controllers/contacts-controllers");

const schemas = require("../../schemas/contacts-schemas");

const { validateBody } = require("../../decorators/index");

router.get("/", contactController.listContacts);

router.get("/:id", contactController.getContactById);

router.post(
  "/",
  validateBody(schemas.contactAddScheme),
  contactController.addContact
);

router.delete("/:id", contactController.removeContact);

router.put(
  "/:id",
  validateBody(schemas.contactAddScheme),
  contactController.updateContact
);

module.exports = router;
