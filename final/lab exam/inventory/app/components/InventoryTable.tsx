import React from 'react';
import { StockItemDto } from '../../../backend/src/inventory/dto/stock-item.dto';


interface InventoryTableProps {
  inventory: StockItemDto[];
  onDelete: (itemCode: string) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ inventory, onDelete }) => {
  return (
    <table border={1} width={500}> 
      <thead>
        <tr>
          <th>Item Code</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((item) => (
          <tr key={item.itemCode}>
            <td>{item.itemCode}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>
              <button onClick={() => onDelete(item.itemCode)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
