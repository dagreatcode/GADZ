import React from "react";
// import {Link} from 'react-router-dom';
// import LiveChat from '../../components/LiveChat/LiveChat';
// import Comments from '../../components/Comments/Comments';
// import { useSelector } from 'react-redux';

const Home = () => {
  // const comments = useSelector((state) => state.comments);
  return (
    <>
      <header>
        {/* <div>This is the header.</div> */}
      </header>
      <nav>
        {/* <div>This is the navigation.</div> */}
      </nav>
      <main>
        {/* <div>This is the main content.</div> */}
        <div className="container" style={{ textAlign: "center" }}>
          <div className="row jumbotron">
            <div className="display-4" style={{ padding: "40px" }}>
              Home
            </div>
          </div>
        </div>
        <section>
          {/* <div>This is a section.</div> */}
        </section>
        <article>
          {/* <div>This is an article.</div> */}
        </article>
        <aside>
          {/* <div>This is an aside.</div> */}
        </aside>
      </main>
      <footer>
        {/* <div>This is the footer.</div> */}
      </footer>
    </>
  );
};

export default Home;
