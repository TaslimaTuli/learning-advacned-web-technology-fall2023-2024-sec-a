'use client'
import { useState } from 'react';
import axios from 'axios';
import { StockItemDto } from '../../../../backend/src/inventory/dto/stock-item.dto';

const CreateInventoryPage = () => {
  const [newItem, setNewItem] = useState<StockItemDto>({
    itemCode: ' ',
    name: ' ',
    price: 0.00,
    quantity: 0,
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    // Convert price to float and quantity to integer
    const newValue =
      name === 'price' ? parseFloat(value) : name === 'quantity' ? parseInt(value, 10) : value;
  
    setNewItem({
      ...newItem,
      [name]: newValue,
    });
  };
  
  const validateForm = async (): Promise<boolean> => {
    const errors: Record<string, string> = {};

    if (!newItem.itemCode.trim()) {
      errors.itemCode = 'Item Code cannot be empty';
    } else {
      // Check if the item code already exists
      try {
        const response = await axios.get(`http://localhost:8000/inventory/search-inventory/${newItem.itemCode}`);
        if (response.data.message === 'Stock Item not found :(') {
         
        } else {
          errors.itemCode = 'Item Code already exists';
        }
      } catch (error) {
        console.error('Error checking existing item code:', error);
      }
    }

    if (!newItem.name.trim()) {
      errors.name = 'Name cannot be empty';
    }

    if (newItem.price <= 0) {
      errors.price = 'Price must be greater than 0';
    }

    if (newItem.quantity <= 0) {
      errors.quantity = 'Quantity must be greater than 0';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreate = async () => {
    try {
      if (!(await validateForm())) {
        return;
      }
      console.log(newItem);
      await axios.post('http://localhost:8000/inventory/create-inventory', newItem);
      
      
      window.location.href = '/inventory';
    } catch (error) {
      console.error('Error creating inventory item:', error);
    }
  };

  return (
    <div>
      <h1>Create New Inventory Item</h1>
      <form>
        <label>
          Item Code:
          <input
            type="text"
            name="itemCode"
            value={newItem.itemCode}
            onChange={handleChange}
            placeholder="Enter Item Code"
          />
          {validationErrors.itemCode && <p style={{ color: 'red' }}>{validationErrors.itemCode}</p>}
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleChange}
            placeholder="Enter Name"
          />
          {validationErrors.name && <p style={{ color: 'red' }}>{validationErrors.name}</p>}
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={newItem.price}
            onChange={handleChange}
            placeholder="Enter Price"
          />
          {validationErrors.price && <p style={{ color: 'red' }}>{validationErrors.price}</p>}
        </label>
        <br />
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={newItem.quantity}
            onChange={handleChange}
            placeholder="Enter Quantity"
          />
          {validationErrors.quantity && <p style={{ color: 'red' }}>{validationErrors.quantity}</p>}
        </label>
        <br />
        <button type="button" onClick={handleCreate}>
          Create Item
        </button>
      </form>
    </div>
  );
};

export default CreateInventoryPage;
