import React from "react";
// import Joi from "joi-browser";
import StatelessForm from "../../common/StatelessForm";
// import * as departmentService from "../../services/departmentsService";
class ProfForm extends StatelessForm {
  render() {
    const { handelSubmit, data, errors, options, update } = this.props;

    return (
      <div className="col-11 p-5  rounded border border-info mx-auto mt-5">
        {update ? <h2>Update Prof</h2> : <h2>New Prof</h2>}

        <form
          data={data}
          errors={errors}
          options={options}
          onSubmit={handelSubmit}
        >
          {this.renderInput("nom", "first name")}
          {this.renderInput("prenom", "last name")}
          {this.renderInput("email", "email")}
          {this.renderInput("matricule", "matricule")}

          {this.renderInputSelect(
            "departmentId",
            "department",
            this.props.options
          )}
          {update ? this.renderButton("Update") : this.renderButton("Add")}
        </form>
      </div>
    );
  }
}

export default ProfForm;
