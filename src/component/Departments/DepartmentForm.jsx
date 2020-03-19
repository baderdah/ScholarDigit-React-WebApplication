import React from "react";
// import Joi from "joi-browser";
import StatelessForm from "../../common/StatelessForm";
// import * as departmentService from "../../services/departmentsService";
class DepartmentForm extends StatelessForm {
  render() {
    const { handelSubmit, data, errors, options, update } = this.props;

    return (
      <div className="col-11 p-5  rounded border border-info mx-auto mt-5">
        {update ? <h2>Update Department</h2> : <h2>New Department</h2>}

        <form
          data={data}
          errors={errors}
          options={options}
          onSubmit={handelSubmit}
        >
          {this.renderInput("nom", "Department's name")}
          {update ? this.renderButton("Update") : this.renderButton("Add")}
        </form>
      </div>
    );
  }
}

export default DepartmentForm;
