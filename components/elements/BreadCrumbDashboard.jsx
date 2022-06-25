import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from 'antd';

function BreadCrumbDashboard({breadcrumb}) {
    // console.log(breadcrumb)
    return (
        <div className='mb-2 dashboard__breadcrumb'>
            <Breadcrumb>
                <Breadcrumb.Item className='hover:text-brand-red'>
                    <Link href='/'>
                        <a className='hover:text-brand-red'>Home</a>
                    </Link>
                </Breadcrumb.Item>
                {
                    breadcrumb.map((data,i) => {
                        if(i+1 !== breadcrumb.length){
                            return(
                                <Breadcrumb.Item className='hover:text-brand-red' key={data.name}>
                                <Link href={data.link}>
                                    <a className='hover:text-brand-red'>{data.name}</a>
                                </Link>
                            </Breadcrumb.Item> 
                            )
                        } else{
                            return(
                                <Breadcrumb.Item key={data.name}>{data.name}</Breadcrumb.Item>   
                            )
                        }
                    })
                }
            </Breadcrumb>

        </div>
    )
}

export default BreadCrumbDashboard;