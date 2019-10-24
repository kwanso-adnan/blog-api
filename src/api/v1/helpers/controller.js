import { ConnectionError } from 'sequelize';
import errors from '../../../utils/errors';

const { serverError } = errors;

/* eslint-disable no-use-before-define */
export default function createController(service) {
  return {
    createOne: createOne(service),
    deleteOne: deleteOne(service),
    getOne: getOne(service),
    getAll: getAll(service),
    updateOne: updateOne(service),
    replaceOne: replaceOne(service)
  };
}

function createOne(service) {
  return async function createRecord(req, resp, next) {
    try {
      const data = await service.create(req.body);
      resp.status(201).json(data);
    } catch (error) {
      return next(error);
    }
  };
}

function deleteOne(service) {
  return async function deleteRecord(req, resp, next) {
    const { id } = req.params;
    const userId = req.user.id;

    try {
      const countDeleted = await service.remove(id, userId);
      if (countDeleted === 0) {
        return resp.status(404).json({ error: 'Resource not found' });
      }
      resp.status(200).json({ message: `${countDeleted} record delted.` });
    } catch (error) {
      return next(error);
    }
  };
}

function getOne(service) {
  return async function findRecord(req, resp, next) {
    const { id } = req.params;
    try {
      const record = await service.getById(id);
      if (!record) {
        return resp.status(404).json({ message: 'Not found' });
      }
      resp.status(200).json(record);
    } catch (error) {
      next(error);
    }
  };
}

function getAll(service) {
  return async function getAllRecords(req, resp, next) {
    try {
      const records = await service.getAll(req.query);
      resp.status(200).json(records);
    } catch (error) {
      return next(error);
    }
  };
}

function updateOne(service) {
  return async function updateRecord(req, resp, next) {
    const { id } = req.params;
    const userId = req.user.id;
    try {
      const { dataValues: updatedRecord } = await service.update(
        id,
        userId,
        req.body
      );
      resp.status(201).json(updatedRecord);
    } catch (error) {
      let customError;
      if (error instanceof ConnectionError) {
        const { message } = error.errors[0];
        customError = serverError(message);
      }
      next(customError);
    }
  };
}

function replaceOne(service) {
  return async function replaceRecord(req, resp, next) {
    const { id } = req.params;
    const userId = req.user.id;
    try {
      const { dataValues: replacedRecord } = await service.replace(
        id,
        userId,
        req.body
      );
      resp.status(201).json(replacedRecord);
    } catch (error) {
      return next(error);
    }
  };
}
