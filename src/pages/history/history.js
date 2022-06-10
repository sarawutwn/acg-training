import "./history.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Swal from 'sweetalert2'
export default function History({ip}) {
  const [items, setItems] = useState([]);

  async function getData() {
    try {
        await axios.get("https://api.ipify.org?format=json").then((result) => {
          axios.get(
            `http://localhost:4000/api/calculator/history/${result.data.ip}`
          ).then(response => {
            setItems([...response.data]);
          })
        })
        
    }catch(err) {
      console.log(err)
    }
  }

  async function getValue(id) {
    await axios.get(`http://localhost:4000/api/calculator/${id}`).then(response => {
      if(response.status === 200) {
        console.log(response)
        Swal.fire({
          title: `<strong>จำนวนเฉพาะจาก ${response.data.start_value} ถึง ${response.data.end_value}</strong>`,
          html:
    `<p><b>มีจำนวนทั้งหมด</b> : ${response.data.value_items.length} ตัว</p> <br /><p><b>ซึ่งประกอบไปด้วย</b></p> <br /> ${response.data.value_items}`,
        })
      }
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect( () => {
     getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="history--element">
      <h1 className="history--text">History</h1>
      <p className="history--text-span">แสดงผลจากการเก็บ ip-address ({ip})</p>
      <table className="history--checkouttable">
        <thead className="history--table-head">
          <tr>
            <th>เวลาที่ทำการคำนวณ</th>
            <th>จำนวนเฉพาะเริ่มต้น</th>
            <th>จำนวนเฉพาะสิ้นสุด</th>
            <th>แสดงผล</th>
          </tr>
        </thead>
        <tbody>
          {items.length !== 0 &&
            items.map((item) => (
              <tr key={item.id}>
                <td className="history--table-body-data">
                  {moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss")}น.
                </td>
                <td className="history--table-body-data">{item.start_value}</td>
                <td className="history--table-body-data">{item.end_value}</td>
                <td className="history--table-body-data">
                  <button className="btn" value={item.id} onClick={(e) => getValue(e.target.value)}>ดูประวัติ</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
