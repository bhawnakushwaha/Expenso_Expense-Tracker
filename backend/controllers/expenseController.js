const xlsx = require('xlsx');
const Expense = require("../models/Expense");

// Add Expense source
exports.addExpense = async (req,res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;

        // check missing fields
        if (!category || !amount || !date){
            return res.status(400).json({ message: "All Fields are required" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error){
        res.status(500).json({message: "Server Error"});
    }
};

// get all Expense sources
exports.getAllExpense = async (req,res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    }catch(error){
        res.status(500).json({message: "server Error"});
    }
};

// delete Expense sources
exports.deleteExpense = async (req,res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message: "Expense deleted successfully"});
    } catch (error){
        res.status(500).json({message: "server Error"});
    }
};

// download excel
// exports.downloadExpenseExcel = async (req,res) => {
//     const userId = req.user.id;
//     try{
//         const expense = await Expense.find({userId}).sort({date: -1});

//         // data for excel
//         const data = expense.map((item)=>({
//             category: item.category,
//             amount: item.amount,
//             Date: item.date,
//         }));

//         const wb = xlsx.utils.book_new();
//         const ws = xlsx.utils.json_to_sheet(data);
//         xlsx.utils.book_append_sheet(wb, ws, "expense");
//         xlsx.writeFile(wb, 'expense_details.xlsx');
//         res.download('expense_details.xlsx');
        
//     } catch (error){
//         res.status(500).json({message: "Server Error"});
//     }
// };

// exports.downloadExpenseExcel = async (req, res) => {
//     const userId = req.user.id;

//     try {
//         const expenses = await Expense.find({ userId }).sort({ date: -1 });

//         // Prepare data
//         const data = expenses.map(item => ({
//             Category: item.category,
//             Amount: item.amount,
//             Date: item.date.toISOString().split('T')[0],
//         }));

//         // Create workbook + sheet
//         const wb = xlsx.utils.book_new();
//         const ws = xlsx.utils.json_to_sheet(data);
//         xlsx.utils.book_append_sheet(wb, ws, "Expenses");

//         // Write workbook to buffer (this avoids corruption)
//         const buffer = xlsx.write(wb, {
//             bookType: "xlsx",
//             type: "buffer"
//         });

//         // Send as downloadable Excel file
//         res.setHeader("Content-Disposition", "attachment; filename=expense_details.xlsx");
//         res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

//         return res.send(buffer);

//     } catch (error) {
//         console.error("Error generating Excel:", error);
//         return res.status(500).json({ message: "Server Error" });
//     }
// };


exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });

        // Format data properly
        const data = expenses.map(item => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date ? item.date.toISOString().split("T")[0] : ""
        }));

        // Create workbook + worksheet
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);

        // Append sheet
        xlsx.utils.book_append_sheet(wb, ws, "Expenses");

        // Generate buffer (critical)
        const excelBuffer = xlsx.write(wb, {
            bookType: "xlsx",
            type: "buffer",
            compression: true,       // helps prevent corruption
        });

        // Set proper headers
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=expense_details.xlsx"
        );
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        // Send file
        res.end(excelBuffer);

    } catch (error) {
        console.error("Excel Export Error:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};
