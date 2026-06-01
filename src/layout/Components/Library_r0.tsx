
import useGetCurrentUserPlaylist from "../../hooks/useGetCurrentUserPlaylist";
import EmptyPlaylist from "./EmptyPlaylist";


const Library = () => {
  
  const { data } = useGetCurrentUserPlaylist({limit: 10, offset: 0});

  console.log("ddd:current user playlist", data);


  return (
   <EmptyPlaylist/>
  );
};

export default Library;