import { useState, useEffect } from "react";
import Link from "next/link";
import {Skeleton, Select } from "antd";
import { FaQuestionCircle, FaCircleNotch } from "react-icons/fa";
import axios from "axios";
import moment from 'moment'
import InfiniteScroll from "react-infinite-scroll-component";
import { connect, useDispatch } from "react-redux";
import { baseUrl } from "../../server/index";
import { Capitalize } from "../../functions/utilities";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import {
  userNotificationSuccess,
  userNotificationFailure
} from "../../functions/notification";

const {Option} = Select

function DashboardStats({auth}) {
    const breadCrumbData = [
        {
            name: "Dashboard",
            link: "/dashboard"
        },
        {
            name: "Funds Report"
        },
        
    ]

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(2);
    const [statsData, setStatsData] = useState([]);
    const [category, setCategory] = useState("all");
    const [hasMore, setHasMore] = useState(true);

    const getStats = async () => {
        setLoading(true);
        // setHasMore(true)
        axios.get(`${baseUrl}/stats/funds`, {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          })
          .then(res => {
              console.log(res.data.query)
              setStatsData(res.data.query)
              setLoading(false)
          })
          .catch(err => {
              console.log(err)
              setLoading(false)
          })

      };

      const getMoreStats = async () => {
        const newStats = await axios.get(
          `${baseUrl}/stats/funds?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          }
        );
    
        // console.log(newQuestions);
    
        setStatsData((statsData) => [...statsData, ...newStats.data.query]);
        setCurrentPage(currentPage + 1);
        if (newStats.data.has_next_page === false) {
          setHasMore(false);
        }
        // setLoading(false);
      };

      const categoryChange = async(value) => {
        // console.log(value)
        setCategory(value)
        setHasMore(true)
        let changeReq;
        switch(value) {
            case "all":
              changeReq = `${baseUrl}/stats/funds`
              break;
            case "voting":
                changeReq = `${baseUrl}/stats/voting`
              break;
            case "audition":
                changeReq = `${baseUrl}/stats/audition`
              break;
            default:
                changeReq = `${baseUrl}/stats/funds`
          }

          setLoading(true);
        // setHasMore(true)
        axios.get(changeReq, {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          })
          .then(res => {
              console.log(res.data.query)
              setStatsData(res.data.query)
              setLoading(false)
          })
          .catch(err => {
              console.log(err)
              setLoading(false)
          })

        
      }
    
      useEffect(() => {
        getStats();
      }, []);

    return (
        <DashboardLayout title = {"Stats"} breadcrumb = {breadCrumbData}>
            <h1 className="pt-2 text-3xl font-bold">Funds Reports</h1>
            <div className='my-8 flex flex-col divide-y shadow-lg rounded'>
                {!loading && <Select size="large" className="mb-8" placeholder="Sort by Category" onChange={categoryChange} defaultValue={category}>
                        <Option value="all">All</Option>
                        <Option value="audition">Audition</Option>
                        <Option value="voting">Voting</Option>
                    </Select>}
                <div className='grid grid-cols-1 lg:grid-cols-12 items-center py-4 gap-y-3 bg-gray-50 px-5 text-lg gap-x-5'>
                                <p className='text-gray-600 lg:col-span-2'>Date</p>
                                <p className='lg:col-span-5'>Details</p>   
                                <p className="lg:col-span-2">Category</p>
                                <p className="">Amount</p>
                                <p className='lg:col-span-2'>Added By</p>   
                        </div>
                {!loading &&
                    <>
                    
                    <InfiniteScroll
              dataLength={statsData.length}
              next={getMoreStats}
              hasMore={hasMore}
              scrollThreshold={"50%"}
              loader={
                <div className="bg-white px-5 pb-10">
                  <Skeleton active className="py-5" />
                  <Skeleton active className="py-5" />
                  <Skeleton active className="py-5" />
                </div>
              }
              className="flex flex-col divide-y bg-white"
              endMessage={
                <h4 className="px-4 py-3 text-lg">No more Stats to show</h4>
              }
            >
                                  {statsData.map(data => (
                        <div key={data._id} className='grid grid-cols-1 lg:grid-cols-12 items-center py-4 gap-y-3 px-5 gap-x-5 g-white'>
                                <p className='text-gray-600 lg:col-span-2'>{moment(data.createdAt).format("ddd, MMM D YYYY")}</p>
                                <p className='font-bold text-lg lg:col-span-5'>{data.details}</p>   
                                <p className={`${data.category ==="audition" ? "bg-brand-red":"bg-green-500"} rounded px-3 py-1 text-white font-bold lg:col-span-2 text-center`}>{Capitalize(data.category)}</p>
                                <p className=' text-lg '>₦{new Intl.NumberFormat().format(data.amount)}</p>   
                                <p className='font-bold text-lg lg:col-span-2'>{`${Capitalize(data.created_by.firstname)} ${Capitalize(data.created_by.lastname)}`}</p>   

                        </div>
                    ))}

            </InfiniteScroll>
  
                    </>
                    
                }
                {loading && (
          <div className="bg-white px-5 pb-10">
            <Skeleton active className="py-5" />
            <Skeleton active className="py-5" />
            <Skeleton active className="py-5" />
          </div>
        )}
            </div>
        </DashboardLayout>
    )
}

const mapStateToProps = (state) => {
    return state;
  };
  
  export default connect(mapStateToProps)(DashboardStats);
  