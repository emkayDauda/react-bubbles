import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { Formik, Form, Field } from "formik";
import { Button } from "react-bulma-components";
import styled from "styled-components";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const formColor = {
  color: "",
   hex: "" 
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(({ data }) => {
        const colorChanged = colors.find(color => color.id === colorToEdit.id);
        const index = colors.indexOf(colorChanged);
        if (~index) {
          colors[index] = data;
        }
        updateColors([...colors]);
        setEditing(false)
      })
      .catch(err => alert(err));
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`/colors/${color.id}`)
    .then(({ data }) => {
      const remainingColors = colors.filter(color => color.id !== data)
      updateColors(remainingColors)
      setEditing(false)
    })
    .catch(err => alert(err))
  };

  const addColor = (formValues, actions) => {
    axiosWithAuth().post('/colors', {
      id: Date.now,
      color: formValues.color,
      code: {hex: formValues.hex}
    })
    .then(({data}) => {
      console.log(data);
      actions.resetForm()
      updateColors(data)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }preventDefault
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div />
      {/* stretch - build another form here to add a color */}
      <Formik 
      
      initialValues = {formColor}
      onSubmit ={addColor}
      render = {props => <StyledForm>
        <Field name='color' type='text' placeholder='Color' />
        <Field name='hex' type='text' placeholder='Hex' />
        <Button type='submit' color='primary' >Add Color</Button>
      </StyledForm>}
      />
    </div>
  );
};

const StyledForm = styled(Form)`
  input {
    width: 80%;
    margin: .3rem auto;
  }

  button {
    width: 8rem;
    margin: .3rem auto;

  }
`

export default ColorList;
