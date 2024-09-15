const { readSubsidiaries, createSubsidiary, updateSubsidiaryData, findSubsidiary, deleteSubsidiaryData } = require('../services/subsidiary.service');

const subsidiaryList = async (req, res) => {
    try {
        const subsidiaries = await readSubsidiaries();

        res.status(200).json(subsidiaries);

    } catch (error) {
        res.status(500).json({ error: '자회사 불러오기 실패' });
    }
};

const addSubsidiary = async (req, res) => {
    try {
        const { name, explain } = req.body;

        await createSubsidiary(name, explain);

        res.status(200).json({ message: '자회사 추가 성공' });

    } catch (error) {
        res.status(500).json({ error: '자회사 추가 실패' });
    }
};

const updateSubsidiary = async (req, res) => {
    try {
        const { _id, name, explain } = req.body;

        await updateSubsidiaryData(_id, name, explain);

        res.status(200).json({ message: '자회사 수정 성공' });

    } catch (error) {
        res.status(500).json({ error: '자회사 수정 실패' });
    }
};

const deleteSubsidiary = async (req, res) => {
    try {
        const { id } = req.body;

        const subsidiaryForDelete = await findSubsidiary(id);

        await deleteSubsidiaryData(subsidiaryForDelete);

        res.status(200).json({ message: '자회사 삭제 완료' });

    } catch (error) {
        res.status(500).json({ error: '자회사 삭제 실패' });
    }
};

module.exports = {
    subsidiaryList,
    addSubsidiary,
    updateSubsidiary,
    deleteSubsidiary
};