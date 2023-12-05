import Student from "./all";

type t = {
   stu: any;
   del: (student: any) => void;
};

const Students = ({ stu, del }: t) => {
   return (
      <>
         <table border={1} align="center">
            {/* <thead>Student Details</thead> */}
            <tbody>
               <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>CGPA</th>
                  <th>Delete</th>
               </tr>
               {stu.map((student: any) => (
                  <Student stu={student} key={student.id} del={del} />
               ))}
            </tbody>
         </table>
      </>
   );
};
export default Students;
