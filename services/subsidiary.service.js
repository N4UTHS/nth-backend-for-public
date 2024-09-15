const Subsidiary = require('../models/subsidiary.model');

const readSubsidiaries = async () => {
    try {
        const subsidiaries = await Subsidiary.find();

        if (!subsidiaries) {
            throw new Error('Subsidiaries not found');
        }

        return subsidiaries;

    } catch (error) {
        throw error;
    }
};

const createSubsidiary = async (name, explain) => {
    try {
        const newSubsidiary = await Subsidiary.create({
            name, explain
        });

        if (!newSubsidiary) {
            throw new Error('Subsidiary create fail');
        }

    } catch (error) {
        throw error;
    }
};

const updateSubsidiaryData = async (id, name, explain) => {
    try {
        const updatedSubsidiary = await Subsidiary.findByIdAndUpdate(
            id,
            { name, explain },
            { new: true, runValidators: true }
        );

        if (!updatedSubsidiary) {
            throw new Error('Subsidiary update fail');
        }

        return updatedSubsidiary;

    } catch (error) {
        throw error;
    }
};

const findSubsidiary = async (id) => {
    try {
        const subsidiary = await Subsidiary.findById(id);

        if (!subsidiary) {
            throw new Error('subsidiary not found');
        }

        return subsidiary;

    } catch (error) {
        throw error;
    }
};

const deleteSubsidiaryData = async (subsidiary) => {
    try {
        await subsidiary.deleteOne();

    } catch (error) {
        throw error;
    }
};

module.exports = {
    readSubsidiaries,
    createSubsidiary,
    updateSubsidiaryData,
    findSubsidiary,
    deleteSubsidiaryData
};