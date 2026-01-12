import React, {useEffect, useState} from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/layouts/DashboardLayout';
import toast from 'react-hot-toast';
import axiosInstance from '../../utills/axiosInstance';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import Modal from '../../components/Modal/';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';
import { API_PATHS } from '../../utills/apiPaths';


const Expense = () => {
  useUserAuth();

    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setopenDeleteAlert] = useState({
      show: false,
      data: null,
    });
  
    const [OpenAddExpenseModel, setOpenAddExpenseModel] = useState(false);


  // get all Expense details
  const fetchExpenseDetails = async ()=> {
    if (loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if (response.data){
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again", error);

    } finally{
      setLoading (false);
    }
  };

  // handle add Expense
  const handleAddExpense = async (expense)=> {
    const {category, amount, date, icon} = expense;

    // validation checks
    if (!category.trim()) {
      toast.error("category is required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category, 
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModel(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();

    } catch (error) {
      console.error("Error adding Expense:",
        error.response?.data?.message || error.message
      );
    };
  };

  // delete Expense
  const deleteExpense = async (id)=> {
    try{
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setopenDeleteAlert({ show: false, data: null});
      toast.success("Expense details deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error deleting Expense:",
        error.response?.data?.message || error.message
      );
    }
  };

  // handle download expense details
  const handleDownloadExpenseDetails = async ()=> {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob",
        }
      );
      // URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error,, downloading expense details", error);
      toast.error("Failed to download expense details. Please try again.");
      
    }
  };

  useEffect(()=>{
    fetchExpenseDetails();

    return () => {};
  }, []);


  return (


    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={()=> setOpenAddExpenseModel(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id)=>{
              setopenDeleteAlert({show: true, data: id});

            }}
            onDownload={handleDownloadExpenseDetails}
            />

        </div>

        <Modal 
          isOpen={OpenAddExpenseModel}
          onClose={()=> setOpenAddExpenseModel(false)}
          title="Add Expense">
            <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
        isOpen={openDeleteAlert.show}
        onClose={()=> setopenDeleteAlert({show: false, data:null})}
        title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure to delete this Expense?"
            onDelete={()=> deleteExpense(openDeleteAlert.data)}
          />
        </Modal>

      </div>
    </DashboardLayout>
  )
}

export default Expense;
