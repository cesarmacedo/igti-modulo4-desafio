import { db } from '../models/index.js'

class grades {
    constructor() {
    }

    async save(grade) {
        try {
            const result = {};
            if (!grade.name) {
                result.message = "[save] O Name é obrigatorio"
                result.status = 422
                throw result;
            } else if (!grade.subject) {
                result.erroMsg = "[save] O subject é obrigatorio"
                result.status = 422
                throw result;
            } else if (!grade.type) {
                result.erroMsg = "[save] O type é obrigatorio"
                result.status = 422
                throw result;
            } else if (!grade.hasOwnProperty('value')) {
                result.erroMsg = "[save] O value é obrigatorio"
                result.status = 422
                throw result;
            }

            const newGrade = db.gradesSchema(grade);
            await newGrade.save();

            return newGrade;

        } catch (error) {
            if (!error.hasOwnProperty("erroMsg") &&
                !error.hasOwnProperty("status")) {
                const result = {}
                result.message = "Ocorreu um erro interno"
                result.status = 500
                throw result;
            } else {
                throw error;
            }
        }
    }

    async getGradeById(id) {
        try {
            const result = {};
            if (!id) {
                result.message = "[getAccount] O id é obrigatoria"
                result.status = 422
                throw result;
            } if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                result.message = "[update] O id é invalido!"
                result.status = 422
                throw result;
            }

            let grades = await db.gradesSchema.findOne(
                {
                    "_id": id
                });

            if (!grades) {
                result.message = "[getAccount] A grade é inexistente."
                result.status = 404
                throw result;
            }

            const newGradesArray = [];
            newGradesArray.push(grades)

            console.log(newGradesArray)

            const newGrades = await newGradesArray.map((grade) => {
                const {
                    _id, name, type, value, timestamp, lastModified, subject
                } = grade;
                return {
                    id: _id,
                    name,
                    subject,
                    type,
                    value,
                    timestamp,
                    lastModified
                }
            });

            return newGrades[0];

        } catch (error) {
            if (!error.hasOwnProperty("erroMsg") &&
                !error.hasOwnProperty("status")) {
                const result = {}
                result.message = "Ocorreu um erro interno"
                result.status = 500
                throw result;
            } else {

                throw error;
            }
        }
    }

    async getAll(parameters) {
        try {

            let grades = await db.gradesSchema.find(parameters);

            if (!grades) {
                result.message = "[getAccount] A grade é inexistente."
                result.status = 404
                throw result;
            }

            const newGrades = await grades.map((grade) => {
                const {
                    _id, name, type, value, timestamp, lastModified,
                    subject
                }
                    = grade;
                return {
                    id: _id,
                    name,
                    subject,
                    type,
                    value,
                    timestamp,
                    lastModified
                }
            });

            return newGrades;

        } catch (error) {
            console.log(error)
            if (!error.hasOwnProperty("erroMsg") &&
                !error.hasOwnProperty("status")) {
                const result = {}
                result.message = "Ocorreu um erro interno"
                result.status = 500
                throw result;
            } else {
                throw error;
            }
        }
    }

    async update(grade, id) {
        try {
            const result = {};
            if (!grade.name) {
                result.message = "[update] A student é obrigatorio"
                result.status = 422
                throw result;
            } else if (!grade.subject) {
                result.message = "[update] O subject é obrigatorio"
                result.status = 422
                throw result;
            } else if (!grade.type) {
                result.message = "[update] O type é obrigatorio"
                result.status = 422
                throw result;
            } else if (!grade.hasOwnProperty('value')) {
                result.message = "[update] O value é obrigatorio"
                result.status = 422
                throw result;
            } if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                result.message = "[update] O id é invalido!"
                result.status = 422
                throw result;
            }

            const resulte = await db.gradesSchema.findOneAndUpdate({ _id: id },
                grade, { new: true });
            return resulte;

        } catch (error) {
            console.log(error)
            if (!error.hasOwnProperty("erroMsg") &&
                !error.hasOwnProperty("status")) {
                const result = {}
                result.message = "Ocorreu um erro interno"
                result.status = 500
                throw result;
            } else {
                throw error;
            }
        }
    }

    async delete(id) {
        try {
            const result = {};
            if (!id) {
                result.message = "[delete] O id é obrigatoria"
                result.status = 422
                throw result;
            } if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                result.message = "[delete] O id é invalido!"
                result.status = 422
                throw result;
            }

            let grade = await db.gradesSchema.findOne(
                {
                    "_id": id
                });

            if (!grade) {
                result.message = "[delete] A grade é inexistente."
                result.status = 404
                throw result;
            }

            await db.gradesSchema.findByIdAndRemove({ _id: id })

            return

        } catch (error) {
            if (!error.hasOwnProperty("erroMsg") &&
                !error.hasOwnProperty("status")) {
                const result = {}
                result.message = "Ocorreu um erro interno"
                result.status = 500
                throw result;
            } else {
                throw error;
            }
        }
    }

    async deleteAll() {
        try {

            await db.gradesSchema.remove({});

            return

        } catch (error) {
            if (!error.hasOwnProperty("erroMsg") &&
                !error.hasOwnProperty("status")) {
                const result = {}
                result.message = "Ocorreu um erro interno"
                result.status = 500
                throw result;
            } else {
                throw error;
            }
        }
    }

}

export default grades;