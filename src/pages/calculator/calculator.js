import "./calculator.css";
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import axios from "axios";
export default function Calcurate({address}) {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  // const [address, setAddress] = useState("No connection!");
  useEffect(() => {
    // getIp();
  });
  // async function getIp() {
  //   const response = await axios.get("https://api.ipify.org?format=json");
  //   setAddress(response.data.ip);
  // }
  async function submit() {
    if(parseInt(start) >= parseInt(end)) {
      Swal.fire({
        icon: 'error',
        title: 'มีบางอย่างผิดพลาด',
        text: 'กรุณาใส่ค่าเริ่มต้นให้มากกว่าค่าสิ้นสุด',
        confirmButtonColor: '#c20212',
      });
      return;
    }
    const formData = {
      start_value: parseInt(start),
      end_value: parseInt(end),
      ip_address: address
    }
    await axios.post("http://localhost:4000/api/calculator/create", formData).then(response => {
      if(response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: `<strong>จำนวนเฉพาะจาก ${start} ถึง ${end}</strong>`,
          html:
    `<p><b>มีจำนวนทั้งหมด</b> : ${response.data.prime.length} ตัว</p> <br /><p><b>ซึ่งประกอบไปด้วย</b></p> ${response.data.prime}`,
        })
      }
    })
  }
  return (
    <div className="calcurate--element">
      <h1 className="calcurate--text">calculator</h1>
      <p className="calcurate--text-span">เก็บประวัติจากการคำนวนผ่าน ip-address</p>
      <div className="calcurate--card">
        <div className="calcurate--container">
          <h3 className="calcurate--card-title">คำนวณการหาค่า จำนวนเฉพาะ</h3>
          <div className="calcurate--formInput">
            <div>
              <input
                type="number"
                className="calcurate--input"
                placeholder="จำนวนเฉพาะเริ่มต้น"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              ></input>
            </div>
            <div>
              <input
                type="number"
                className="calcurate--input"
                placeholder="จำนวนเฉพาะสิ้นสุด"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              ></input>
            </div>
            <div>
                <button className="calcurate--btn" onClick={submit}>
                    คำนวน
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
