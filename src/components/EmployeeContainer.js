import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_EMPLOYEES } from "../redux/types";
import styled from "styled-components";
import Employee from "./Employee";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px 0;
  margin-bottom: 2.9rem;
`;

function EmployeeContainer() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.employee);
  const employees = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch({ type: GET_EMPLOYEES });
  }, []);

  if (data.length == 0) return <h2>No Employee Added Yet</h2>;
  return (
    <Container>
      <div>
        <h2>Employee List</h2>
      </div>
      <hr />
      {employees.map((item) => (
        <Employee
          name={item.name}
          dob={item.dob}
          gender={item.gender}
          salary={item.salary}
          id={item.id}
        />
      ))}
    </Container>
  );
}

export default EmployeeContainer;
