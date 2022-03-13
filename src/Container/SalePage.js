import axios from "axios"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Table, Button, Input, Form, Label, FormGroup, Col} from "reactstrap"
import {sinxronDate} from "./helperFunction";

const SalePage = () => {
    const State_User = useSelector(state => state.user)
    const State_Mijoz = useSelector(state => state.mijoz)
    const State_Ombor = useSelector(state => state.ombor)
    const [ruyxat, setRuyxat] = useState([])
    const [mijoz_id, setMijoz_id] = useState("")
    const [ombor_id, setOmbor_id] = useState("")
    const [valyuta_id, setValyuta_id] = useState("")
    const [izox, setIzox] = useState("")
    const [status, setStatus] = useState("")

    console.log(ombor_id)

    const sendData = async function (e) {
        e.preventDefault();
        try{
            const sendStatus = await axios.post(
                "/order",
                {  
                    "user_id": State_User.user_id,
                    "mijoz_id": mijoz_id,
                    "ombor_id": ombor_id,
                    "valyuta_id": valyuta_id,
                    "sinxron_time": sinxronDate(),
                    "date": sinxronDate(),
                    "device_id": 123456,
                    "vozvrat": true,
                    "izox": izox,
                    "ruyxat": ruyxat,
                }
            )
            if(sendStatus.data.response === "null"){
                setStatus("Xatolik  yuz berdi! ooo my gad")
            }else{
                setStatus(sendStatus.data.response)
            }
            console.log(sendStatus)
        }catch(error){
            console.log(error)
        }
    }

    return (
        <>  
            <div>
                <Form onSubmit={sendData}>
                  <FormGroup row>
                        <Label
                          for="mijoz"
                          sm={2}
                           >
                            Select Mijoz
                        </Label>
                        <Col sm={10}>
                          <Input
                            id="mijoz"
                            name="mijoz"
                            type="select"
                            value={mijoz_id}
                            onChange={ function (e){
                                setMijoz_id(e.target.value)
                              }
                            }
                          >
                              <option value="" selected> ... </option>
                              {
                                State_Mijoz?.mijozlar.map(function(mijoz, index){
                                    return (
                                        <option key={mijoz.mijoz_id} value={mijoz.mijoz_id}>
                                            {mijoz.mijoz_name}
                                        </option>
                                    )
                                })
                              }
                          </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        for="ombor"
                        sm={2}
                         >
                        Select Ombor
                      </Label>
                      <Col sm={10}>
                        <Input
                          id="ombor"
                          name="ombor"
                          type="select"
                          value={ombor_id}
                          onChange={ function (e){
                              setOmbor_id(e.target.value)
                            }
                          }
                        >
                            <option value="" selected> ... </option>
                            {
                              State_Ombor?.response.map(function(ombor){
                                  return (
                                      <option key={ombor.Ombor_id} value={ombor.Ombor_id}>
                                          {ombor.Ombor}
                                      </option>
                                  )
                              })
                            }
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        for="valyuta"
                        sm={2}
                         >
                        Select Valyuta
                      </Label>
                      <Col sm={10}>
                        <Input
                          id="valyuta"
                          name="valyuta"
                          type="select"
                          value={valyuta_id}
                          onChange={ function (e){
                              setValyuta_id(e.target.value)
                            }
                          }
                        >
                            <option value="" selected> ... </option>
                            {
                              State_User?.valyutalar.map(function(valyuta){
                                  return (
                                      <option key={valyuta.valyuta_id} value={valyuta.valyuta_id}>
                                          {valyuta.valyuta_nomi}
                                      </option>
                                  )
                              })
                            }
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label
                            for="izox"
                            sm={2}
                        >
                            Write Comment
                        </Label>
                        <Input
                            type="textarea"
                            defaultValue={izox}
                            name="izox"
                            id="izox"
                            rows="5"
                            onChange={(e)=> setIzox(e.target.value)}
                        />
                    </FormGroup>
                    {ombor_id ? 
                        <Table
                          bordered  
                          hover
                          responsive
                          size="sm"
                        >
                            <thead>
                                <tr>
                                  <th>#</th>  <th>Nomi</th>  <th>Xossasi</th>  <th>Narxi (sum)</th>  <th>Narxi (dollir)</th>  <th>Soni</th>  <th>Xarid</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    State_Ombor?.response.map(function (item){
                                        if (item.Ombor_id === ombor_id){
                                            return item.tovarlar.map(function (tavar, index){
                                                return(
                                                    <tr key={index}>
                                                        <th scope="row">
                                                            {index + 1}
                                                        </th>
                                                        <td>
                                                            {tavar.tovar_name}
                                                        </td>
                                                        <td>
                                                            {tavar.xarak_name}
                                                        </td>
                                                        <td>
                                                            {
                                                                (State_Ombor.sotish_narxlari.find(function (elem) {
                                                                    if(tavar.tovar_id === elem.tovar_id){
                                                                        return true
                                                                    }
                                                                    return false
                                                                })).sum_narxi
                                                            } so'm
                                                        </td>
                                                        <td>
                                                            {
                                                                
                                                                (State_Ombor.sotish_narxlari.find(function (elem) {
                                                                    if(tavar.tovar_id === elem.tovar_id){
                                                                        return true
                                                                    }
                                                                    return false
                                                                })).dollar_narxi
                                                            
                                                            } $
                                                        </td>
                                                        <td>
                                                            {tavar.tovar_soni}
                                                        </td>
                                                        <td style={{"display": "flex", "width": "100%"}}>
                                                            {
                                                                ruyxat.find(function (elem){
                                                                    if((elem.xarak_id === tavar.xarak_id) && (elem.tovar_id === tavar.tovar_id)){
                                                                        return true
                                                                    }
                                                                    return false
                                                                }) ? <>
                                                                        <Button onClick={
                                                                            function (){
                                                                                const maxsulot = ruyxat.map(function (obj){
                                                                                    if((obj.xarak_id === tavar.xarak_id) && (obj.tovar_id === tavar.tovar_id)){
                                                                                        if(obj.soni > 0){
                                                                                            obj.soni -= 1
                                                                                        }
                                                                                        return obj;
                                                                                    }
                                                                                    return obj;
                                                                                })
                                                                                setRuyxat([...maxsulot])
                                                                            }
                                                                        } color="primary"> - </Button>
                                                                        <Input style={{"width": "100px"}} 
                                                                            type="number"
                                                                            value={
                                                                                (ruyxat.find(function(elem){
                                                                                    if((elem.xarak_id === tavar.xarak_id) && (elem.tovar_id === tavar.tovar_id)){
                                                                                        return true;
                                                                                    }
                                                                                    return false;
                                                                                })).soni
                                                                            }
                                                                            onChange={
                                                                                function (e) {
                                                                                    const maxsulot = ruyxat.map(function (obj){
                                                                                        if((obj.xarak_id === tavar.xarak_id) && (obj.tovar_id === tavar.tovar_id)){
                                                                                            if((e.target.value >= 0) && (e.target.value <= tavar.tovar_soni)){
                                                                                                obj.soni = e.target.value
                                                                                            }
                                                                                            return obj;
                                                                                        }
                                                                                        return obj;
                                                                                    })
                                                                                    setRuyxat([...maxsulot])
                                                                                }
                                                                            }
                                                                        />
                                                                        <Button onClick={
                                                                            function (){
                                                                                const maxsulot = ruyxat.map(function (obj){
                                                                                    if((obj.xarak_id === tavar.xarak_id) && (obj.tovar_id === tavar.tovar_id)){
                                                                                        if(obj.soni < tavar.tovar_soni){
                                                                                            obj.soni = ++obj.soni
                                                                                        }
                                                                                        return obj;
                                                                                    }
                                                                                    return obj;
                                                                                })
                                                                                setRuyxat([...maxsulot])
                                                                            }
                                                                        } color="primary" >+</Button>
                                                                     </>
                                                                :   <>
                                                                        <Button color="success"
                                                                            onClick={
                                                                                function (){
                                                                                    const maxsulot = {
                                                                                        tovar_id: tavar.tovar_id,
                                                                                        xarak_id: tavar.xarak_id,
                                                                                        soni: 1,
                                                                                        narxi: (State_Ombor.sotish_narxlari.find(function (elem) {
                                                                                            if(tavar.tovar_id === elem.tovar_id){
                                                                                                return true
                                                                                            }
                                                                                            return false
                                                                                        })).sum_narxi
                                                                                    }
                                                                                    setRuyxat([maxsulot, ...ruyxat])
                                                                                }
                                                                            }
                                                                        >
                                                                            Add Purchase 
                                                                        </Button>
                                                                    </>
                                                            }
                                                           
                                                        </td>
                                                    </tr>
                                                )
                                            }) 
                                        }  
                                        return null; 
                                    })
                                }
                          </tbody>
                        </Table> : null}
                        {status ? status : null}
                <Button
                type="submit"
                >
                    Send
                </Button>
                </Form>
            </div>
        </>
    )
}

export default SalePage;