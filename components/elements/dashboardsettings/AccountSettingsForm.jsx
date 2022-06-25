import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { FaCheck, FaCircleNotch } from "react-icons/fa";
import { Select, DatePicker } from "antd";
import { Capitalize } from "../../../functions/utilities";
import {
  userNotificationSuccess,
  userNotificationFailure
} from "../../../functions/notification";
import { baseUrl } from "../../../server/index";
import { loginSuccess } from "../../../store/auth/action";

function AccountSettingsForm({ auth }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { Option } = Select;

  function handleChange(value) {
    // console.log(`selected ${value}`);/
  }

  function onChange(date, dateString) {
    // console.log({date})
    setDateOfBirth(dateString);
  }
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAccountForm = (e) => {
    e.preventDefault();

    const stateData = {
      firstname,
      lastname,
      username,
      email,
      gender,
      phone_number,
      date_of_birth,
      location,
      bio
    };

    const data = Object.fromEntries(
      Object.entries(stateData).filter(([first, second]) => second.length != 0)
    );
    // console.log(data);
    if(Object.keys(data).length > 0){
      setLoading(true);
    axios
      .put(`${baseUrl}/users/${auth.id}`, data, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      .then((res) => {
        setLoading(false);
        return axios.get(`${baseUrl}/users/${auth.id}`);
        // console.log(res)
      })
      .then((res2) => {
        setLoading(false);
        
        dispatch(
          loginSuccess({ ...res2.data, token: auth.token, id: auth.id })
        );
        router.push("/dashboard/account");
        userNotificationSuccess(`Account Updated`);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err);
        userNotificationSuccess(`Account Update Failed`);
      });

    } else{
      userNotificationFailure("Please add fields to update")
    }
    
  };

  return (
    <form
      onSubmit={handleAccountForm}
      id="#account_info"
      className="bg-white rounded shadow-lg flex flex-col  gap-8 py-7 px-5 text-lg"
    >
      <h3 className="text-gray-700 font-bold text-3xl leading-loose">
        Account Info
      </h3>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <label htmlFor="" className="block mb-2">
            First Name
          </label>
          <input
            type="text"
            placeholder={Capitalize(auth.firstname)}
            className="w-full bg-brand-nude py-3 px-4 placeholder:text-gray-700"
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="w-full lg:w-1/2">
          <label htmlFor="" className="block mb-2">
            Last Name
          </label>
          <input
            type="text"
            placeholder={Capitalize(auth.lastname)}
            className="w-full bg-brand-nude py-3 px-4 placeholder:text-gray-700"
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <label htmlFor="" className="block mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder={Capitalize(auth.email)}
            className="w-full bg-brand-nude py-3 px-4 placeholder:text-gray-700"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full lg:w-1/2">
          <label htmlFor="" className="block mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder={Capitalize(auth.phone_number)}
            className="w-full bg-brand-nude py-3 px-4 placeholder:text-gray-700"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <label htmlFor="" className="block mb-2">
            Gender
          </label>
          <Select
            style={{ width: "100%" }}
            onChange={(value) => setGender(value)}
            size="large"
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </div>
        <div className="w-full lg:w-1/2">
          <label htmlFor="" className="block mb-2">
            Date of Birth
          </label>
          <DatePicker
            onChange={onChange}
            size="large"
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full">
          <label htmlFor="" className="block mb-2">
            Location
          </label>
          <Select
            style={{ width: "100%" }}
            onChange={(value) => setLocation(value)}
            size="large"
          >
            <Option value="male">Ilorin</Option>
            <Option value="female">Malete</Option>
          </Select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full">
          <label htmlFor="" className="block mb-2">
            Say something about yourself
          </label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder={auth.bio}
            className="w-full bg-brand-nude py-3 px-4 placeholder:text-gray-700"
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end">
        {!loading && (
          <button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-5 py-3 px-6 transition ease-in-out duration-300">
            <span>Save Information</span> <FaCheck />
          </button>
        )}
        {loading && (
          <div className="bg-green-600 text-white flex items-center gap-5 py-3 px-6 t cursor-progress opacity-80">
            <span>Updating your information...</span>{" "}
            <FaCircleNotch className="animate-spin" />
          </div>
        )}
      </div>
    </form>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(AccountSettingsForm);
