import { useEffect, useState } from 'react';
import { LayoutCompo } from '../../componets/layout'
import { useSelector } from 'react-redux'
import axios from 'axios';

const Profile = () => {

  const { user } = useSelector(state => state.user);
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    const docfetch = async () => {
      const docDetails = await axios.get(`${import.meta.env.VITE_BASE_URL}/doctor/getdoctor/${user._id}`,{
        withCredentials:true
      })
      console.log(docDetails);
    }
    docfetch();
  })

  return (
    <LayoutCompo >
      <h1>this profile section of user </h1>
    </LayoutCompo>
  )
}
export default Profile