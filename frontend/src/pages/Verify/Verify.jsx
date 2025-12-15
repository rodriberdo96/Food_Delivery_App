import React from 'react'
import './Verify.css'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

export const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const {url} = React.useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(`${url}/api/order/verify`, {success, orderId });
        if (response.data.success){
            navigate('/myorders');
        }
        else {
            navigate('/');
        }
    };

    React.useEffect(() => {
        verifyPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


  return (
    <div className='verify'>
        <div className="spinner">

        </div>
    </div>
  )
}
