"use client";
import { useState } from "react";
import Students from "./components/show";
const index = () => {
   const [students, setStudent] = useState([
      {
         id: "10-11111-1",
         name: "XYZ",
         department: "CSE",
         cgpa: 3.8,
      },
      {
         id: "20-22222-2",
         name: "ABC",
         department: "BBA",
         cgpa: 3.4,
      },
      {
         id: "30-33333-3",
         name: "FGH",
         department: "EEE",
         cgpa: 3.5,
      },
   ]);

   let deleteStudent = (id: any) => {
      setStudent(students.filter((student) => student.id !== id));
   };

   return (
      <div>
         <Students stu={students} del={deleteStudent} />
      </div>
   );
};
export default index;
