import React, { useEffect } from 'react'
import './List.css'
import axios from 'axios'
import {toast} from 'react-toastify'

export const List = ({url}) => {


  const [list,setlist]= React.useState([])

  const fetchList = async () => {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setlist(response.data.data);
      } else {
        toast.error("Error");
      }
    };

    useEffect(() => {
      fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.Success) {
      toast.success(response.data.message);
    }
    else {
      toast.error("Error in deleting food item" + response.data.message);
    }
  }

  return (
    <div className='list add flex-col'>
        <p>All Foods List</p>
        <div className='list-table'>
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item,index)=>(
            <div className="list-table-format" key={index}>
              <img src={`${url}/images/`+item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div>
          ))}
        </div>
    </div>
  )
}
