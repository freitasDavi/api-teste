import * as create from "./Create";
import * as getById from "./GetById";
import * as getAll from "./GetAll";
import * as deleteById from "./DeleteById";
import * as updateById from "./UpdateById";

export const CidadesController = {
  ...create,
  ...getAll,
  ...getById,
  ...deleteById,
  ...updateById
};