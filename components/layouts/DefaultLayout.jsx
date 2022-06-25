import {useState, useEffect} from 'react';
import Image from 'next/image';
import Head from 'next/head';


const DefaultLayout = props => {
    const [appLoader, setAppLoader] = useState(true)
        let titleView;
        if (props.title !== undefined) {
            titleView = props.title + ' | ' + process.env.title + ' - ' + process.env.titleDescription;
        } else {
            titleView = process.env.title + ' | ' + process.env.titleDescription;
        }
    useEffect(()=> {
        setTimeout(()=> {
            setAppLoader(false)
        }, 500)
    })
    return (
      <>
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="description"
            content={`${
              props.description ? props.description : "Be the next global star"
            }`}
          />
          <meta name="theme-color" content="#fff" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maxiumum-scale=1"
          />
          {/* <link rel="icon" href="/images/logo/fav.png" /> */}
          <title>{titleView}</title>
        </Head>
        {appLoader && <div className="fixed bg-white z-[1000] top-0 left-0 flex items-center justify-center w-full h-full">
            <div className='animate-bounce'>
                <Image
                    src={"/images/logo.png"}
                    alt="Logo Loader"
                    height={137}
                    width={132}
                />
            </div>

        </div>}
        {/* <Mobileheader />
        <Mainheader /> */}
        {props.children}
        {/* <Mainfooter /> */}
      </>
    );
}

export default DefaultLayout;