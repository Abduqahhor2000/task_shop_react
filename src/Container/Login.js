import axios from "axios";
import React, { useEffect, useState } from "react";
import { Label, Button, FormGroup, Form, Input, FormFeedback, Alert } from "reactstrap";
import {useSelector, useDispatch} from "react-redux"
import { addUserData, clearUserData, addMijozData, 
         clearMijozData, addOmborData, clearOmborData } from "../store/actions/dataActions";
import { useNavigate } from "react-router";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const State_User = useSelector(state => state.user)
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [error, setError] = useState("")
    const [bigError, setBigError] = useState("")
    
    useEffect(() => {
      if(State_User){
        navigate("/shopping_page")
      }
    }, [State_User, navigate, dispatch])
    
    const getUserData = async function (e) {
      e.preventDefault();
      try{
        const userdata = await axios.post(
          "/login", 
          {
            login,
            password,
            device_id: "abduqahhor2022",
          }
        ) 
        console.log(userdata)
        setError(userdata.data.error)
        setUsername(userdata.data.user_name)
        if(userdata.data.error === "null"){
          dispatch(addUserData(userdata.data))
        } else{
          dispatch(clearUserData())
        }
        try{
          const mijozdata = await axios.post(
            "/usermijozlari",
            {
              user_id: userdata.data.user_id,
            }
          )
          console.log(mijozdata)

          if(mijozdata.data.error === "null"){
            dispatch(addMijozData(mijozdata.data))
          }else{
            dispatch(clearMijozData())
          }

          try{
            const ombordata = await axios.post(
              "/getuserombor",
              {
                user_id: userdata.data.user_id,
              }
            )
            console.log(ombordata)
  
            if(ombordata.data.error === "null"){
              dispatch(addOmborData(ombordata.data))
            }else{
              dispatch(clearOmborData())
            }
          }catch(error){
            dispatch(clearOmborData())
            console.log(error)
          }
        }catch(error){
          dispatch(clearMijozData())
          console.log(error)
        }

      }catch(error){
        setBigError(error)
        console.log(error)
        dispatch(clearUserData())
      }
    }

    return(
        <div>
            <div>
            <Form onSubmit={getUserData}>
                  {
                    bigError ? <> 
                      <Alert color="danger">
                        <br/>
                        Serverda xatolik yuzbergan bo'lishi mumkin,
                        <a
                          className="alert-link"
                          href="/"
                        >
                          Qayta ochish
                        </a> ni bosing. Agar o'xshamasa xafa bo'lmaysiz!
                      </Alert>
                    </>
                    : null
                  }
                  <FormGroup>
                    <Label htmlFor="login">
                      Login
                    </Label>
                    {
                      username === "null" ? <>
                        <Input invalid="true"
                          id="login"
                          name="login"
                          placeholder="Enter login"
                          type="text"
                          value={login}
                          onChange={(e) => setLogin(e.target.value)}
                        />
                        <FormFeedback invalid="true">
                          {error}
                        </FormFeedback>
                      </> 
                      : <>
                        <Input
                          id="login"
                          name="login"
                          placeholder="Enter login"
                          type="text"
                          value={login}
                          onChange={(e) => setLogin(e.target.value)}
                        />
                      </>
                    }
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="password">
                      Password
                    </Label>
                    {
                      (username !== "null" && username !== "" && error !== "null") ? <>
                        <Input invalid="true"
                          id="password"
                          name="password"
                          placeholder="Enter password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormFeedback invalid="true">
                         {error}
                        </FormFeedback>
                      </> 
                      : <>
                        <Input
                          id="password"
                          name="password"
                          placeholder="Enter password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </>
                    }
                  </FormGroup>
                  <Button>
                    Submit
                  </Button>
                </Form>
            </div>
        </div>
    )
}

export default Login;