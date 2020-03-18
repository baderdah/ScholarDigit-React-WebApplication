import React, { Component } from "react";
import "font-awesome/css/font-awesome.css";

class Like extends Component {
  render() {
    const { onLikeClicked, liked } = this.props;
    let classes = "fa fa-heart";
    if (!liked) {
      classes += "-o";
    }
    return <i onClick={onLikeClicked} className={classes} />;
  }
}

export default Like;
