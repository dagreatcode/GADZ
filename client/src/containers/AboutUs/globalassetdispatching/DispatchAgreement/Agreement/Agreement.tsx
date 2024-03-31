// import { Link } from "react-router-dom";
import PostForm from "./PostForm";

function Agreement() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            {/* Create a PDF to send to the admin email after customer fills it out */}
            <PostForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default Agreement;
