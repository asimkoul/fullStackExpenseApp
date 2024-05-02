const expense = require('../models/expense');
exports.postExpense = async (req, res, next) => {

    const {amount,description,category}=req.body
    try {
        const data=await expense.create({
            amount:amount,
            description:description,
            category:category
        })
        res.status(201).json(data)
    } catch (error) {
        console.log("ERROR:(",error);
        res.status(500).json({ error: 'Failed to create expense' })
    }
};
exports.getExpense=async (req,res,next)=>{
    try {
        const expenses=await expense.findAll()
        res.status(200).json(expenses);
    } catch (error) {
        console.log("ERROR:(",err);
        res.status(500).json({ error: 'Failed to retrieve expenses' });
    }
}
exports.deleteExpense=async (req,res,next)=>{
    expense.findByPk(req.params.id)
    .then(result => {
        result.destroy()
        res.send(result);
    }).catch(err => console.log(err));
}

exports.getEditExpense = (req, res, next) => {
    // const editMode = req.query.name;
    // if (!editMode) {
    //     return res.redirect('/');
    // }
    const id = req.params.id;
    expense.findByPk(id)
        .then(result => {
            if (!result) {
                return res.status(404).json({ error: 'Expense not found' });
            }
            res.status(200).json(result);
        })
        .catch(err => {
            console.log("ERROR:(", err);
            res.status(500).json({ error: 'Failed to enable edit mode' });
        });
};