const ExpenseSchema = require("../models/expenseModels")

exports.addExpense = async (req,res)=>{
    const {title, amount, category, description, date} = req.body

    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        if( !title || !amount || !category || !description || !date ){
            return res.status(400).json({message: 'All Feilds are Required'})
        }
        if(amount <=0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount Must Be a Positive Real Number'})
        }
        await expense.save()
        res.status(200).json({message: 'Good Job'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
}

exports.getExpense = async (req,res)=>{
    try {
        const expense = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expense)
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}

exports.deleteExpense = async (req,res)=>{
    const {id} = req.params;
    console.log(req.params,"Deleteing -->")
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense)=>{
            res.status(200).json({message:'Successfully Removed'})
        })
        .catch((err)=>{
            res.status(500).json({message:'Server Error'})
        })    
}