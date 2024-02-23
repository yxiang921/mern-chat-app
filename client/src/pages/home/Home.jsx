import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import { useAuthContext } from "../../context/AuthContext";

const Home = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex flex-row justify-center items-center mb-7">
        <div className="avatar online w-12 mr-6">
          <div className="w-24 rounded-full">
            <img src={authUser.profilePic} alt={authUser.username} />
          </div>
        </div>
        <h1 className="font-medium text-white text-3xl">
          Welcome, {authUser.username}
        </h1>
      </div>
      <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};
export default Home;
