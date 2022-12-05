import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setEmployeeSlice } from "../redux/slice/employee";
import { CREATE_EMPLOYEE } from "../redux/types";
import Select from "./Select";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 2.9rem;
  margin-bottom: 2rem;

  > div:first-of-type {
    > h2 {
      font-size: 1.17rem;
      color: #888888;
      @media (max-width: 768px) {
        text-align: center;
        margin-bottom: 1rem;
      }
    }
  }

  > div:last-of-type {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > input {
      width: 20%;
      height: 2.813rem;
      border: solid 1px #e8e8e8;
      padding: 0 20px;
      font-size: 1rem;
      font-family: var(--font-1);
      background: ${({ theme }) => theme.input};
      transition: background 0.4s linear;
      border-radius: 6px;

      &::placeholder {
        font-size: 0.8rem;
        font-family: var(--font-1);
        color: ${({ theme }) => theme.holder};
        transition: color 0.4s linear;
      }

      &:focus {
        outline: solid 1px var(--primary-color-1);
      }
    }

    @media (max-width: 992px) {
      > input {
        width: 27%;
      }
    }
    @media (max-width: 768px) {
      flex-direction: column;

      > input {
        width: 100%;
        margin-bottom: 1rem;
      }
    }
  }
`;

const StyledButton = styled.button`
  width: 11.5rem;
  height: ${(props) => (props.update === 'update' ? '2.063rem' : '2.813rem')};
  padding: ${(props) => (props.update === 'update' ? '0.438rem 1.188rem 0.5rem 1.375rem' : '0.801rem 1.188rem 0.886rem 1.375rem')};
  border-radius: 3px;
  font-family: var(--font-2);
  background: ${({ theme }) => theme.primary};
  border: none;
  color: var(--white);
  cursor: pointer;
  transition: background 0.40s linear;

  &:focus {
    background: ${(props) => (props.type === 'button' ? 'var(--primary-color-1)' : 'var(--primary-color-2)')};
  }

  @media (max-width: 650px){
    width: ${(props) => (props.update === 'update' ? '8.063rem' : '11.5rem')};
    height: ${(props) => (props.update === 'update' ? '2.813rem' : '2.813rem')};
  }
`;
function EmployeeInput() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.employee);

  const handleChange = (prop) => (event) => {
    dispatch(setEmployeeSlice({ ...data, [prop]: event.target.value }));
    console.log("data", data);
  };
  const handleSubmit = () => {
    dispatch({ type: CREATE_EMPLOYEE, data: {...data,id:nanoid(8)} });
    dispatch(
      setEmployeeSlice({
        name: '',
        dob: '',
        gender: '' ,
        salary: '' ,
        id:''
      }))
  };
  return (
    <div>
      <Container>
        <div>
          <h2>Add New Employees</h2>
        </div>
        {/* <button onClick={() => dispatch({type:CREATE_EMPLOYEE,employee:{...data}})}>addToCart</button> */}

        {/* <button onClick={() => dispatch(addToCart(employee.id))}>
      Remove From Cart
    </button> */}
        {/* <button onClick={() => dispatch({type:GET_EMPLOYEES})}>
      Get Employee
    </button> */}
        {/* <button onClick={() => dispatch(GET_EMPLOYEES)}>Get Employees</button> */}

        {/* <div><p>{data[0].text}</p> <button>Edit</button><button>Delete</button></div> */}
        <div>
          <input
            type="text"
            onChange={handleChange("name")}
            placeholder="Enter Name"
            value={data.name}
          />
          <input
            type="text"
            onChange={handleChange("salary")}
            placeholder="salary"
            value={data.salary}
          />
          <Select
            handleChange={handleChange("gender")}
            selectValue={data.gender}
          />
          <input
            type="date"
            onChange={handleChange("dob")}
            placeholder="Date"
            value={data.dob}
          />
            <StyledButton type="submit" onClick={()=>handleSubmit()}>ADD</StyledButton>
          {/* <Button text="ADD" onClick={handleSubmit} /> */}
          {/* <button type="submit" onClick={() => handleSubmit()}>
      Submit
    </button> */}
        </div>
      </Container>
    </div>
  );
}

export default EmployeeInput;
