import axios from "axios";
axios.defaults.withCredentials = true;
import { SecretCodeValidate } from "./../utils/secretcodeform.js";
import { useState } from "react";
import Toast from "./Toast";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
export default function SecretCodeForm() {
  SecretCodeValidate();

  const [toast, setToast] = useState({ message: "", isSuccess: false });
  const [loading, setLoading] = useState(false);

  const { push } = useRouter();

  function handleCodeSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    let submittedCode: string = `${
      e.target[0].value +
      e.target[1].value +
      e.target[2].value +
      e.target[3].value +
      e.target[4].value +
      e.target[5].value
    }`;
    axios
      .post(
        "https://twofa-backend-d2dn.onrender.com/api/verify",
        { token: submittedCode },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.verified) {
          setToast({ message: "Authentication Successful!", isSuccess: true });
          push("/home");
        } else {
          setLoading(false);
          setToast({
            message: "Invalid Code! Please try again.",
            isSuccess: false,
          });
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      {loading && <Loading />}
      {toast.message && (
        <Toast message={toast.message} isSuccess={toast.isSuccess} />
      )}
      <div className="text-center">
        <header className="my-8">
          <p className="text-[15px] text-slate-500">
            Enter the 6-digit code that from your authenticator app
          </p>
        </header>
        <form id="otp-form" method="POST" onSubmit={handleCodeSubmit}>
          <div className="flex items-center justify-center gap-3">
            <input
              type="text"
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              pattern="\d*"
              maxLength={1}
              required
              name="codeOne"
            />
            <input
              type="text"
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              pattern="\d*"
              maxLength={1}
              required
              name="codeTwo"
            />
            <input
              type="text"
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              pattern="\d*"
              maxLength={1}
              required
              name="codeThree"
            />
            <input
              type="text"
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              maxLength={1}
              required
              name="codeFour"
            />
            <input
              type="text"
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              maxLength={1}
              required
              name="codeFive"
            />
            <input
              type="text"
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              maxLength={1}
              required
              name="codeSix"
            />
          </div>
          <div className="max-w-[260px] mx-auto mt-4">
            <button
              type="submit"
              className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-gray-800 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-gray-950/10 hover:bg-gray-700 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-gray-300 transition-colors duration-150"
            >
              Authenticate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
