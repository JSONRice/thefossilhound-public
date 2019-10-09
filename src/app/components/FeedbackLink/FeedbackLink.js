import { Component } from "react";
import { translate } from "../../utils/translate";

class FeedbackLink extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <a href={translate("link.feedback")}>{translate("label.feedback")}</a>
      </div>
    );
  }
}

export default FeedbackLink;
