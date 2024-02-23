import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";

const SearchInput = () => {
  const [searchInput, setSearchInput] = useState("");
  const { conversations } = useGetConversations();
  const { setSelectedConversation } = useConversation();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!searchInput) return;

    if (searchInput.length < 3) {
      return toast.error("Search Value Cannot Less Than 3 Words");
    }

    const conversation = conversations.find((c) =>
      c.username.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearchInput("");
    } else {
      toast.error("No Such User Found");
    }
  };
  return (
    <form className="flex items-center gap-2" onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
