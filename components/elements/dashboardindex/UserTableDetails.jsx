import { useState, useEffect } from "react";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { Table, DatePicker, Skeleton } from "antd";
import { baseUrl } from "../../../server/index";
import { Capitalize } from "../../../functions/utilities";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM";

function UserTableDetails({ auth }) {
  const [loading, setLoading] = useState(false);
  const [topData, setTopData] = useState([]);

  useEffect(() => {
    setLoading(true)
    axios.get(`${baseUrl}/users/top`)
    .then(res => {
        // console.log(res.data.query)
        setTopData(res.data.query)
      setLoading(false)
    })
    .catch(err => {
        // console.log(err)
        setLoading(false)
    })
  }, []);



  const columns = [
    {
      title: "S/N",
      dataIndex: "key",
      key: "key"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Points",
      dataIndex: "points",
      key: "points"
    }
  ];

  const tableData = topData.map((data, index) => {
    data.key=index+1;
    data.name = `${Capitalize(data.firstname)} ${Capitalize(data.lastname)}`
    data.points = data.my_stats.total_points

    return data;
  })

  // console.log(tableData)
  // const data = [
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     points: 70
  //   },
  //   {
  //     key: "2",
  //     name: "Jim Green",
  //     points: 50
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     points: 40
  //   },
  //   {
  //     key: "4",
  //     name: "John Doe",
  //     points: 70
  //   },
  //   {
  //     key: "3",
  //     name: "Jane Black",
  //     points: 40
  //   }
  // ];
  return (
    <div className="w-full bg-white px-2 py-3 shadow-lg col-span-2 hidden sm:block">
      <div className="flex flex-col md:flex-row flex-wrap justify-between items-center py-3 px-1">
        <h6 className="font-bold text-xl">Top 12 Contestants</h6>
        {/* <div>
           <RangePicker picker="month" size="large" defaultValue={[moment('2019-09', dateFormat), moment('2019-11', dateFormat)]} /> 
        </div> */}
      </div>
      <div>
        {loading && <div className="pb-10">
          <Skeleton active />
          <Skeleton active />
        </div>}

        {!loading && topData.length > 0 && (
          <Table columns={columns} dataSource={tableData} pagination={false} />
        )}
      </div>
    </div>
  );
}

export default UserTableDetails;
