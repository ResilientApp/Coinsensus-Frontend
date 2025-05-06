import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  SelectChangeEvent
} from '@mui/material';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


interface SplitAmount {
  user: string;
  amount: string;
}

interface TransactionRequest {
  method: string;
  paid_by: string;
  owed_by: string[];
  owed_amounts: number[];
  amount: number;
  description: string;
}


interface AddExpenseProps {
  onClose: () => void;
}

const AddExpense: React.FC<AddExpenseProps> = ({ onClose }) => {
  const [expenseType, setExpenseType] = useState<string>('individual');
  const [splitMethod, setSplitMethod] = useState<string>('equal');
  const [customContributions, setCustomContributions] = useState<SplitAmount[]>([]);
  const [showCustomSplitDialog, setShowCustomSplitDialog] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | ''>('');
  const [amountError, setAmountError] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const [username] = useState<string>(localStorage.getItem('username') || "");
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false);
  const groups = [
    { id: 'group1', name: 'Office Friends', members: ['Alice', 'Bob', 'Charlie'] },
    { id: 'group2', name: 'Hiking Buddies', members: ['David', 'Alice'] },
  ];

  const baseUrl = process.env.REACT_APP_COINSENSUS_BACKEND_URL || 'http://localhost:8080';

  const handleExpenseTypeChange = (event: React.MouseEvent<HTMLElement>, newType: string | null) => {
    if (newType) {
      setExpenseType(newType);
      if (newType === 'group') {
        setSelectedGroup(null);
        setSelectedUsers([]);
      }
    }
  };

  const handleGroupChange = (event: SelectChangeEvent<string>) => {
    const groupId = event.target.value; // Extract the value directly
    const group = groups.find((g) => g.id === groupId);
    setSelectedGroup(groupId);
    setSelectedUsers(group ? group.members : []);
  };
  

  const handleSplitMethodChange = (event: React.MouseEvent<HTMLElement>, newMethod: string | null) => {
    if (newMethod) {
      setSplitMethod(newMethod);
      if (newMethod === 'custom') {
        initializeCustomContributions();
        setShowCustomSplitDialog(true);
      }
    }
  };

  const initializeCustomContributions = () => {
    // Start with the main user
    const allUsers = [username, ...selectedUsers];
    const perPersonAmount = amount ? (Number(amount) / allUsers.length).toFixed(2) : '0';
    
    const contributions = allUsers.map((user) => ({
      user,
      amount: perPersonAmount,
    }));
    
    setCustomContributions(contributions);
  };

  const handleCustomAmountChange = (index: number, value: string) => {
    const updatedContributions = [...customContributions];
    updatedContributions[index].amount = value;
    setCustomContributions(updatedContributions);
    
    // Optionally, validate as they type
    validateCustomSplit();
  };

  const validateCustomSplit = () => {
    if (!amount) {
      setAmountError('Please enter a total amount first');
      return false;
    }
  
    const totalAmount = customContributions.reduce((sum, contribution) => {
      return sum + (parseFloat(contribution.amount) || 0);
    }, 0);
  
    // Use a small epsilon for floating point comparison
    const epsilon = 0.01;
    if (Math.abs(totalAmount - Number(amount)) > epsilon) {
      setAmountError(`The total split (${totalAmount.toFixed(2)}) must equal the expense amount (${Number(amount).toFixed(2)})`);
      return false;
    }
  
    setAmountError('');
    return true;
  };
  
  const handleAddExpense = async () => {
    if (splitMethod === 'custom' && !validateCustomSplit()) {
      return;
    }
  
    try {
      let owed_by: string[] = selectedUsers;
      let owed_amounts: number[] = [];
      let perPersonAmount: number = 0;
  
      if (splitMethod === 'custom') {
        const otherUsersContributions = customContributions.filter(
          contribution => contribution.user !== username
        );
        // owed_amounts = otherUsersContributions.map(c => parseFloat(c.amount));
        for(const contribution of otherUsersContributions) {
          const transactionData: TransactionRequest = {
            method: 'add_expense',
            paid_by: username,
            owed_by: [contribution.user],
            owed_amounts: [Number(contribution.amount)],
            amount: Number(amount),
            description: description
          };

          await sendTransaction(transactionData);
        }
      } else if (splitMethod === 'equal') {
        const perPersonAmount = Number(amount) / (selectedUsers.length + 1);
        // owed_amounts = selectedUsers.map(() => perPersonAmount);
        for(const user of selectedUsers) {
          const transactionData: TransactionRequest = {
            method: 'add_expense',
            paid_by: username,
            owed_by: [user],
            owed_amounts: [perPersonAmount],
            amount: Number(amount),
            description: description
          };

          await sendTransaction(transactionData);
        }
      }
  
      // const transactionData: TransactionRequest = {
      //   method: 'add_expense',
      //   paid_by: username,
      //   owed_by: owed_by,
      //   owed_amounts: owed_amounts,
      //   amount: Number(amount),
      //   description: description
      // };
  
      // if (!response.ok) {
      //   throw new Error('Failed to create transaction');
      // }
  
      // Dispatch event to update balances
      window.dispatchEvent(new Event('expenseAdded'));
      
      // Show success message
      // alert('Transaction created successfully!');
      
      // Close the modal and return to landing page
      onClose();
  
    } catch (error) {
      console.error('Error creating transaction:', error);
      alert('Failed to create transaction. Please try again.');
    }
  };

  async function sendTransaction(transactionData: TransactionRequest){
    const response = await fetch('http://localhost:8080/api/transactions/createTransaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transactionData)
    });

    if(!response.ok)
    {
      throw new Error('Failed to create transaction');
    }
  }
  // Add getFriends in useEffect
  useEffect(() => {
    const getFriends = async () => {
      try {
        setIsLoadingUsers(true);
        const response = await fetch(
          `${baseUrl}/api/users/getUser?username=${username}`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch friends');
        }

        const result = await response.json();
        const friendsList = result.friends || [];
        setAllUsers(friendsList);
      } catch (error) {
        console.error('Error fetching friends:', error);
        // Optional: show error message
      } finally {
        setIsLoadingUsers(false);
      }
    };

    if (username) {
      getFriends();
    }
  }, [username]); // Dependency on username


  return (
      <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <div className="flex justify-between">
            <Typography variant="h6">Add New Expense</Typography>
            <Button onClick={onClose} color="secondary">
              Close
            </Button>
          </div>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              padding: 4,
              maxWidth: '800px',
              margin: 'auto',
              backgroundColor: 'background.paper',
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="h5">Add Expense</Typography>
    
            {/* User Selection */}
            <Box sx={{ width: '100%' }}>
              <Typography>With you and:</Typography>
              <Select
                multiple
                value={selectedUsers}
                onChange={(event) => setSelectedUsers(event.target.value as string[])}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                fullWidth
              >
                {allUsers.map((user) => (
                  <MenuItem key={user} value={user}>
                    {user}
                  </MenuItem>
                ))}
              </Select>
            </Box>
    
            {/* Description and Amount */}
            <TextField 
              label="Enter a Description" 
              fullWidth 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              label="Enter Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value ? parseFloat(e.target.value) : '')}
              fullWidth
            />
    
            {/* Expense Type */}
            <Typography>Expense Type</Typography>
            <ToggleButtonGroup
              value={expenseType}
              exclusive
              onChange={handleExpenseTypeChange}
              sx={{ width: '100%' }}
            >
              <ToggleButton value="individual">Individual</ToggleButton>
              <ToggleButton value="group">Group</ToggleButton>
            </ToggleButtonGroup>
    
            {/* Split Method */}
            <Typography>Split Method</Typography>
            <ToggleButtonGroup
              value={splitMethod}
              exclusive
              onChange={handleSplitMethodChange}
              sx={{ width: '100%' }}
            >
              <ToggleButton value="equal">Equally</ToggleButton>
              <ToggleButton value="custom">Custom</ToggleButton>
            </ToggleButtonGroup>
    
            {/* Add Expense Button */}
            <Button
              variant="contained"
              fullWidth
              onClick={handleAddExpense}
              sx={{
                backgroundColor: '#9C27B0',
                '&:hover': {
                  backgroundColor: '#7B1FA2',
                },
              }}
            >
              <Plus /> Add Expense
            </Button>
          </Box>
        </DialogContent>
    
        {/* Custom Split Dialog */}
        <Dialog open={showCustomSplitDialog} onClose={() => setShowCustomSplitDialog(false)}>
          <DialogTitle>Custom Split</DialogTitle>
          <DialogContent>
            <Typography variant="subtitle1" gutterBottom>
              Total Amount: ${amount}
            </Typography>
            <Typography>Enter amounts for each person:</Typography>
            {customContributions.map((contribution, index) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                <Typography 
                  sx={{ 
                    fontWeight: contribution.user === username ? 'bold' : 'normal',
                    color: contribution.user === username ? 'primary.main' : 'text.primary'
                  }}
                >
                  {contribution.user} {contribution.user === username ? '(You)' : ''}
                </Typography>
                <TextField
                  type="number"
                  value={contribution.amount}
                  onChange={(e) => handleCustomAmountChange(index, e.target.value)}
                  fullWidth
                  InputProps={{
                    startAdornment: <span>$</span>,
                  }}
                  error={!!amountError && index === customContributions.length - 1}
                  helperText={index === customContributions.length - 1 ? amountError : ''}
                />
              </Box>
            ))}
            <Box sx={{ mt: 2 }}>
              <Typography color="text.secondary">
                Total Split: ${customContributions.reduce((sum, c) => sum + (parseFloat(c.amount) || 0), 0).toFixed(2)}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowCustomSplitDialog(false)} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (validateCustomSplit()) {
                  setShowCustomSplitDialog(false);
                }
              }}
              variant="contained"
              color="primary"
            >
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </Dialog>
  );
};

export default AddExpense;
