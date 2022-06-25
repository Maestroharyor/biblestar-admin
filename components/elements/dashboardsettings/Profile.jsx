import { connect, useDispatch } from "react-redux";
import { Avatar } from "antd";
import {Capitalize} from '../../../functions/utilities'


function Profile({auth}) {
  return (
    <div
      id="#profile"
      className="bg-white rounded shadow-lg flex flex-col md:flex-row items-center gap-6 py-7 px-5"
    >
      <Avatar size={150} className="me-2">
        {Capitalize(auth.username)}
      </Avatar>
      <div>
        <p className="font-bold text-3xl">{`${Capitalize(auth.firstname)} ${Capitalize(auth.lastname)}`}</p>
        <p className="text-lg">Email: {auth.email}</p>
      </div>
    </div>
  );
}


const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Profile);
