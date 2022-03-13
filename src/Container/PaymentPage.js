import axios from "axios"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Button, Input, Form, Label, FormGroup, Col} from "reactstrap"
import {sinxronDate} from "./helperFunction";

const PaymentPage = () => {
    const State_User = useSelector(state => state.user)
    const State_Mijoz = useSelector(state => state.mijoz)
    const [mijoz_id, setMijoz_id] = useState("")
    const [kirim_summasi, setKirim_summasi] = useState("")
    const [kassa_id, setKassa_id] = useState("")
    const [kassa_valyuta_id, setKassa_valyuta_id] = useState("")
    const [mijoz_valyuta_id, setMijoz_valyuta_id] = useState("")
    const [izox, setIzox] = useState("")
    const [status, setStatus] = useState("")

    console.log()

    const sendData = async function (e) {
        e.preventDefault();
        const mijozHamyon = State_Mijoz.mijoz_ostatkalari.find((elem) => {
            if(elem.mijoz_id === mijoz_id && elem.valyuta_id === mijoz_valyuta_id){
                return true;
            }
            return false;
        });
        console.log(mijozHamyon)

        try{
            const sendStatus = await axios.post(
                "/payment",
                {  
                    "user_id": State_User.user_id,
                    "mijoz_id": mijoz_id,
                    "kassa_id": kassa_id,
                    "kassa_valyuta_id": kassa_valyuta_id,
                    "kirim_summasi": kirim_summasi,
                    "mijoz_valyuta_id": mijoz_valyuta_id,
                    "mijoz_summasi": mijozHamyon.qarzimiz.toString(),
                    "sinxron_time": sinxronDate(),
                    "izox": izox,
                }
            )
            if(sendStatus.data.response === "null"){
                setStatus("Xatolik  yuz berdi! ooo my gad")
                setTimeout(()=>{
                    setStatus("")
                }, 5000)
            }else{
                setStatus(sendStatus.data.response)
                setMijoz_id("")
                setKirim_summasi("")
                setKassa_id("")
                setKassa_valyuta_id("")
                setMijoz_valyuta_id("")
                setIzox("")
                setTimeout(()=>{
                    setStatus("")
                }, 5000)
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
                        Select Kassa
                      </Label>
                      <Col sm={10}>
                        <Input
                          id="kassa"
                          name="kassa"
                          type="select"
                          value={kassa_id}
                          onChange={ function (e){
                              setKassa_id(e.target.value)
                            }
                          }
                        >
                            <option value="" selected> ... </option>
                            {
                              State_User?.Kassalar.map(function(kassa){
                                  return (
                                      <option key={kassa.kassa_id} value={kassa.kassa_id}>
                                          {kassa.Kassa}
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
                        Select Kassa Valyuta
                      </Label>
                      <Col sm={10}>
                        <Input
                          id="kassa_valyuta_id"
                          name="kassa_valyuta_id"
                          type="select"
                          value={kassa_valyuta_id}
                          onChange={ function (e){
                            setKassa_valyuta_id(e.target.value)
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
                    <FormGroup row>
                      <Label
                        for="kirim_summasi"
                        sm={2}
                         >
                        Enter Summa
                      </Label>
                      <Col sm={10}>
                        <Input
                          id="kirim_summasi"
                          name="kirim_summasi"
                          type="number"
                          value={kirim_summasi}
                          onChange={ function (e){
                            setKirim_summasi(e.target.value)
                            }
                          }
                        >
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label
                        for="mijoz_valyuta_id"
                        sm={2}
                         >
                        Select Mijoz Valyuta
                      </Label>
                      <Col sm={10}>
                        <Input
                          id="mijoz_valyuta_id"
                          name="mijoz_valyuta_id"
                          type="select"
                          value={mijoz_valyuta_id}
                          onChange={ function (e){
                            setMijoz_valyuta_id(e.target.value)
                            }
                          }
                        >
                            <option value="" selected> ... </option>
                            {
                              State_Mijoz?.mijoz_ostatkalari.map(function(valyuta){
                                  if(valyuta.mijoz_id === mijoz_id){
                                    return (
                                      <option key={valyuta.valyuta_id} value={valyuta.valyuta_id}>
                                          {valyuta.valyuta}
                                      </option>
                                    )
                                  }
                                  return null;
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
                            value={izox}
                            name="izox"
                            id="izox"
                            rows="5"
                            onChange={(e)=> setIzox(e.target.value)}
                        />
                    </FormGroup>
                  
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

export default PaymentPage;