const IncomeSchema = require("../models/incomeModels")

exports.addIncome = async (req,res)=>{
    const {title, amount, category, description, date} = req.body

    const income = IncomeSchema({
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
        await income.save()
        res.status(200).json({message: 'Good Job'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
}

exports.getIncomes = async (req,res)=>{
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}

exports.deleteIncome = async (req,res)=>{
    const {id} = req.params;
    console.log(req.params,"Deleteing -->")
    IncomeSchema.findByIdAndDelete(id)
        .then((income)=>{
            res.status(200).json({message:'Successfully Removed'})
        })
        .catch((err)=>{
            res.status(500).json({message:'Server Error'})
        })    
}