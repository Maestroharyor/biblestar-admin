import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { baseUrl } from "../../server/index";
import { connect, useDispatch } from "react-redux";
import DashboardSidebar from "../sidebar/DashboardSidebar";
import BreadCrumb from "../elements/BreadCrumbDashboard";
import BreadCrumbDashboard from "../elements/BreadCrumbDashboard";
import { addBooks } from "../../store/books/action";

const DashboardLayout = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [appLoader, setAppLoader] = useState(true);
  // console.log(props)


  let titleView;
  if (props.title !== undefined) {
    titleView =
      props.title +
      " | " +
      process.env.title +
      " - " +
      process.env.titleDescription;
  } else {
    titleView = process.env.title + " | " + process.env.titleDescription;
  }

  useEffect(() => {
    setTimeout(() => {
      if (props.auth.isLoggedIn) {
        setAppLoader(false);
      }
    }, 200);
    if (!props.auth.isLoggedIn || !props.auth.user_role.includes("admin")) {
      router.push("/");
    }
  });

  useEffect(() => {
    if (props.auth.isLoggedIn && props.books.length === 0) {
      axios.get(`${baseUrl}/auditions/books`, {
        headers: {
          Authorization: `Bearer ${props.auth.token}`
        }
      })
      .then(res => {
        // console.log(res)
        dispatch(addBooks(res.data.data))
      })
      .catch(err => {
        // console.log(err)
      })

    }
  }, []);
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content={`${props.description}`} />
        <meta name="theme-color" content="#fff" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maxiumum-scale=1"
        />
        {/* <link rel="icon" href="/images/logo/fav.png" /> */}
        <title>{titleView}</title>
      </Head>
         {appLoader && (
        <div className="fixed bg-white z-[1000] top-0 left-0 flex items-center justify-center w-full h-full">
          <div className="animate-bounce">
            <Image
              src={"/images/logo.png"}
              alt="Logo Loader"
              height={137}
              width={132}
            />
          </div>
        </div>
      )}
      <div className="bg-gray-100 flex flex-col md:flex-row min-h-[100vh]">
        <DashboardSidebar />
        <main className="px-5 py-4 flex-1">
          <BreadCrumbDashboard breadcrumb={props.breadcrumb} />
          {props.children}
        </main>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(DashboardLayout);