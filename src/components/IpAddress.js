export default function IpAddress({ip, connect}) {
  return (
    <div className="profile">
      <div className="profile_details">
        {/* <img></img> */}
        <div className="name_job">
          <div className="name">{ip}</div>
          <div className="job">For use logging app</div>
        </div>
      </div>
      <i className="bx bx-world" id="log_out" style={connect ? {color: "green"} : {color: "red"}}></i>
    </div>
  );
}
