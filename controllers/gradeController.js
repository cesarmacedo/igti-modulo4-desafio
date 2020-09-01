import controllerGrade from '../bussines/gradeBussines.js';
import { logger } from '../config/logger.js';

const controller = new controllerGrade();

const create = async (req, res) => {
  try {
    logger.info(`POST /grade - ${JSON.stringify(req.body)}`);
    await controller.save(req.body)
    res.send({ message: 'Grade inserido com sucesso' });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};
  try {
    logger.info(`GET /grade`);
    const result = await controller.getAll(condition)
    res.send(result);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;
  try {
    console.log(id)
    logger.info(`GET /grade - ${id}`);
    const result = await controller.getGradeById(id)
    res.send(result);
  } catch (error) {
    res.status(error.status).send({ message: error.message || 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }
console.log(req.params)
  const id = req.params.id;

  try {
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
    const result = await controller.update(req.body, id)
    res.send(result);
  } catch (error) {
    res.status(error.status).send({
      message: error.message ||
        'Erro ao atualizar a Grade id: ' + id
    });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    logger.info(`DELETE /grade - ${id}`);
    await controller.delete(id);
    res.send({ message: 'Grade Deletado com sucesso' });

  } catch (error) {
    res
      .status(error.status)
      .send({
        message: error.message || 'Nao foi possivel deletar o Grade id: ' + id
      });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    logger.info(`DELETE /grade`);
    controller.deleteAll();
    res.send({ message: 'Todas as Grades Deletadas com sucesso' });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
