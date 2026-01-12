// const xlsx = require('xlsx');
// const User = require("../models/User");
// const Income = require("../models/Income");

// // add income source
// exports.addIncome = async (req,res) => {
//     const userId = req.user.id;

//     try {
//         const { icon, source, amount, date } = req.body;

//         // check missing fields
//         if (!source || !amount || !date){
//             return res.status(400).json({ message: "All Fields are required" });
//         }

//         const newIncome = new Income({
//             userId,
//             icon,
//             source,
//             amount,
//             date: new Date(date)
//         });

//         await newIncome.save();
//         res.status(200).json(newIncome);
//     }catch (error){
//         res.status(500).json({message: "Server Error"});
//     }
// };

// // get all income sources
// exports.getAllIncome = async (req,res) => {
//     const userId = req.user.id;

//     try {
//         const income = (await Income.find({ userId })).toSorted({date: -1 });
//         res.json(income);
//     }catch(error){
//         res.status(500).json({message: "server Error"});
//     }
// };

// // delete income sources
// exports.deleteIncome = async (req,res) => {
//     try {
//         await Income.findByIdAndDelete(req.params.id);
//         res.json({message: "Income deleted successfully"});
//     } catch (error){
//         res.status(500).json({message: "server Error"});
//     }
// };

// // download excel
// exports.downloadIncomeExcel = async (req,res) => {
//     const userId = req.user.id;
//     try{
//         const income = await Income.find({userId}).sort({date: -1});

//         // data for excel
//         const data = income.map((item)=>({
//             source: item.source,
//             Amount: item.amount,
//             Date: item.date,
//         }));

//         const wb = xlsx.utils.book_new();
//         const ws = xlsx.utils.json_to_sheet(data);
//         xlsx.utils.book_append_sheet(wb, ws, "Income");
//         xlsx.writeFile(wb, 'income_details.xlsx');
//         res.download('income_details.xlsx');
        
//     } catch (error){
//         res.status(500).json({message: "Server Error"});
//     }
// };


const xlsx = require('xlsx');
const User = require("../models/User");
const Income = require("../models/Income");

// add income source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body;

        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All Fields are required" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);

    } catch (error) {
        console.error("Add Income Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};

// get all income sources
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.json(income);

    } catch (error) {
        console.error("Get Income Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};

// delete income
exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted successfully" });

    } catch (error) {
        console.error("Delete Income Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};

// download income Excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        const filePath = 'income_details.xlsx';
        xlsx.writeFile(wb, filePath);

        res.download(filePath);

    } catch (error) {
        console.error("Download Excel Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};
