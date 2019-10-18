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
      resp.json(201).json(data);
    } catch (error) {
      return next(error);
    }
  };
}

function deleteOne(service) {
  return async function deleteRecord(req, resp, next) {
    const { id } = req.params;
    try {
      const result = await service.remove(id);
      resp.status(200).json(result);
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
    try {
      const updatedRecord = await service.update(id, req.body);
      resp.status(201).json(updatedRecord);
    } catch (error) {
      return next(error);
    }
  };
}

function replaceOne(service) {
  return async function replaceRecord(req, resp, next) {
    const { id } = req.params;
    try {
      const replacedRecord = await service.replace(id, req.body);
      resp.status(201).json(replacedRecord);
    } catch (error) {
      return next(error);
    }
  };
}
