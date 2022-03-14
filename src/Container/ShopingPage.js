import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import PaymentPage from "./PaymentPage"
import SalePage from "./SalePage"
import { clearUserData, clearMijozData, clearOmborData } from "../store/actions/dataActions";
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router";


const ShoppingPage = () => {
    const [pageControl, setPageControl] = useState("salePage");
    const dispatch = useDispatch()
    const State_User = useSelector(state => state.user)
    const navigate = useNavigate()
 
    useEffect(()=>{
        if(!State_User){  
            navigate("/")
        }
    }, [navigate, State_User])
    return(
        <>
            <div >
                <Button color="primary" size="sm" onClick={()=>{setPageControl("salePage")}}>
                    Sale
                </Button>
                <Button color="primary" size="sm" onClick={()=>{setPageControl("paymentPage")}}>
                    Payment
                </Button>
                <Button color="danger" size="sm" onClick={
                    ()=>{
                        dispatch(clearUserData())
                        dispatch(clearMijozData())
                        dispatch(clearOmborData())
                    }}
                >
                    Log Out
                </Button>
            </div>
            {
                pageControl === "salePage" ? <>
                  <SalePage/>
                </> : null
            }
            {
                pageControl === "paymentPage" ? <>
                  <PaymentPage/>
                </> : null
            }
        </>
    )
}
export default ShoppingPage;