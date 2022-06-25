import {useState} from 'react';
import {FaCheck} from 'react-icons/fa';
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';

function PasswordResetForm() {
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
        const [errors, setErrors] = useState({
          passwordErr: '',
          confirmPasswordErr: ''
      });
  
    return (
      <form
        id="#change_password"
        className="bg-white rounded shadow-lg flex flex-col  gap-8 py-7 px-5 text-lg"
      >
        <h3 className="text-gray-700 font-bold text-3xl leading-loose">
          Change Password
        </h3>
        <div className="relative ">
          <div className=" rounded flex flex-col border border-gray-500 bg-brand-chalk rounded flex-1 px-3 text-lg">
            <label htmlFor="">Current Password</label>
            <input
              type={showPass ? "text" : "password"}
              name=""
              id=""
              className="bg-brand-chalk w-full py-1 text-lg text-black font-bold focus:outline-none"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className={`absolute text-gray-800 text-2xl signup z-10  right-8 top-[30px]`}
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
          {errors.passwordErr && (
            <p className="pl-3 mt-1 text-lg text-red-700">
              {errors.passwordErr}
            </p>
          )}
        </div>

        <div className="relative ">
          <div className=" rounded flex flex-col border border-gray-500 bg-brand-chalk rounded flex-1 px-3 text-lg">
            <label htmlFor="">New Password</label>
            <input
              type={showPass ? "text" : "password"}
              name=""
              id=""
              className="bg-brand-chalk w-full py-1 text-lg text-black font-bold focus:outline-none"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className={`absolute text-gray-800 text-2xl signup z-10  right-8 top-[30px]`}
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
          {errors.passwordErr && (
            <p className="pl-3 mt-1 text-lg text-red-700">
              {errors.passwordErr}
            </p>
          )}
        </div>

        <div className="relative">
          <div className="rounded flex flex-col border border-gray-500 bg-brand-chalk rounded flex-1 px-3 text-lg">
            <label htmlFor="">Confirm New Password</label>
            <input
              type={showConfirmPass ? "text" : "password"}
              name=""
              id=""
              className="bg-brand-chalk w-full py-1 text-lg text-black font-bold focus:outline-none"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className={`absolute text-gray-800 text-2xl signup z-10  right-8 top-[30px]`}
            onClick={() => setShowConfirmPass(!showConfirmPass)}
          >
            {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
          {errors.confirmPasswordErr && (
            <p className="pl-3 mt-1 text-lg text-red-700">
              {errors.confirmPasswordErr}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button className="bg-gray-700 hover:bg-gray-800  text-white flex items-center gap-5 py-3 px-6 transition ease-in-out duration-300">
            <span>Change Password</span> <FaCheck />
          </button>
        </div>
      </form>
    );
}

export default PasswordResetForm
