import {FaTimesCircle} from 'react-icons/fa';

function DeleteAccount() {
    return (
        <div
        id="#delete_account"
        className="bg-white rounded shadow-lg flex flex-col  gap-6 py-7 px-5 text-lg"
      >
          <h3 className="text-gray-700 font-bold text-3xl leading-loose">
          Delete Account
        </h3>
        <div className="flex justify-between items-center">
            <p className='w-1/2 text-gray-600'>Once you delete your account, you are removing yourself from the program and there is no going back. Please be certain.</p>
            <button className="bg-brand-red hover:bg-red-700  text-white flex items-center gap-5 py-3 px-6 transition ease-in-out duration-300 rounded">
            <span>Delete Account</span> <div className='text-2xl'><FaTimesCircle /></div>
          </button>
        </div>
            
        </div>
    )
}

export default DeleteAccount;
