import axios from "axios";
import QRCode from "qrcode.react";
axios.defaults.withCredentials = true;
import { useEffect, useState } from "react";
import HomeSkeleton from "./HomeSkeleton";

export default function QrCode() {
  const [apiString, setApiString] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getcode", {
          withCredentials: true,
        });
        console.log(response.data);
        setApiString(response.data.secret);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="mt-6">
      {apiString ? (
        <QRCode
          value={apiString}
          size={180}
          fgColor="#000000"
          bgColor="#ffffff"
          level="L"
          renderAs="svg"
        />
      ) : (
        "Loading"
      )}
    </div>
  );
}
