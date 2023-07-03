const { Router } = require("express");
const router = Router();

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateStatusSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", isValidId, ctrl.deleteById);

module.exports = router;
