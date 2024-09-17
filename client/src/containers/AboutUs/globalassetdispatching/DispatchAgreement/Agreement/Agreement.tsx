// import { Link } from "react-router-dom";
import PostForm from "./PostForm";
// import { usePDF } from 'react-to-pdf';

function Agreement() {
  // const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            {/* Create a PDF to send to the admin email after customer fills it out */}
            {/* <button onClick={() => toPDF()}>Download PDF</button>
            <div ref={targetRef}> */}
            <PostForm />
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Agreement;
