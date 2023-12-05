type t = {
   stu: any;
   del: (student: any) => void;
};

const Student = ({ stu, del }: t) => {
   return (
      <tr>
         <td> {stu.id} </td>
         <td> {stu.name} </td>
         <td> {stu.department} </td>
         <td> {stu.cgpa} </td>
         <td>
            {" "}
            <button onClick={() => del(stu.id)}>Delete</button>{" "}
         </td>
      </tr>
   );
};
export default Student;
