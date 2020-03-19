import React from "react";
// import Joi from "joi-browser";
import StatelessForm from "../../common/StatelessForm";
// import * as departmentService from "../../services/departmentsService";
class ModuleForm extends StatelessForm {
  render() {
    const { handelSubmit, data, errors, options, update } = this.props;

    return (
      <div className="col-11 p-5  rounded border border-info mx-auto mt-5">
        {update ? <h2>Update Module</h2> : <h2>New Module</h2>}

        <form
          data={data}
          errors={errors}
          options={options}
          onSubmit={handelSubmit}
        >
          {this.renderInput("nom", "Module's name")}
          {this.renderInputSelect(
            "profId",
            "professeur responsable",
            this.props.options
          )}
          {update ? this.renderButton("Update") : this.renderButton("Add")}
        </form>
      </div>
    );
  }
}

export default ModuleForm;
