import { resData } from "@/app/page";

const ResponseItem = ({ data }: { data: resData }) => {
  return (
    <div className="response-item mb-9 text-white">
      {Object.entries(data).map(([key, value]) => {
        if (typeof value === "object" && !Array.isArray(value)) {
          return (
            <div key={key}>
              <div className="response-item__header__title text-2xl first-letter:capitalize">
                {key} :{" "}
              </div>
              <div className="pl-8">
                {Object.entries(value).map(([subKey, subValue]) => (
                  <div
                    key={subKey}
                    className="response-item__content first-letter:capitalize"
                  >
                    <span className="text-2xl first-letter:capitalize">
                      {subKey}:{" "}
                    </span>
                    <span className="text-[#aaa]">{subValue}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        } else if (Array.isArray(value)) {
          return (
            <div key={key}>
              <div className="response-item__header__title text-2xl first-letter:capitalize">
                {key == "contact_numbers" ? "Contact Numbers" : key}:{" "}
              </div>
              <ul className="ml-8 list-disc text-white">
                {value.map((item, index) => (
                  <li
                    key={index}
                    className="response-item__content text-[#aaa]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        } else {
          return (
            <div
              key={key}
              className="response-item__content  first-letter:capitalize"
            >
              <span className="text-2xl first-letter:capitalize">{key} : </span>
              <span className="text-[#aaa]">{value}</span>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ResponseItem;
