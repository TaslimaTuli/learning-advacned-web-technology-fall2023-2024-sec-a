'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import InventoryTable from '../components/InventoryTable';
import { StockItemDto } from '../../../backend/src/inventory/dto/stock-item.dto';
import Link from 'next/link';

const InventoryPage = () => {
  const [inventory, setInventory] = useState<StockItemDto[]>([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('http://localhost:8000/inventory/get-inventory');
        setInventory(response.data.data);
       
      } catch (error) {
        console.error('Error fetching inventory:', error);
       
      }
    };

    fetchInventory();
  }, []);

  const handleDelete = async (itemCode: string) => {
    try {
      await axios.delete(`http://localhost:8000/inventory/delete/${itemCode}`);
      setInventory((prevInventory) => prevInventory.filter((item) => item.itemCode !== itemCode));
    } catch (error) {
      console.error('Error deleting inventory item:', error);
    }
  };

  //if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Inventory</h1>
      <Link href="inventory/create" >
        Create New Item 
      </Link>
      
      <InventoryTable inventory={inventory} onDelete={handleDelete} />
    </div>
  );
};

export default InventoryPage;
