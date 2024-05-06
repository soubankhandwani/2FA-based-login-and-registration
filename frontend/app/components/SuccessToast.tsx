import { FaRegCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";

export default function SuccessToast(props: any) {
  return (
    <>
      <div
        className="absolute right-5 top-20 max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg"
        role="alert"
      >
        <div className="flex p-4">
          <div className="flex-shrink-0">
            {props.isSuccess ? (
              <FaRegCheckCircle className="text-xl text-green-500" />
            ) : (
              <RxCrossCircled className="text-xl text-red-500" />
            )}
          </div>
          <div className="ms-3">
            <p className="text-sm text-gray-700">{props.message}</p>
          </div>
        </div>
      </div>
    </>
  );
}
